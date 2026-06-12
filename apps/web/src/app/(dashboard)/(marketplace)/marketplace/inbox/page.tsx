'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  MessageSquare,
  Bell,
  Menu,
  X,
  Home,
  Package,
  Truck,
  FileText,
  Send,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Settings as SettingsIcon,
  ChevronRight,
  ArrowLeft,
  LogOut,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: MessageSquare, label: 'Network' },
];

interface Message {
  id: string;
  type: 'quote' | 'bid' | 'requirement' | 'response';
  borderColor: string;
  productName: string;
  productImage: string;
  supplierName: string;
  date: string;
  preview: string;
  price?: string;
  status?: string;
  fullMessage?: string;
  unread?: boolean;
}

const messages: Message[] = [
  {
    id: '1',
    type: 'quote',
    borderColor: '#A6824A',
    productName: 'Quote Request – Basmati Rice 1121',
    productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
    supplierName: 'Global Trade Exports',
    date: 'Jan 20, 2024',
    preview: 'We can offer premium quality...',
    price: '$820',
    fullMessage: 'We can offer $820/MT for 100MT with CIF Dubai terms. Quality guaranteed as per international standards.',
    unread: true,
  },
  {
    id: '2',
    type: 'bid',
    borderColor: '#154230',
    productName: 'Bid Submitted – Solar Panels',
    productImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300',
    supplierName: 'Shanghai Import Co.',
    date: 'Jan 19, 2024',
    preview: 'Your bid is awaiting review.',
    price: '$160',
    fullMessage: 'Your bid of $160/unit is awaiting supplier response. We will notify you once reviewed.',
    unread: true,
  },
  {
    id: '3',
    type: 'requirement',
    borderColor: '#5D1E21',
    productName: 'Requirements Sent – Cotton Yarn',
    productImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300',
    supplierName: 'Global Trade Exports',
    date: 'Jan 18, 2024',
    preview: 'Supplier viewed requirements.',
    status: 'Viewed',
    fullMessage: 'Supplier viewed your requirements. Awaiting response from their team.',
  },
  {
    id: '4',
    type: 'response',
    borderColor: '#A6824A',
    productName: 'Quote Received – Olive Oil',
    productImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300',
    supplierName: 'Turkey Merchants',
    date: 'Jan 17, 2024',
    preview: 'Best quality olive oil available...',
    price: '$4.10/kg',
    fullMessage: 'Best quality olive oil available. Extra virgin grade, cold pressed.',
  },
  {
    id: '5',
    type: 'quote',
    borderColor: '#A6824A',
    productName: 'Quote – Black Tea CTC',
    productImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300',
    supplierName: 'India Tea Co.',
    date: 'Jan 16, 2024',
    preview: 'Premium Assam tea available...',
    price: '$3.50/kg',
    fullMessage: 'Premium Assam tea available. Fresh stock from the latest harvest.',
  },
];

export default function InboxPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const router = useRouter();

  const handleSendReply = () => {
    if (replyText.trim()) {
      setReplyText('');
    }
  };

  const handleViewDetails = (msg: Message) => {
    router.push(`/marketplace/${msg.id}`);
  };

  const handleReply = (msg: Message) => {
    setSelectedMessage(msg);
    setShowMobileDetail(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('leverage_user');
    router.push('/login');
  };

  const unreadCount = messages.filter(m => m.unread).length;

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  link.href === '/marketplace' ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          <button onClick={() => setSidebarOpen(false)} className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center">
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  link.href === '/marketplace' ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <Menu className="w-5 h-5 text-white" />
            </button>
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/rfqs/new" className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">+</span>
            </Link>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <h1 className="text-white font-bold text-2xl">Inbox</h1>
          <p className="text-white/70 text-sm mt-1">Messages & conversations</p>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100vh-72px)] lg:h-[calc(100vh-100px)]">
          {/* Messages List */}
          <div className={`${showMobileDetail ? 'hidden lg:block' : 'w-full lg:w-[400px]'} bg-white border-r border-black/5 flex flex-col`}>
            {/* Search */}
            <div className="p-4 border-b border-black/5">
              <div className="flex gap-2">
                <div className="flex-1 h-11 bg-[#E6E2DA] rounded-xl flex items-center px-3">
                  <Search className="w-4 h-4 text-[#888]" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-none outline-none bg-transparent text-sm ml-2"
                  />
                </div>
                <button className="w-11 h-11 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                  <SettingsIcon className="w-4 h-4 text-[#4A4A4A]" />
                </button>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    setShowMobileDetail(true);
                  }}
                  className={`w-full p-4 border-b border-black/5 text-left hover:bg-[#E6E2DA]/50 transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-[#154230]/10' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#E6E2DA] flex-shrink-0">
                      <img src={msg.productImage} alt={msg.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-1.5 h-6 rounded-full flex-shrink-0"
                              style={{ backgroundColor: msg.borderColor }}
                            />
                            <h3 className={`text-sm font-semibold truncate ${msg.unread ? 'text-[#101111]' : 'text-[#4A4A4A]'}`}>
                              {msg.productName}
                            </h3>
                          </div>
                          <p className="text-xs text-[#4A4A4A] mt-0.5 ml-3.5 truncate">{msg.supplierName}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="text-[10px] text-[#888]">{msg.date}</p>
                          {msg.price && <p className="text-sm font-bold text-[#154230] mt-1">{msg.price}</p>}
                        </div>
                      </div>
                      <p className="text-xs text-[#4A4A4A] mt-1 ml-3.5 truncate">{msg.preview}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!showMobileDetail ? 'hidden lg:flex' : ''}`}>
            {selectedMessage ? (
              <>
                {/* Chat Header */}
                <div className="p-4 lg:p-6 border-b border-black/5 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <button
                        onClick={() => setShowMobileDetail(false)}
                        className="lg:hidden w-10 h-10 bg-[#E6E2DA] rounded-xl flex items-center justify-center"
                      >
                        <ArrowLeft className="w-5 h-5 text-[#4A4A4A]" />
                      </button>
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden bg-[#E6E2DA]">
                        <img src={selectedMessage.productImage} alt={selectedMessage.productName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h2 className="text-base lg:text-lg font-bold text-[#101111]">{selectedMessage.productName}</h2>
                        <p className="text-sm text-[#4A4A4A]">{selectedMessage.supplierName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="px-2 py-0.5 rounded text-xs font-semibold text-white"
                            style={{ backgroundColor: selectedMessage.borderColor }}
                          >
                            {selectedMessage.status || selectedMessage.type}
                          </span>
                          <span className="text-xs text-[#888]">{selectedMessage.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                      <button className="w-10 h-10 rounded-full bg-[#E6E2DA] flex items-center justify-center hover:bg-[#ddd] transition-colors">
                        <Phone className="w-4 h-4 text-[#4A4A4A]" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-[#E6E2DA] flex items-center justify-center hover:bg-[#ddd] transition-colors">
                        <Video className="w-4 h-4 text-[#4A4A4A]" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-[#E6E2DA] flex items-center justify-center hover:bg-[#ddd] transition-colors">
                        <Info className="w-4 h-4 text-[#4A4A4A]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 bg-[#f8f6f3]">
                  {/* Received Message */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#154230] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {selectedMessage.supplierName.charAt(0)}
                    </div>
                    <div className="flex-1 max-w-[560px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-[#101111]">{selectedMessage.supplierName}</span>
                        <span className="text-xs text-[#888]">{selectedMessage.date}</span>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
                        <p className="text-sm text-[#101111] leading-relaxed">{selectedMessage.fullMessage}</p>
                      </div>
                      {selectedMessage.price && (
                        <div className="mt-3 bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#E6E2DA]">
                              <img src={selectedMessage.productImage} alt={selectedMessage.productName} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#101111]">{selectedMessage.productName}</p>
                              <p className="text-lg font-bold text-[#154230] mt-0.5">{selectedMessage.price}</p>
                              <p className="text-xs text-[#666] mt-0.5">Min. Order: 100 MT</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sent Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-[560px] flex flex-col items-end">
                      <div className="bg-[#154230] text-white rounded-2xl rounded-tr-sm p-4 shadow-sm">
                        <p className="text-sm leading-relaxed">I am interested in your product. Please send me more details about the pricing and delivery timeline.</p>
                      </div>
                      <span className="text-xs text-[#888] mt-2">10:32 AM · Delivered</span>
                    </div>
                  </div>

                  {/* Another Received Message */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#154230] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {selectedMessage.supplierName.charAt(0)}
                    </div>
                    <div className="flex-1 max-w-[560px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-[#101111]">{selectedMessage.supplierName}</span>
                        <span className="text-xs text-[#888]">10:35 AM</span>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
                        <p className="text-sm text-[#101111] leading-relaxed">Thank you for your interest! Here are the details:</p>
                        <ul className="text-sm text-[#101111] mt-3 space-y-1.5">
                          <li>• Price: {selectedMessage.price} for bulk orders</li>
                          <li>• Delivery: 15-20 days by sea</li>
                          <li>• Payment: LC at sight</li>
                          <li>• Sample: Available on request</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Input */}
                <div className="p-4 lg:p-5 bg-white border-t border-black/5">
                  <div className="flex gap-3 items-center">
                    <button className="hidden lg:block w-11 h-11 rounded-full bg-[#E6E2DA] text-base flex items-center justify-center hover:bg-[#ddd] transition-colors">
                      <Paperclip className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full h-12 bg-[#E6E2DA] rounded-full px-5 text-sm outline-none focus:ring-2 focus:ring-[#154230]/30"
                      />
                    </div>
                    <button className="hidden lg:block w-11 h-11 rounded-full bg-[#E6E2DA] text-base flex items-center justify-center hover:bg-[#ddd] transition-colors">
                      <Smile className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <button
                      onClick={handleSendReply}
                      className="w-12 h-12 rounded-full bg-[#154230] text-white flex items-center justify-center shadow-md hover:bg-[#1a5a3a] transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-[#f8f6f3]">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-md">
                    <MessageSquare className="w-10 h-10 text-[#154230]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#101111] mb-2">Select a message</h3>
                  <p className="text-sm text-[#666]">Choose a conversation from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="inbox" />
    </div>
  );
}
