"""Document endpoints"""
import uuid
from datetime import datetime
from typing import List,Optional
from fastapi import APIRouter,HTTPException,Depends,UploadFile,File,Form,Header
from models.schemas import DocumentType
router=APIRouter()
docs_db={}
def get_user_id(x_user_id:Optional[str]=Header(None))->Optional[str]:return x_user_id
@router.post("/upload")
async def upload(file:UploadFile=File(...),document_type:DocumentType=Form(DocumentType.OTHER),company_id:Optional[str]=Form(None),title:Optional[str]=Form(None),user_id:Optional[str]=Depends(get_user_id)):
 c=await file.read()
 if len(c)>100*1024*1024:raise HTTPException(400,"File too large")
 doc_id=str(uuid.uuid4())
 now=datetime.utcnow()
 docs_db[doc_id]={"id":doc_id,"filename":file.filename,"content":c,"document_type":document_type,"company_id":company_id,"title":title or file.filename,"user_id":user_id,"created_at":now}
 return {"id":doc_id,"filename":file.filename,"document_type":document_type.value,"created_at":now.isoformat()}
@router.get("/{document_id}")
async def get_doc(document_id:str,user_id:Optional[str]=Depends(get_user_id)):
 if document_id not in docs_db:raise HTTPException(404,"Not found")
 return {"id":docs_db[document_id]["id"],"filename":docs_db[document_id]["filename"],"created_at":docs_db[document_id]["created_at"].isoformat()}
@router.get("/")
async def list_docs(user_id:Optional[str]=Depends(get_user_id),company_id:Optional[str]=None,limit:int=50,offset:int=0):
 d=list(docs_db.values())
 if user_id:d=[x for x in d if x.get("user_id")==user_id]
 if company_id:d=[x for x in d if x.get("company_id")==company_id]
 d.sort(key=lambda x:x["created_at"],reverse=True)
 return[{"id":x["id"],"filename":x["filename"],"created_at":x["created_at"].isoformat()}for x in d[offset:offset+limit]]
@router.delete("/{document_id}")
async def del_doc(document_id:str,user_id:Optional[str]=Depends(get_user_id)):
 if document_id not in docs_db:raise HTTPException(404,"Not found")
 del docs_db[document_id]
 return {"message":"Deleted","document_id":document_id}
