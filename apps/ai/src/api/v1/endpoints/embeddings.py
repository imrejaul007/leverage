"""Embedding endpoints"""
import uuid,time
from datetime import datetime
from typing import List,Optional
from fastapi import APIRouter,HTTPException,UploadFile,File,Form,Depends,Header
from models.schemas import DocumentType,DocumentMetadata,IngestionResult,BatchIngestionResult,EmbeddingStats
router=APIRouter()
embeddings_storage={}
def get_user_id(x_user_id:Optional[str]=Header(None))->Optional[str]:return x_user_id
async def process_doc(content:bytes,filename:str,metadata:DocumentMetadata,user_id:Optional[str]=None)->IngestionResult:
 doc_id=str(uuid.uuid4())
 start=time.time()
 try:
  text=content.decode("utf-8","ignore")
  chunks=max(1,len(text)//1000)
  embeddings_storage[doc_id]={"id":doc_id,"chunks":[text[i:i+1000]for i in range(0,len(text),1000)],"metadata":metadata.model_dump(),"created_at":datetime.utcnow(),"user_id":user_id,"filename":filename}
  return IngestionResult(document_id=doc_id,chunks_created=chunks,embeddings_count=chunks,status="completed",processing_time_ms=(time.time()-start)*1000)
 except Exception as e:return IngestionResult(document_id=doc_id,chunks_created=0,embeddings_count=0,status="failed",error=str(e))
@router.post("/documents/ingest",response_model=IngestionResult)
async def ingest(file:UploadFile=File(...),document_type:DocumentType=Form(DocumentType.OTHER),company_id:Optional[str]=Form(None),reference_id:Optional[str]=Form(None),title:Optional[str]=Form(None),user_id:Optional[str]=Depends(get_user_id))->IngestionResult:
 c=await file.read()
 if len(c)>50*1024*1024:raise HTTPException(400,"File too large")
 return await process_doc(c,file.filename,DocumentMetadata(document_type=document_type,company_id=company_id,reference_id=reference_id,title=title or file.filename),user_id)
@router.post("/documents/batch-ingest",response_model=BatchIngestionResult)
async def batch(files:List[UploadFile]=File(...),document_type:DocumentType=Form(DocumentType.OTHER),company_id:Optional[str]=Form(None),user_id:Optional[str]=Depends(get_user_id))->BatchIngestionResult:
 if len(files)>20:raise HTTPException(400,"Max 20 files")
 start=time.time();results=[];s=f=0
 for file in files:
  c=await file.read();r=await process_doc(c,file.filename,DocumentMetadata(document_type=document_type,company_id=company_id,title=file.filename),user_id)
  results.append(r)
  if r.status=="completed":s+=1
  else:f+=1
 return BatchIngestionResult(total_files=len(files),successful=s,failed=f,results=results,total_processing_time_ms=(time.time()-start)*1000)
@router.delete("/documents/{document_id}")
async def delete_doc(document_id:str,user_id:Optional[str]=Depends(get_user_id)):
 if document_id not in embeddings_storage:raise HTTPException(404,"Not found")
 del embeddings_storage[document_id]
 return {"message":"Deleted","document_id":document_id}
@router.get("/embeddings/stats",response_model=EmbeddingStats)
async def stats(company_id:Optional[str]=None,user_id:Optional[str]=Depends(get_user_id))->EmbeddingStats:
 docs=list(embeddings_storage.values())
 if company_id:docs=[d for d in docs if d.get("metadata",{}).get("company_id")==company_id]
 by_type={}
 for d in docs:
  t=d.get("metadata",{}).get("document_type","other")
  by_type[t]=by_type.get(t,0)+1
 return EmbeddingStats(total_documents=len(docs),total_chunks=sum(len(d.get("chunks",[]))for d in docs),total_embeddings=sum(len(d.get("chunks",[]))for d in docs),storage_used_mb=len(docs)*0.001,by_document_type=by_type,last_updated=datetime.utcnow())
