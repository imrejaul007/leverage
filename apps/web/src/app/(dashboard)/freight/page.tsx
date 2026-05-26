'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Quote {
  id: string;
  carrier: string;
  type: string;
  transit: string;
  price: number;
  currency: string;
}

const mockQuotes: Quote[] = [
  { id: '1', carrier: 'Maersk Line', type: 'Sea Freight', transit: '25-30 days', price: 2800, currency: 'USD' },
  { id: '2', carrier: 'MSC', type: 'Sea Freight', transit: '28-32 days', price: 2600, currency: 'USD' },
  { id: '3', carrier: 'COSCO', type: 'Sea Freight', transit: '30-35 days', price: 2400, currency: 'USD' },
  { id: '4', carrier: 'DHL Air', type: 'Air Freight', transit: '3-5 days', price: 8500, currency: 'USD' },
  { id: '5', carrier: 'FedEx Air', type: 'Air Freight', transit: '4-6 days', price: 9200, currency: 'USD' },
];

const popularRoutes = [
  { from: 'Shanghai', to: 'Los Angeles', seaPrice: 2800, airPrice: 9500 },
  { from: 'Shenzhen', to: 'Hamburg', seaPrice: 3200, airPrice: 11000 },
  { from: 'Hong Kong', to: 'Dubai', seaPrice: 1800, airPrice: 6500 },
  { from: 'Singapore', to: 'Mumbai', seaPrice: 1200, airPrice: 4800 },
];

export default function FreightPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingType, setShippingType] = useState<'sea' | 'air'>('sea');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    container: '',
    cargoType: '',
    shipperName: '',
    shipperAddress: '',
    consigneeName: '',
    consigneeAddress: '',
    eta: '',
  });

  const handleGetQuote = () => {
    if (!origin || !destination || !weight) return;
    setIsLoading(true);
    setTimeout(() => {
      const filtered = mockQuotes.filter(q =>
        (shippingType === 'sea' && q.type === 'Sea Freight') ||
        (shippingType === 'air' && q.type === 'Air Freight')
      );
      setQuotes(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleBookNow = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedQuote) return;
    if (!bookingForm.container || !bookingForm.cargoType || !bookingForm.shipperName || !bookingForm.consigneeName) return;

    const shipments = JSON.parse(localStorage.getItem('leverage_shipments') || '[]');
    const newShipment = {
      id: `SHP-${Date.now().toString().slice(-6)}`,
      trackingNumber: `TRK${Date.now().toString().slice(-10)}`,
      container: bookingForm.container || 'PENDING',
      origin: origin,
      destination: destination,
      status: 'pending' as const,
      eta: bookingForm.eta || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      carrier: selectedQuote.carrier,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      events: [{ date: new Date().toISOString().split('T')[0], location: origin, description: 'Booking confirmed' }],
    };
    shipments.unshift(newShipment);
    localStorage.setItem('leverage_shipments', JSON.stringify(shipments));

    setBookingSuccess(true);
    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSuccess(false);
      setSelectedQuote(null);
      setBookingForm({ container: '', cargoType: '', shipperName: '', shipperAddress: '', consigneeName: '', consigneeAddress: '', eta: '' });
      setQuotes([]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Freight & Logistics</h1>
          <p className="text-[#D8CCBC]/60 text-sm">Get quotes and book shipments worldwide</p>
        </div>
        <Link href="/freight/shipments" className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium text-sm hover:bg-[#0f4a42] transition-colors">
          View My Shipments
        </Link>
      </div>

      {/* Get Quote Form */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Get Freight Quote</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Origin</label>
            <input type="text" placeholder="City or Port" value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full input" />
          </div>
          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Destination</label>
            <input type="text" placeholder="City or Port" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full input" />
          </div>
          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Weight (kg)</label>
            <input type="number" placeholder="1000" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full input" />
          </div>
          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Shipping Type</label>
            <select value={shippingType} onChange={(e) => setShippingType(e.target.value as 'sea' | 'air')} className="w-full input">
              <option value="sea">Sea Freight</option>
              <option value="air">Air Freight</option>
            </select>
          </div>
        </div>
        <button onClick={handleGetQuote} disabled={!origin || !destination || !weight || isLoading} className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors disabled:opacity-50">
          {isLoading ? 'Getting Quotes...' : 'Get Quotes'}
        </button>
      </div>

      {/* Popular Routes */}
      <div className="card">
        <h3 className="text-[#F4F1EA] font-semibold mb-4">Popular Routes</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {popularRoutes.map((route, i) => (
            <button key={i} onClick={() => { setOrigin(route.from); setDestination(route.to); }} className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl text-left hover:bg-[rgba(255,255,255,0.06)] transition-colors">
              <p className="text-[#F4F1EA] font-medium text-sm">{route.from} → {route.to}</p>
              <p className="text-[#C49A6C] text-xs mt-1">Sea: ${route.seaPrice} | Air: ${route.airPrice}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quote Results */}
      {quotes.length > 0 && (
        <div className="card">
          <h3 className="text-[#F4F1EA] font-semibold mb-4">Available Quotes</h3>
          <div className="space-y-3">
            {quotes.map((quote) => (
              <div key={quote.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[rgba(255,255,255,0.03)] rounded-xl gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0E3B36] rounded-lg flex items-center justify-center"><span className="text-2xl">{quote.type === 'Sea Freight' ? '🚢' : '✈️'}</span></div>
                  <div>
                    <p className="text-[#F4F1EA] font-semibold">{quote.carrier}</p>
                    <p className="text-[#D8CCBC]/50 text-sm">{quote.type} • {quote.transit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right"><p className="text-[#C49A6C] text-2xl font-bold">${quote.price.toLocaleString()}</p><p className="text-[#D8CCBC]/50 text-sm">USD</p></div>
                  <button onClick={() => handleBookNow(quote)} className="px-6 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm hover:bg-[#D4AA82] transition-colors">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">Book Shipment</h2>
              <button onClick={() => setShowBookingModal(false)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                <p className="text-[#F4F1EA] font-medium">Booking Confirmed!</p>
                <p className="text-[#D8CCBC]/50 text-sm mt-2">Redirecting to shipments...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                  <p className="text-[#C49A6C] font-semibold">{selectedQuote.carrier}</p>
                  <p className="text-[#D8CCBC]/50 text-sm">{selectedQuote.type} • {selectedQuote.transit}</p>
                  <p className="text-[#C49A6C] text-xl font-bold mt-2">${selectedQuote.price.toLocaleString()} USD</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[#D8CCBC] text-sm mb-2">Container/Tracking #</label><input type="text" value={bookingForm.container} onChange={(e) => setBookingForm({ ...bookingForm, container: e.target.value })} className="w-full input" placeholder="Auto-generated if empty" /></div>
                  <div><label className="block text-[#D8CCBC] text-sm mb-2">Cargo Type</label><input type="text" value={bookingForm.cargoType} onChange={(e) => setBookingForm({ ...bookingForm, cargoType: e.target.value })} className="w-full input" placeholder="General Cargo" /></div>
                </div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Shipper Name *</label><input type="text" value={bookingForm.shipperName} onChange={(e) => setBookingForm({ ...bookingForm, shipperName: e.target.value })} className="w-full input" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Shipper Address</label><input type="text" value={bookingForm.shipperAddress} onChange={(e) => setBookingForm({ ...bookingForm, shipperAddress: e.target.value })} className="w-full input" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Consignee Name *</label><input type="text" value={bookingForm.consigneeName} onChange={(e) => setBookingForm({ ...bookingForm, consigneeName: e.target.value })} className="w-full input" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Consignee Address</label><input type="text" value={bookingForm.consigneeAddress} onChange={(e) => setBookingForm({ ...bookingForm, consigneeAddress: e.target.value })} className="w-full input" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Expected Delivery</label><input type="date" value={bookingForm.eta} onChange={(e) => setBookingForm({ ...bookingForm, eta: e.target.value })} className="w-full input" /></div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowBookingModal(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">Cancel</button>
                  <button onClick={handleConfirmBooking} disabled={!bookingForm.container || !bookingForm.cargoType || !bookingForm.shipperName || !bookingForm.consigneeName} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50">Confirm Booking</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
