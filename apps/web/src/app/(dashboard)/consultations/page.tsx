'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, CheckCircle, Clock, MessageSquare, Video, Phone, ChevronRight, X } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  subPrice: number;
  online: boolean;
  verified: boolean;
  specialties: string[];
  bio: string;
}

const experts: Expert[] = [
  { id: '1', name: 'Rakesh Sharma', title: 'Shipping Consultant', image: 'RS', rating: 4.9, reviews: 128, price: 3000, subPrice: 2250, online: true, verified: true, specialties: ['Freight Forwarding', 'Customs', 'Documentation'], bio: '15+ years of experience in international shipping and logistics.' },
  { id: '2', name: 'Anita Iyer', title: 'Customs Expert', image: 'AI', rating: 4.8, reviews: 96, price: 2500, subPrice: 1875, online: true, verified: true, specialties: ['Import/Export', 'Duty Optimization', 'Trade Compliance'], bio: 'Former customs officer with 12 years of experience.' },
  { id: '3', name: 'Vikram Singh', title: 'Logistics Expert', image: 'VS', rating: 4.9, reviews: 74, price: 3500, subPrice: 2625, online: true, verified: true, specialties: ['Supply Chain', 'Warehouse', 'Distribution'], bio: 'Expert in optimizing supply chain operations.' },
  { id: '4', name: 'Neha Bansal', title: 'Trade Finance', image: 'NB', rating: 4.8, reviews: 63, price: 2800, subPrice: 2100, online: false, verified: true, specialties: ['Letters of Credit', 'Payment Terms', 'Insurance'], bio: 'Specialist in trade finance solutions.' },
  { id: '5', name: 'David Lee', title: 'Supply Chain', image: 'DL', rating: 4.9, reviews: 58, price: 3200, subPrice: 2400, online: false, verified: true, specialties: ['Sourcing', 'Vendor Management', 'Quality Control'], bio: '20 years in global supply chain management.' },
  { id: '6', name: 'Maria Santos', title: 'Import Export', image: 'MS', rating: 4.7, reviews: 45, price: 2900, subPrice: 2175, online: true, verified: true, specialties: ['Documentation', 'Incoterms', 'Contract Management'], bio: 'Legal expert in international trade contracts.' },
];

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [consultationType, setConsultationType] = useState<'instant' | 'scheduled'>('instant');

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Expert Consultations</h1>
        <p className="text-[#4A4A4A] text-sm">Get expert advice on trade matters</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
        />
      </div>

      {/* Consultation Type Toggle */}
      <div className="flex gap-2 bg-white border border-black/5 rounded-lg p-1">
        <button
          onClick={() => setConsultationType('instant')}
          className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors ${
            consultationType === 'instant' ? 'bg-[#154230] text-white' : 'text-[#4A4A4A]'
          }`}
        >
          Instant Consultation
        </button>
        <button
          onClick={() => setConsultationType('scheduled')}
          className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors ${
            consultationType === 'scheduled' ? 'bg-[#154230] text-white' : 'text-[#4A4A4A]'
          }`}
        >
          Schedule Call
        </button>
      </div>

      {/* Online Experts First */}
      <div>
        <h2 className="text-[#101111] font-semibold text-sm mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Available Now
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredExperts.filter(e => e.online).map(expert => (
            <div
              key={expert.id}
              onClick={() => setSelectedExpert(expert)}
              className="bg-white border border-black/5 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-[#154230] flex items-center justify-center text-white font-bold text-lg">
                    {expert.image}
                  </div>
                  {expert.online && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[#101111] font-semibold text-sm truncate">{expert.name}</h3>
                    {expert.verified && <CheckCircle className="w-3.5 h-3.5 text-[#154230] flex-shrink-0" />}
                  </div>
                  <p className="text-[#4A4A4A] text-xs">{expert.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[#5D1E21] text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      {expert.rating}
                    </span>
                    <span className="text-[#4A4A4A] text-xs">({expert.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {expert.specialties.slice(0, 2).map((spec, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#E6E2DA] text-[#4A4A4A] text-xs rounded">
                    {spec}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
                <div>
                  <p className="text-[#101111] font-bold text-sm">${expert.price}</p>
                  <p className="text-[#4A4A4A] text-xs">per session</p>
                </div>
                <button className="px-3 py-1.5 bg-[#154230] text-white font-medium rounded-lg text-xs hover:bg-[#1d5240] transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offline Experts */}
      <div>
        <h2 className="text-[#101111] font-semibold text-sm mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#4A4A4A]" />
          Available Soon
        </h2>
        <div className="space-y-2">
          {filteredExperts.filter(e => !e.online).map(expert => (
            <div
              key={expert.id}
              onClick={() => setSelectedExpert(expert)}
              className="bg-white border border-black/5 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#A6824A] flex items-center justify-center text-white font-bold">
                  {expert.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[#101111] font-semibold text-sm">{expert.name}</h3>
                    {expert.verified && <CheckCircle className="w-3.5 h-3.5 text-[#154230]" />}
                  </div>
                  <p className="text-[#4A4A4A] text-xs">{expert.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#101111] font-bold text-sm">${expert.price}</p>
                  <p className="text-[#4A4A4A] text-xs">per session</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Detail Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30" onClick={() => setSelectedExpert(null)}>
          <div className="bg-white border border-black/5 rounded-t-2xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-[#101111] font-semibold text-sm">Expert Profile</h2>
              <button onClick={() => setSelectedExpert(null)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Expert Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#154230] flex items-center justify-center text-white font-bold text-xl">
                  {selectedExpert.image}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[#101111] font-bold text-lg">{selectedExpert.name}</h3>
                    {selectedExpert.verified && <CheckCircle className="w-4 h-4 text-[#154230]" />}
                  </div>
                  <p className="text-[#4A4A4A] text-sm">{selectedExpert.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[#5D1E21] text-sm font-medium">
                      <Star className="w-4 h-4 fill-current" />
                      {selectedExpert.rating}
                    </span>
                    <span className="text-[#4A4A4A] text-sm">({selectedExpert.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="p-3 bg-[#E6E2DA] rounded-lg">
                <p className="text-[#101111] text-sm">{selectedExpert.bio}</p>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-[#101111] font-medium text-sm mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExpert.specialties.map((spec, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#E6E2DA] text-[#101111] text-sm rounded-lg">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#E6E2DA] rounded-lg text-center">
                  <p className="text-[#4A4A4A] text-xs mb-1">Per Session</p>
                  <p className="text-[#101111] font-bold text-lg">${selectedExpert.price}</p>
                </div>
                <div className="p-3 bg-[#154230]/10 rounded-lg text-center">
                  <p className="text-[#154230] text-xs mb-1">Monthly Subscription</p>
                  <p className="text-[#154230] font-bold text-lg">${selectedExpert.subPrice}</p>
                </div>
              </div>

              {/* Contact Options */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-[#154230] text-white font-semibold rounded-lg text-sm hover:bg-[#1d5240] transition-colors">
                  <Video className="w-4 h-4" />
                  Video Call
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-[#E6E2DA] text-[#101111] font-semibold rounded-lg text-sm hover:bg-[#D4CCBE] transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
