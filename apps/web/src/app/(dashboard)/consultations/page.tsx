'use client';

import { useState } from 'react';

const tabs = [
  { id: 'verify', label: 'Verify & Connect', icon: '✓' },
  { id: 'book', label: 'Book & Consult', icon: '📅' },
  { id: 'solutions', label: 'Get Solutions', icon: '💡' },
  { id: 'grow', label: 'Grow Globally', icon: '🌍' },
];

const categories = [
  { id: 'shipping', name: 'Shipping & Compliance', experts: 42, icon: '🚢' },
  { id: 'legal', name: 'Legal Advisory', experts: 38, icon: '⚖️' },
  { id: 'finance', name: 'Trade Finance', experts: 24, icon: '💰' },
  { id: 'sourcing', name: 'Sourcing', experts: 31, icon: '🔍' },
  { id: 'logistics', name: 'Logistics', experts: 28, icon: '📦' },
  { id: 'marketing', name: 'Marketing', experts: 18, icon: '📢' },
];

const experts = [
  {
    id: '1',
    name: 'Rakesh Sharma',
    title: 'Senior Trade Consultant',
    company: 'Global Trade Partners',
    image: 'RS',
    rating: 4.9,
    consultations: 127,
    hourlyRate: 150,
    experience: '15+ years',
    bio: 'Expert in international trade compliance, customs regulations, and documentation for Asian markets.',
    countries: ['India', 'UAE', 'Singapore'],
    verified: true,
    online: true,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    title: 'Customs Expert',
    company: 'Asia Trade Hub',
    image: 'SC',
    rating: 4.8,
    consultations: 89,
    hourlyRate: 180,
    experience: '12+ years',
    bio: 'Specialized in China-US trade, tariff classification, and FTA optimization.',
    countries: ['China', 'USA', 'Germany'],
    verified: true,
    online: false,
  },
  {
    id: '3',
    name: 'Michael Torres',
    title: 'Logistics Director',
    company: 'FastFreight Solutions',
    image: 'MT',
    rating: 4.7,
    consultations: 64,
    hourlyRate: 120,
    experience: '10+ years',
    bio: 'Ocean and air freight specialist with expertise in supply chain optimization.',
    countries: ['Singapore', 'UAE', 'UK'],
    verified: true,
    online: true,
  },
];

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState('book');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [bookingForm, setBookingForm] = useState({ date: '', time: '', duration: '30' });

  return (
    <div className="min-h-screen bg-[#081512]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.05)]">
        <div className="p-8 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">Consultation Hub</h1>
              <p className="text-[#D8CCBC]/60">Connect with verified trade experts worldwide</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search anything…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 h-11 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C]"
                />
                <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-[#0E3B36] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#C49A6C] flex items-center justify-center text-[#081512] text-sm font-bold">JD</div>
                <div>
                  <p className="text-[#F4F1EA] text-sm font-medium">John Doe</p>
                  <p className="text-[#C49A6C] text-xs">Super Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#C49A6C] text-[#081512]'
                    : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0E3B36]/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Recommended Experts */}
            <div>
              <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Top Recommended Experts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {experts.map(expert => (
                  <div
                    key={expert.id}
                    className="card hover:border-[#C49A6C]/30 transition-all cursor-pointer"
                    onClick={() => setSelectedExpert(expert)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold border border-[#C49A6C]/20">
                          {expert.image}
                        </div>
                        {expert.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#081512]"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[#F4F1EA] font-medium">{expert.name}</h3>
                          {expert.verified && (
                            <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <p className="text-[#D8CCBC]/60 text-xs">{expert.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-[#F4F1EA]">{expert.rating}</span>
                        <span className="text-[#D8CCBC]/50">({expert.consultations})</span>
                      </div>
                      <span className="text-[#C49A6C] font-semibold">${expert.hourlyRate}/hr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Categories */}
            <div>
              <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Consultation Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className="card flex items-center gap-4 hover:border-[#C49A6C]/30 transition-all text-left"
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <div className="flex-1">
                      <p className="text-[#F4F1EA] font-medium">{cat.name}</p>
                      <p className="text-[#C49A6C] text-sm">{cat.experts} experts</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* How Consultation & Ad Credit Works */}
            <div className="card">
              <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">How Consultation & Ad Credit Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#0E3B36]/50 rounded-xl">
                  <div className="w-12 h-12 bg-[#C49A6C] rounded-xl flex items-center justify-center text-[#081512] text-xl font-bold mb-3">1</div>
                  <h3 className="text-[#F4F1EA] font-medium mb-2">Buy Ad Credits</h3>
                  <p className="text-[#D8CCBC]/60 text-sm">Purchase credits to book consultations or advertise your products</p>
                </div>
                <div className="p-4 bg-[#0E3B36]/50 rounded-xl">
                  <div className="w-12 h-12 bg-[#C49A6C] rounded-xl flex items-center justify-center text-[#081512] text-xl font-bold mb-3">2</div>
                  <h3 className="text-[#F4F1EA] font-medium mb-2">Book Sessions</h3>
                  <p className="text-[#D8CCBC]/60 text-sm">Use credits to book expert consultations or boost your listings</p>
                </div>
                <div className="p-4 bg-[#0E3B36]/50 rounded-xl">
                  <div className="w-12 h-12 bg-[#C49A6C] rounded-xl flex items-center justify-center text-[#081512] text-xl font-bold mb-3">3</div>
                  <h3 className="text-[#F4F1EA] font-medium mb-2">Grow Business</h3>
                  <p className="text-[#D8CCBC]/60 text-sm">Get expert advice or reach more buyers globally</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Expert Detail / Booking */}
            {selectedExpert ? (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#F4F1EA]">Book Consultation</h3>
                  <button onClick={() => setSelectedExpert(null)} className="text-[#D8CCBC]/50 hover:text-[#F4F1EA]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] text-xl font-bold border border-[#C49A6C]/20">
                    {selectedExpert.image}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[#F4F1EA] font-semibold">{selectedExpert.name}</h4>
                      {selectedExpert.verified && (
                        <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-[#D8CCBC]/60 text-sm">{selectedExpert.title}</p>
                    <p className="text-[#C49A6C] text-sm">{selectedExpert.hourlyRate}/hr</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[#D8CCBC]/80 text-sm mb-2">Select Date</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[#D8CCBC]/80 text-sm mb-2">Select Time</label>
                    <select
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="input w-full"
                    >
                      <option value="">Choose time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#D8CCBC]/80 text-sm mb-2">Duration</label>
                    <select
                      value={bookingForm.duration}
                      onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })}
                      className="input w-full"
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                    </select>
                  </div>

                  <div className="p-4 bg-[#0E3B36]/50 rounded-xl">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#D8CCBC]/60">Session cost</span>
                      <span className="text-[#F4F1EA]">${(selectedExpert.hourlyRate * parseInt(bookingForm.duration) / 60).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#D8CCBC]/60">Subscriber price</span>
                      <span className="text-[#C49A6C] font-medium">${(selectedExpert.hourlyRate * parseInt(bookingForm.duration) / 60 * 0.8).toFixed(0)}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
                    Book Session
                  </button>
                </div>
              </div>
            ) : (
              <div className="card">
                <h3 className="text-lg font-semibold text-[#F4F1EA] mb-4">Select an Expert</h3>
                <p className="text-[#D8CCBC]/60 text-sm">Click on an expert card to view their profile and book a consultation.</p>
              </div>
            )}

            {/* Credits Wallet */}
            <div className="card bg-gradient-to-br from-[#0E3B36] to-[#081512] border-[#C49A6C]/20">
              <h3 className="text-lg font-semibold text-[#F4F1EA] mb-4">Ad Wallet</h3>
              <div className="text-center py-6">
                <p className="text-[#D8CCBC]/60 text-sm mb-2">Available Credits</p>
                <p className="text-5xl font-bold text-[#F4F1EA] mb-1">2,450</p>
                <p className="text-[#C49A6C]">≈ $245.00 value</p>
              </div>
              <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
                Buy Credits
              </button>
            </div>

            {/* Ad Spotlight */}
            <div className="card">
              <h3 className="text-lg font-semibold text-[#F4F1EA] mb-4">Ad Spotlight</h3>
              <div className="bg-[#0E3B36]/30 rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center">
                  <span className="text-6xl">🍚</span>
                </div>
                <div className="p-4">
                  <h4 className="text-[#F4F1EA] font-medium mb-1">Premium Basmati Rice</h4>
                  <p className="text-[#D8CCBC]/60 text-sm mb-3">Direct from Indian farms</p>
                  <button className="w-full py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg font-medium text-sm hover:bg-[#0f4a42] transition-colors">
                    Go to Ad Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
