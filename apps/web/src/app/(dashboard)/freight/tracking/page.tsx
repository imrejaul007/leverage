'use client';

import { useState } from 'react';
import { Search, Truck, Ship, Plane, CheckCircle, MapPin, Clock, AlertCircle, Loader2, ExternalLink, Box, Calendar } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

interface TrackingResult {
  carrier: 'fedex' | 'dhl' | 'maersk' | 'msc' | 'cosco';
  trackingNumber: string;
  status: 'in_transit' | 'delivered' | 'customs' | 'out_for_delivery' | 'exception';
  origin: { city: string; country: string; date: string };
  destination: { city: string; country: string; eta: string };
  currentLocation: { location: string; city: string; country: string; timestamp: string };
  events: TrackingEvent[];
  estimatedDelivery: string;
  serviceType: string;
  weight: string;
  pieces: number | string;
}

interface TrackingEvent {
  timestamp: string;
  location: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

const carriers = [
  { id: 'fedex', name: 'FedEx', icon: Plane, color: '#4D148C', trackingFormat: '12-3456789-0123456789' },
  { id: 'dhl', name: 'DHL', icon: Truck, color: '#FFCC00', trackingFormat: '1234567890' },
  { id: 'maersk', name: 'Maersk', icon: Ship, color: '#00243D', trackingFormat: 'MAEU-1234567' },
  { id: 'msc', name: 'MSC', icon: Ship, color: '#1E3A5F', trackingFormat: 'MSCU-1234567' },
  { id: 'cosco', name: 'COSCO', icon: Ship, color: '#E31837', trackingFormat: 'COSU-1234567' },
];

const statusConfig = {
  in_transit: { label: 'In Transit', color: '#154230', bg: '#154230/10', icon: Truck },
  delivered: { label: 'Delivered', color: '#16A34A', bg: '#16A34A/10', icon: CheckCircle },
  customs: { label: 'At Customs', color: '#CA8A04', bg: '#CA8A04/10', icon: AlertCircle },
  out_for_delivery: { label: 'Out for Delivery', color: '#154230', bg: '#154230/10', icon: Truck },
  exception: { label: 'Exception', color: '#DC2626', bg: '#DC2626/10', icon: AlertCircle },
};

// Demo tracking data
const demoTrackingData: Record<string, TrackingResult> = {
  'FEDEX123456789': {
    carrier: 'fedex',
    trackingNumber: 'FEDEX123456789',
    status: 'in_transit',
    origin: { city: 'Shanghai', country: 'China', date: '2024-01-15' },
    destination: { city: 'Los Angeles', country: 'United States', eta: '2024-01-25' },
    currentLocation: { location: 'Anchorage, USA', city: 'Anchorage', country: 'USA', timestamp: '2024-01-20 14:30' },
    estimatedDelivery: '2024-01-25',
    serviceType: 'FedEx International Priority',
    weight: '125 kg',
    pieces: 3,
    events: [
      { timestamp: '2024-01-20 14:30', location: 'Anchorage, AK, USA', description: 'Package arrived at FedEx hub', status: 'current' },
      { timestamp: '2024-01-19 08:15', location: 'Memphis, TN, USA', description: 'Departed FedEx hub', status: 'completed' },
      { timestamp: '2024-01-18 22:00', location: 'In Flight', description: 'In transit to destination', status: 'completed' },
      { timestamp: '2024-01-17 06:00', location: 'Shanghai, China', description: 'Picked up by FedEx', status: 'completed' },
      { timestamp: '2024-01-15 10:00', location: 'Shanghai, China', description: 'Shipment information received', status: 'completed' },
    ],
  },
  'DHL9876543210': {
    carrier: 'dhl',
    trackingNumber: 'DHL9876543210',
    status: 'customs',
    origin: { city: 'Hamburg', country: 'Germany', date: '2024-01-10' },
    destination: { city: 'New York', country: 'United States', eta: '2024-01-22' },
    currentLocation: { location: 'JFK Airport, USA', city: 'JFK Airport', country: 'USA', timestamp: '2024-01-21 09:00' },
    estimatedDelivery: '2024-01-22',
    serviceType: 'DHL Express Worldwide',
    weight: '45 kg',
    pieces: 1,
    events: [
      { timestamp: '2024-01-21 09:00', location: 'JFK Airport, NY, USA', description: 'Held at customs for inspection', status: 'current' },
      { timestamp: '2024-01-20 16:45', location: 'New York, USA', description: 'Arrived at destination country', status: 'completed' },
      { timestamp: '2024-01-20 06:30', location: 'Cincinnati, OH, USA', description: 'Processed through FedEx hub', status: 'completed' },
      { timestamp: '2024-01-18 04:00', location: 'Leipzig, Germany', description: 'Departed Germany', status: 'completed' },
      { timestamp: '2024-01-16 14:00', location: 'Hamburg, Germany', description: 'Picked up', status: 'completed' },
    ],
  },
  'MAEU1234567': {
    carrier: 'maersk',
    trackingNumber: 'MAEU1234567',
    status: 'in_transit',
    origin: { city: 'Shenzhen', country: 'China', date: '2024-01-05' },
    destination: { city: 'Long Beach', country: 'United States', eta: '2024-02-05' },
    currentLocation: { location: 'Pacific Ocean', city: 'Pacific Ocean', country: 'At Sea', timestamp: '2024-01-20' },
    estimatedDelivery: '2024-02-05',
    serviceType: 'Maersk Container Shipping',
    weight: '18,500 kg',
    pieces: '1 x 40HC',
    events: [
      { timestamp: '2024-01-20', location: 'Pacific Ocean', description: 'Vessel en route to destination port', status: 'current' },
      { timestamp: '2024-01-15', location: 'Singapore', description: 'Transshipment completed', status: 'completed' },
      { timestamp: '2024-01-10', location: 'Shenzhen, China', description: 'Loaded on vessel', status: 'completed' },
      { timestamp: '2024-01-08', location: 'Shenzhen, China', description: 'Received at port terminal', status: 'completed' },
      { timestamp: '2024-01-05', location: 'Shenzhen, China', description: 'Booking confirmed', status: 'completed' },
    ],
  },
};

export default function FreightTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsTracking(true);
    setError('');
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check demo data first
    const upperTracking = trackingNumber.toUpperCase();
    if (demoTrackingData[upperTracking]) {
      setResult(demoTrackingData[upperTracking]);
    } else if (demoTrackingData[trackingNumber]) {
      setResult(demoTrackingData[trackingNumber]);
    } else {
      // Generate demo response for any input
      const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];
      setResult({
        carrier: randomCarrier.id as TrackingResult['carrier'],
        trackingNumber: trackingNumber,
        status: 'in_transit',
        origin: { city: 'Shanghai', country: 'China', date: new Date().toISOString().split('T')[0] },
        destination: { city: 'Los Angeles', country: 'United States', eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        currentLocation: { location: 'In Transit', city: 'In Transit', country: 'Pacific', timestamp: new Date().toISOString() },
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        serviceType: randomCarrier.name + ' International',
        weight: Math.floor(Math.random() * 100 + 10) + ' kg',
        pieces: Math.floor(Math.random() * 5 + 1),
        events: [
          { timestamp: new Date().toISOString(), location: 'In Transit', description: 'Package in transit', status: 'current' },
          { timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), location: 'Origin', description: 'Shipment picked up', status: 'completed' },
        ],
      });
    }

    setIsTracking(false);
  };

  const selectedCarrierData = carriers.find(c => c.id === result?.carrier);
  const statusInfo = result ? statusConfig[result.status] : null;

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Track Shipment"
        subtitle="Real-time carrier tracking"
        backHref="/freight"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Search Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="relative z-10">
            <h2 className="text-[#101111] font-bold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-[#154230]" />
              Enter Tracking Number
            </h2>

            {/* Carrier Selection */}
            <div className="mb-4">
              <label className="block text-[#4A4A4A] text-xs font-medium mb-2">Select Carrier (Optional)</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {carriers.map(carrier => {
                  const Icon = carrier.icon;
                  const isSelected = selectedCarrier === carrier.id;
                  return (
                    <button
                      key={carrier.id}
                      onClick={() => setSelectedCarrier(isSelected ? null : carrier.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 whitespace-nowrap transition-all ${
                        isSelected
                          ? 'border-[#154230] bg-[#154230]/5'
                          : 'border-black/5 hover:border-[#154230]/30'
                      }`}
                    >
                      <Icon className={`w-5 h-5`} style={{ color: carrier.color }} />
                      <span className="text-xs font-medium">{carrier.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tracking Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={selectedCarrierData?.trackingFormat || 'Enter tracking number'}
                className="flex-1 px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
              <button
                onClick={handleTrack}
                disabled={isTracking}
                className="px-6 py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-[#1a5a3a] disabled:opacity-50"
              >
                {isTracking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Track
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="text-[#DC2626] text-sm mt-2">{error}</p>
            )}

            {/* Quick Demo Links */}
            <div className="mt-4 pt-4 border-t border-black/5">
              <p className="text-[#4A4A4A] text-xs mb-2">Try these demo tracking numbers:</p>
              <div className="flex flex-wrap gap-2">
                {['FEDEX123456789', 'DHL9876543210', 'MAEU1234567'].map(num => (
                  <button
                    key={num}
                    onClick={() => setTrackingNumber(num)}
                    className="px-2 py-1 bg-[#E6E2DA] rounded text-xs font-mono hover:bg-[#154230]/10"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <>
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {selectedCarrierData && (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: selectedCarrierData.color + '20' }}>
                        <selectedCarrierData.icon className="w-6 h-6" style={{ color: selectedCarrierData.color }} />
                      </div>
                    )}
                    <div>
                      <p className="text-[#101111] font-bold">{selectedCarrierData?.name || result.carrier.toUpperCase()}</p>
                      <p className="text-[#4A4A4A] text-sm font-mono">{result.trackingNumber}</p>
                    </div>
                  </div>
                  {statusInfo && (
                    <div className={`px-3 py-1.5 rounded-full ${statusInfo.bg}`}>
                      <span className="text-sm font-semibold" style={{ color: statusInfo.color }}>{statusInfo.label}</span>
                    </div>
                  )}
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <p className="text-[10px] text-[#4A4A4A] uppercase">Origin</p>
                    <p className="text-[#101111] font-semibold">{result.origin.city}</p>
                    <p className="text-xs text-[#4A4A4A]">{result.origin.country}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#154230]/10 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-[#154230]" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-[10px] text-[#4A4A4A] uppercase">Destination</p>
                    <p className="text-[#101111] font-semibold">{result.destination.city}</p>
                    <p className="text-xs text-[#4A4A4A]">{result.destination.country}</p>
                  </div>
                </div>

                {/* Current Location */}
                <div className="bg-[#E6E2DA] rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#154230]" />
                    <div>
                      <p className="text-xs text-[#4A4A4A]">Current Location</p>
                      <p className="text-[#101111] font-semibold">{result.currentLocation.city}</p>
                      <p className="text-xs text-[#4A4A4A]">{result.currentLocation.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#E6E2DA]/50 rounded-xl p-3 text-center">
                    <Calendar className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                    <p className="text-[10px] text-[#4A4A4A]">Est. Delivery</p>
                    <p className="text-xs font-semibold text-[#101111]">{result.estimatedDelivery}</p>
                  </div>
                  <div className="bg-[#E6E2DA]/50 rounded-xl p-3 text-center">
                    <Box className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                    <p className="text-[10px] text-[#4A4A4A]">Pieces</p>
                    <p className="text-xs font-semibold text-[#101111]">{result.pieces}</p>
                  </div>
                  <div className="bg-[#E6E2DA]/50 rounded-xl p-3 text-center">
                    <Truck className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                    <p className="text-[10px] text-[#4A4A4A]">Weight</p>
                    <p className="text-xs font-semibold text-[#101111]">{result.weight}</p>
                  </div>
                </div>

                {/* Track on Carrier */}
                <button className="w-full mt-4 py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#154230]/10">
                  Track on {selectedCarrierData?.name || 'Carrier'} Website
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

              <div className="relative z-10">
                <h3 className="text-[#101111] font-bold mb-4">Shipment Timeline</h3>

                <div className="space-y-4">
                  {result.events.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          event.status === 'completed'
                            ? 'bg-[#154230]'
                            : event.status === 'current'
                            ? 'bg-[#A6824A] animate-pulse'
                            : 'bg-[#E6E2DA]'
                        }`} />
                        {index < result.events.length - 1 && (
                          <div className="w-0.5 h-full bg-[#E6E2DA]" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[#101111] text-sm font-medium">{event.description}</p>
                          {event.status === 'current' && (
                            <span className="px-2 py-0.5 bg-[#A6824A]/10 text-[#A6824A] text-xs font-semibold rounded">Current</span>
                          )}
                        </div>
                        <p className="text-[#4A4A4A] text-xs mt-0.5">{event.location}</p>
                        <p className="text-[#4A4A4A]/60 text-xs mt-0.5">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Premium Feature */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Ship className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Premium Integration</p>
              <p className="text-sm text-white/70">Connect your carrier accounts for automatic tracking updates</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
