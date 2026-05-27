'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Expert {
  id: string;
  name: string;
  title: string;
  image: string;
  imageUrl?: string;
  industry: string;
  yearsExperience: number;
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
  { id: '1', name: 'Rakesh Sharma', title: 'Shipping Consultant', industry: 'International Logistics', yearsExperience: 15, image: 'RS', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', rating: 4.9, reviews: 128, price: 3000, subPrice: 2250, online: true, verified: true, specialties: ['Freight Forwarding', 'Customs', 'Documentation'], bio: '15+ years of experience in international shipping and logistics.' },
  { id: '2', name: 'Anita Iyer', title: 'Customs Expert', industry: 'Government & Trade', yearsExperience: 12, image: 'AI', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', rating: 4.8, reviews: 96, price: 2500, subPrice: 1875, online: true, verified: true, specialties: ['Import/Export', 'Duty Optimization', 'Trade Compliance'], bio: 'Former customs officer with 12 years of experience.' },
  { id: '3', name: 'Vikram Singh', title: 'Logistics Expert', industry: 'Supply Chain', yearsExperience: 18, image: 'VS', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', rating: 4.9, reviews: 74, price: 3500, subPrice: 2625, online: true, verified: true, specialties: ['Supply Chain', 'Warehouse', 'Distribution'], bio: 'Expert in optimizing supply chain operations.' },
  { id: '4', name: 'Neha Bansal', title: 'Trade Finance', industry: 'Banking & Finance', yearsExperience: 10, image: 'NB', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', rating: 4.8, reviews: 63, price: 2800, subPrice: 2100, online: false, verified: true, specialties: ['Letters of Credit', 'Payment Terms', 'Insurance'], bio: 'Specialist in trade finance solutions.' },
  { id: '5', name: 'David Lee', title: 'Supply Chain', industry: 'Manufacturing', yearsExperience: 20, image: 'DL', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', rating: 4.9, reviews: 58, price: 3200, subPrice: 2400, online: false, verified: true, specialties: ['Sourcing', 'Vendor Management', 'Quality Control'], bio: '20 years in global supply chain management.' },
  { id: '6', name: 'Maria Santos', title: 'Import Export', industry: 'International Trade', yearsExperience: 8, image: 'MS', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face', rating: 4.7, reviews: 45, price: 2900, subPrice: 2175, online: true, verified: true, specialties: ['Regulations', 'Documentation', 'Compliance'], bio: 'Expert in cross-border trade regulations.' },
];

const categories = [
  { name: 'Shipping', count: 42, icon: '🚢' },
  { name: 'Customs', count: 38, icon: '✅' },
  { name: 'Trade', count: 31, icon: '💰' },
  { name: 'Legal', count: 28, icon: '⚖️' },
];

export default function ConsultationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('book');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingType, setBookingType] = useState<'one-time' | 'subscription'>('one-time');
  const [duration, setDuration] = useState('30');
  const [filterCategory, setFilterCategory] = useState('All');

  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    topic: '',
    description: '',
  });

  const getPrice = (expert: Expert) => {
    const base = bookingType === 'subscription' ? expert.subPrice : expert.price;
    return base * (parseInt(duration) / 30);
  };

  const handleBookExpert = (expert: Expert) => {
    setSelectedExpert(expert);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedExpert || !bookingForm.date || !bookingForm.time || !bookingForm.topic) return;

    const bookings = JSON.parse(localStorage.getItem('leverage_bookings') || '[]');
    bookings.push({
      id: Date.now().toString(),
      expertId: selectedExpert.id,
      expertName: selectedExpert.name,
      expertTitle: selectedExpert.title,
      date: bookingForm.date,
      time: bookingForm.time,
      topic: bookingForm.topic,
      description: bookingForm.description,
      price: getPrice(selectedExpert),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('leverage_bookings', JSON.stringify(bookings));

    setBookingSuccess(true);
    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSuccess(false);
      setSelectedExpert(null);
      setBookingForm({ date: '', time: '', topic: '', description: '' });
      router.push('/messages');
    }, 2000);
  };

  const filteredExperts = filterCategory === 'All'
    ? experts
    : experts.filter(e => e.specialties.some(s => s.toLowerCase().includes(filterCategory.toLowerCase())));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F4F1EA]">Expert Consultations</h1>
        <p className="text-[#D8CCBC]/60 text-sm">Book consultations with trade experts</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[{ id: 'book', label: 'Book Expert', icon: '📅' }, { id: 'my', label: 'My Bookings', icon: '📋' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0E3B36]/80'}`}>
            <span>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'book' && (
        <>
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => setFilterCategory('All')} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${filterCategory === 'All' ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC]'}`}>All</button>
            {categories.map(cat => (
              <button key={cat.name} onClick={() => setFilterCategory(cat.name)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${filterCategory === cat.name ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC]'}`}>{cat.icon} {cat.name}</button>
            ))}
          </div>

          {/* Booking Type Toggle */}
          <div className="card">
            <div className="flex gap-3">
              <button onClick={() => setBookingType('one-time')} className={`flex-1 py-3 rounded-xl font-medium transition-colors ${bookingType === 'one-time' ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[rgba(255,255,255,0.05)] text-[#D8CCBC]'}`}>One-time Session</button>
              <button onClick={() => setBookingType('subscription')} className={`flex-1 py-3 rounded-xl font-medium transition-colors ${bookingType === 'subscription' ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[rgba(255,255,255,0.05)] text-[#D8CCBC]'}`}>Subscription</button>
            </div>
            <div className="mt-4">
              <label className="text-[#D8CCBC] text-sm mb-2 block">Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className="input">
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
            </div>
          </div>

          {/* Expert Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperts.map(expert => (
              <div key={expert.id} className="card hover:border-[#C49A6C]/30 transition-all text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-3">
                    {expert.imageUrl ? (
                      <img src={expert.imageUrl} alt={expert.name} className="w-24 h-24 rounded-full object-cover border-2 border-[#C49A6C]/30" />
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold border border-[#C49A6C]/20 text-3xl">{expert.image}</div>
                    )}
                    {expert.online && <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#081512]"></div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#F4F1EA] font-semibold">{expert.name}</h3>
                    {expert.verified && <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                  </div>
                  <p className="text-[#C49A6C] text-sm">{expert.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-[#F4F1EA] text-sm">{expert.rating}</span>
                    <span className="text-[#D8CCBC]/50 text-sm">({expert.reviews} reviews)</span>
                  </div>
                  <div className="mt-2 px-3 py-1.5 bg-[#0E3B36]/50 rounded-lg">
                    <p className="text-[#D8CCBC]/70 text-xs">{expert.industry}</p>
                    <p className="text-[#C49A6C] text-sm font-semibold">{expert.yearsExperience}+ Years Expertise</p>
                  </div>
                </div>
                <p className="text-[#D8CCBC]/70 text-sm mb-4 line-clamp-2">{expert.bio}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {expert.specialties.map(s => (
                    <span key={s} className="px-2 py-1 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC]/50 text-xs rounded">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
                  <div><span className="text-[#C49A6C] text-xl font-bold">${getPrice(expert).toLocaleString()}</span><span className="text-[#D8CCBC]/50 text-sm ml-1">/{duration}min</span></div>
                  <button onClick={() => handleBookExpert(expert)} className="px-4 py-2 bg-[#C49A6C] text-[#081512] rounded-lg font-semibold text-sm hover:bg-[#D4AA82] transition-colors">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'my' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">My Bookings</h2>
          <div id="bookings-list" className="text-center py-8">
            <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">📅</span></div>
            <p className="text-[#D8CCBC]/50 mb-4">No bookings yet</p>
            <button onClick={() => setActiveTab('book')} className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">Browse Experts</button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">Book Consultation</h2>
              <button onClick={() => setShowBookingModal(false)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                <p className="text-[#F4F1EA] font-medium">Booking Confirmed!</p>
                <p className="text-[#D8CCBC]/50 text-sm mt-2">Redirecting to messages...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl flex flex-col items-center text-center">
                  <div className="relative mb-2">
                    {selectedExpert.imageUrl ? (
                      <img src={selectedExpert.imageUrl} alt={selectedExpert.name} className="w-20 h-20 rounded-full object-cover border-2 border-[#C49A6C]/30" />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold border border-[#C49A6C]/20 text-2xl">{selectedExpert.image}</div>
                    )}
                  </div>
                  <p className="text-[#F4F1EA] font-semibold">{selectedExpert.name}</p>
                  <p className="text-[#C49A6C] text-sm">{selectedExpert.title}</p>
                  <div className="mt-2 px-3 py-1 bg-[#0E3B36]/50 rounded-lg">
                    <p className="text-[#D8CCBC]/70 text-xs">{selectedExpert.industry}</p>
                    <p className="text-[#C49A6C] text-sm font-semibold">{selectedExpert.yearsExperience}+ Years Expertise</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[#D8CCBC] text-sm mb-2">Date *</label><input type="date" value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} className="w-full input" min={new Date().toISOString().split('T')[0]} /></div>
                  <div><label className="block text-[#D8CCBC] text-sm mb-2">Time *</label><select value={bookingForm.time} onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })} className="w-full input"><option value="">Select time</option><option value="09:00">09:00 AM</option><option value="10:00">10:00 AM</option><option value="11:00">11:00 AM</option><option value="14:00">02:00 PM</option><option value="15:00">03:00 PM</option><option value="16:00">04:00 PM</option></select></div>
                </div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Topic *</label><input type="text" value={bookingForm.topic} onChange={(e) => setBookingForm({ ...bookingForm, topic: e.target.value })} className="w-full input" placeholder="Brief description of your topic" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Additional Details</label><textarea value={bookingForm.description} onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })} className="w-full input resize-none" rows={3} placeholder="Any specific questions or requirements..." /></div>
                <div className="p-4 bg-[#0E3B36]/50 rounded-xl flex items-center justify-between">
                  <span className="text-[#D8CCBC]">Total</span><span className="text-[#C49A6C] text-xl font-bold">${getPrice(selectedExpert).toLocaleString()}</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowBookingModal(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">Cancel</button>
                  <button onClick={handleConfirmBooking} disabled={!bookingForm.date || !bookingForm.time || !bookingForm.topic} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50">Confirm Booking</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
