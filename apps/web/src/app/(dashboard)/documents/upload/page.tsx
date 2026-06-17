'use client';

import { useState, useRef } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Upload, File, X, Check, Loader2 } from 'lucide-react';

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setTimeout(() => {
      const newFiles = Array.from(files).map(f => ({
        name: f.name,
        size: `${(f.size / 1024).toFixed(0)} KB`
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      setUploading(false);
    }, 1500);
  };

  const removeFile = (name: string) => {
    setUploadedFiles(uploadedFiles.filter(f => f.name !== name));
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Upload Documents" subtitle="Upload your trade documents" backHref="/documents" />

      <div className="px-4 -mt-6 space-y-4">
        <div
          onClick={handleUpload}
          className="bg-white rounded-2xl p-8 shadow-sm border-2 border-dashed border-[#154230]/30 cursor-pointer hover:border-[#154230] transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
          <div className="text-center">
            {uploading ? (
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-[#154230] animate-spin" />
            ) : (
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#154230]" />
            )}
            <h3 className="text-[#101111] font-bold mb-2">
              {uploading ? 'Uploading...' : 'Drop files here'}
            </h3>
            <p className="text-sm text-[#4A4A4A] mb-4">
              PDF, DOC, PNG, JPG up to 10MB
            </p>
            <button className="px-6 py-2 bg-[#154230] text-white rounded-lg font-medium">
              Browse Files
            </button>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-[#101111] font-bold mb-4">Uploaded ({uploadedFiles.length})</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-[#101111] font-medium">{file.name}</p>
                      <p className="text-xs text-[#4A4A4A]">{file.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.name)}
                    className="p-2 hover:bg-white rounded-lg text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <File className="w-8 h-8" />
            <div className="flex-1">
              <p className="font-bold">Secure Upload</p>
              <p className="text-sm text-white/70">All files encrypted with AES-256</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
