'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { FileText, Upload, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  { id: 'DR-001', name: 'Commercial Invoice - ABC Corp', status: 'approved', date: '2 hours ago' },
  { id: 'DR-002', name: 'Bill of Lading - XYZ Shipping', status: 'review', date: '5 hours ago' },
  { id: 'DR-003', name: 'Certificate of Origin - Rice Export', status: 'issues', date: '1 day ago' },
];

const statusConfig = {
  approved: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
  review: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  issues: { color: 'bg-red-100 text-red-700', icon: AlertTriangle },
};

export default function DocumentReviewPage() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Document Review" subtitle="AI-powered document validation" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">Upload Documents for Review</h3>
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragOver ? 'border-[#154230] bg-[#154230]/5' : 'border-[#4A4A4A]/30'}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          >
            <Upload className="w-12 h-12 text-[#154230] mx-auto mb-3" />
            <p className="text-[#101111] font-medium mb-1">Drag & drop files here</p>
            <p className="text-sm text-[#4A4A4A]">or click to browse</p>
            <p className="text-xs text-[#4A4A4A] mt-2">PDF, DOCX up to 10MB</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">Recent Reviews</h3>
          <div className="space-y-3">
            {reviews.map((review) => {
              const config = statusConfig[review.status as keyof typeof statusConfig];
              const Icon = config.icon;
              return (
                <div key={review.id} className="p-4 bg-[#E6E2DA] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#154230]" />
                    <div>
                      <p className="font-medium text-[#101111]">{review.name}</p>
                      <p className="text-sm text-[#4A4A4A]">{review.id} • {review.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}>
                    <Icon className="w-3 h-3" />
                    {review.status === 'approved' ? 'Approved' : review.status === 'review' ? 'Under Review' : 'Issues Found'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
