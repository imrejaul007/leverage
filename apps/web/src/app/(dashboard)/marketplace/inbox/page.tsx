'use client';

import { useState, useEffect } from 'react';
import BottomNav from '@/components/BottomNav';

interface Message {
  id: string;
  type: 'quote' | 'bid' | 'requirement' | 'response';
  borderColor: 'gold' | 'green' | 'red';
  productName: string;
  productImage: string;
  supplierName: string;
  date: string;
  preview: string;
  price?: string;
  status?: string;
  fullMessage?: string;
}

const messages: Message[] = [
  {
    id: '1',
    type: 'quote',
    borderColor: 'gold',
    productName: 'Quote Request – Basmati Rice 1121',
    productImage: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=300',
    supplierName: 'Global Trade Exports',
    date: 'Jan 20, 2024',
    preview: 'We can offer premium quality...',
    price: '$820',
    fullMessage: 'We can offer $820/MT for 100MT with CIF Dubai terms. Quality guaranteed as per international standards.',
  },
  {
    id: '2',
    type: 'bid',
    borderColor: 'green',
    productName: 'Bid Submitted – Solar Panels',
    productImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300',
    supplierName: 'Shanghai Import Co.',
    date: 'Jan 19, 2024',
    preview: 'Your bid is awaiting review.',
    price: '$160',
    fullMessage: 'Your bid of $160/unit is awaiting supplier response. We will notify you once reviewed.',
  },
  {
    id: '3',
    type: 'requirement',
    borderColor: 'red',
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
    borderColor: 'gold',
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
    borderColor: 'gold',
    productName: 'Quote – Black Tea CTC',
    productImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300',
    supplierName: 'India Tea Co.',
    date: 'Jan 16, 2024',
    preview: 'Premium Assam tea available...',
    price: '$3.50/kg',
    fullMessage: 'Premium Assam tea available. Fresh stock from the latest harvest.',
  },
];

const mainChat = {
  id: 'main',
  type: 'requirement' as const,
  borderColor: 'red' as const,
  productName: 'Requirements Sent – Cotton Yarn',
  productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
  supplierName: 'Global Trade Exports',
  date: 'Jan 18, 2024',
  status: 'Viewed',
  fullMessage: 'Supplier viewed your requirements. Awaiting response.',
};

const borderColors = {
  gold: '#d4a33d',
  green: '#0f7a58',
  red: '#7b1113',
};

const typeLabels = {
  quote: 'Quote',
  bid: 'Bid',
  requirement: 'Requirement',
  response: 'Response',
};

export default function InboxPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleSendReply = () => {
    if (replyText.trim()) {
      setReplyText('');
    }
  };

  const unreadCount = 2;

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* ==================== MOBILE (< 640px) ==================== */}
      <div className="sm:hidden min-h-screen bg-[#f7f5f1] pb-28">
        {/* Hero Section */}
        <div className="px-4 py-3 flex justify-between items-center">
          <div>
            <h4 className="text-xs font-semibold text-[#333]">Marketplace</h4>
            <p className="text-xs text-[#777] mt-0.5">Browse suppliers & products</p>
            <h1 className="text-[36px] font-extrabold mt-2 text-[#18352b] leading-none">Inbox</h1>
            <p className="text-sm mt-1.5 text-[#7b1113] font-semibold">● {unreadCount} unread messages</p>
          </div>
          <div className="text-[60px] leading-none">📩</div>
        </div>

        {/* Search */}
        <div className="px-4 py-2 flex gap-2">
          <div className="flex-1 h-11 bg-white rounded-[12px] flex items-center px-3 shadow-[0_1px_3px_rgba(0,0,0,.05)]">
            <span className="text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none outline-none bg-transparent text-sm ml-2"
            />
          </div>
          <button className="w-11 h-11 border-none rounded-[12px] bg-white text-lg flex items-center justify-center shadow-sm">⚙️</button>
        </div>

        {/* Main Chat Card */}
        <div className="mx-4 mt-2 bg-white rounded-[18px] p-3.5 border-l-[4px] border-[#7b1113]">
          <div className="flex gap-2.5 items-center">
            <div className="w-[52px] h-[52px] rounded-[8px] overflow-hidden bg-[#ddd]">
              <img src={mainChat.productImage} alt={mainChat.productName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-[#101111] truncate">{mainChat.productName}</div>
              <div className="text-xs text-[#666] mt-0.5">{mainChat.supplierName}</div>
            </div>
            <div className="bg-[#7b1113] text-white px-2 py-1 text-[10px] rounded-lg font-semibold flex-shrink-0">
              {mainChat.status}
            </div>
          </div>

          <div className="mt-3 bg-[#f4f1ec] p-3 rounded-[8px]">
            <strong className="block mb-0.5 text-xs text-[#101111]">{mainChat.supplierName}</strong>
            <span className="text-xs text-[#101111]">Supplier viewed your requirements.</span>
            <br />
            <span className="text-xs text-[#101111]">Awaiting response.</span>
          </div>

          <div className="mt-2.5 flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 h-10 border border-[#ddd] rounded-[8px] px-2.5 text-sm outline-none focus:border-[#0f7a58]"
            />
            <button
              onClick={handleSendReply}
              className="w-10 h-10 border-none rounded-[8px] bg-[#7b1113] text-white text-base flex items-center justify-center"
            >
              ➤
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="px-3 mt-3">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-[16px] p-3 flex justify-between items-center mb-2.5 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ backgroundColor: borderColors[msg.borderColor] }}
              />
              <div className="flex gap-2.5 pl-2">
                <div className="w-[50px] h-[50px] rounded-[8px] overflow-hidden bg-[#ddd]">
                  <img src={msg.productImage} alt={msg.productName} className="w-full h-full object-cover" />
                </div>
                <div className="max-w-[160px]">
                  <div className="text-[10px] text-[#888]">{msg.date}</div>
                  <h3 className="text-xs font-bold mt-0.5 text-[#101111] line-clamp-1">{msg.productName}</h3>
                  <p className="text-[11px] text-[#666] mt-0.5 line-clamp-1">{msg.preview}</p>
                </div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0 ml-2">
                {msg.price && <div className="text-sm font-extrabold text-[#0b5d40]">{msg.price}</div>}
                {msg.status && <div className="bg-[#f4ead2] px-2 py-0.5 rounded-lg text-[10px] text-[#888]">{msg.status}</div>}
                <span className="text-[18px] text-[#777] mt-1.5">›</span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-[90px] right-4 w-[50px] h-[50px] rounded-full bg-[#7b1113] text-white border-none text-[24px] shadow-[0_6px_12px_rgba(0,0,0,.2)] flex items-center justify-center">
          +
        </button>

        {/* Bottom Navigation */}
        <BottomNav activeItem="inbox" />
      </div>

      {/* ==================== TABLET (640px - 1023px) ==================== */}
      <div className="hidden sm:block lg:hidden min-h-screen bg-[#f7f5f1] pb-28">
        {/* Hero Section */}
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h4 className="text-sm font-semibold text-[#333]">Marketplace</h4>
            <p className="text-sm text-[#777] mt-0.5">Browse suppliers & products</p>
            <h1 className="text-[48px] font-extrabold mt-4 text-[#18352b] leading-none">Inbox</h1>
            <p className="text-lg mt-2 text-[#7b1113] font-semibold">● {unreadCount} unread messages</p>
          </div>
          <div className="text-[90px] leading-none">📩</div>
        </div>

        {/* Search */}
        <div className="px-6 py-3 flex gap-3">
          <div className="flex-1 h-12 bg-white rounded-[14px] flex items-center px-4 shadow-[0_1px_3px_rgba(0,0,0,.05)]">
            <span className="text-base">🔍</span>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none outline-none bg-transparent text-sm ml-2.5"
            />
          </div>
          <button className="w-12 h-12 border-none rounded-[14px] bg-white text-xl flex items-center justify-center shadow-sm">⚙️</button>
        </div>

        {/* Main Chat Card */}
        <div className="mx-5 mt-3 bg-white rounded-[20px] p-4 border-l-[5px] border-[#7b1113]">
          <div className="flex gap-3 items-center">
            <div className="w-[62px] h-[62px] rounded-[10px] overflow-hidden bg-[#ddd]">
              <img src={mainChat.productImage} alt={mainChat.productName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-base font-bold text-[#101111]">{mainChat.productName}</div>
              <div className="text-sm text-[#666] mt-0.5">{mainChat.supplierName}</div>
            </div>
            <div className="bg-[#7b1113] text-white px-2.5 py-1.5 text-xs rounded-lg font-semibold">
              {mainChat.status}
            </div>
          </div>

          <div className="mt-4 bg-[#f4f1ec] p-3.5 rounded-[10px]">
            <strong className="block mb-1 text-[#101111]">{mainChat.supplierName}</strong>
            <span className="text-sm text-[#101111]">Supplier viewed your requirements.</span>
            <br />
            <span className="text-sm text-[#101111]">Awaiting response.</span>
          </div>

          <div className="mt-3 flex gap-2.5">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 h-11 border border-[#ddd] rounded-[10px] px-3 text-sm outline-none focus:border-[#0f7a58]"
            />
            <button
              onClick={handleSendReply}
              className="w-12 h-11 border-none rounded-[10px] bg-[#7b1113] text-white text-lg flex items-center justify-center"
            >
              ➤
            </button>
          </div>
        </div>

        {/* Messages List - 2 Columns on Tablet */}
        <div className="px-5 mt-4 grid grid-cols-2 gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-[18px] p-3.5 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-[20px]"
                style={{ backgroundColor: borderColors[msg.borderColor] }}
              />
              <div className="flex gap-3 pl-2">
                <div className="w-[50px] h-[50px] rounded-[8px] overflow-hidden bg-[#ddd]">
                  <img src={msg.productImage} alt={msg.productName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-[#888]">{msg.date}</div>
                  <h3 className="text-xs font-bold mt-0.5 text-[#101111] line-clamp-1">{msg.productName}</h3>
                  {msg.price && <div className="text-sm font-extrabold text-[#0b5d40] mt-1">{msg.price}</div>}
                </div>
              </div>
              <p className="text-[11px] text-[#666] mt-2 pl-2 line-clamp-2">{msg.preview}</p>
              {msg.status && (
                <div className="mt-2 ml-2 bg-[#f4ead2] px-2 py-0.5 rounded-lg text-[10px] text-[#888] inline-block">
                  {msg.status}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-[90px] right-6 w-[56px] h-[56px] rounded-full bg-[#7b1113] text-white border-none text-[28px] shadow-[0_8px_16px_rgba(0,0,0,.2)] flex items-center justify-center">
          +
        </button>

        {/* Bottom Navigation */}
        <BottomNav activeItem="inbox" />
      </div>

      {/* ==================== DESKTOP (≥ 1024px) ==================== */}
      <div className="hidden lg:flex h-screen">
        {/* Left Sidebar - Message List */}
        <div className="w-[380px] bg-white border-r border-[#eee] flex flex-col flex-shrink-0">
          {/* Header */}
          <div className="p-5 border-b border-[#eee]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-extrabold text-[#18352b]">Inbox</h1>
                <p className="text-sm text-[#7b1113] font-semibold mt-1">● {unreadCount} unread messages</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-[#7b1113] text-white border-none text-2xl flex items-center justify-center shadow-md hover:bg-[#6a0f11] transition-colors">
                +
              </button>
            </div>

            {/* Search */}
            <div className="mt-4">
              <div className="flex gap-2">
                <div className="flex-1 h-11 bg-[#f7f5f1] rounded-[12px] flex items-center px-3">
                  <span className="text-sm">🔍</span>
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-none outline-none bg-transparent text-sm ml-2"
                  />
                </div>
                <button className="w-11 h-11 border border-[#eee] rounded-[12px] bg-white text-lg flex items-center justify-center hover:bg-[#f7f5f1] transition-colors">⚙️</button>
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 border-b border-[#f0f0f0] cursor-pointer hover:bg-[#f7f5f1] transition-colors ${
                  selectedMessage?.id === msg.id ? 'bg-[#f7f5f1] border-l-4 border-l-[#0f7a58]' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-[56px] h-[56px] rounded-[10px] overflow-hidden bg-[#ddd] flex-shrink-0">
                    <img src={msg.productImage} alt={msg.productName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1 h-6 rounded-full flex-shrink-0"
                            style={{ backgroundColor: borderColors[msg.borderColor] }}
                          />
                          <h3 className="text-sm font-bold text-[#101111] truncate">{msg.productName}</h3>
                        </div>
                        <p className="text-xs text-[#666] mt-1 ml-3">{msg.supplierName}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="text-[11px] text-[#888]">{msg.date}</p>
                        {msg.price && <p className="text-sm font-extrabold text-[#0b5d40] mt-1">{msg.price}</p>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1.5 ml-3">
                      <p className="text-xs text-[#666] line-clamp-1">{msg.preview}</p>
                      {msg.status && (
                        <span className="ml-2 px-2 py-0.5 bg-[#f4ead2] rounded-lg text-[10px] text-[#888] flex-shrink-0">
                          {msg.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col bg-[#f7f5f1]">
          {selectedMessage ? (
            <>
              {/* Chat Header */}
              <div className="bg-white p-5 border-b border-[#eee]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-[56px] h-[56px] rounded-[10px] overflow-hidden bg-[#ddd] flex-shrink-0">
                      <img src={selectedMessage.productImage} alt={selectedMessage.productName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#101111]">{selectedMessage.productName}</h2>
                      <p className="text-sm text-[#666] mt-0.5">{selectedMessage.supplierName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                          style={{ backgroundColor: borderColors[selectedMessage.borderColor] }}
                        >
                          {selectedMessage.status || typeLabels[selectedMessage.type]}
                        </span>
                        <span className="text-xs text-[#888]">{selectedMessage.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full bg-[#f7f5f1] text-lg flex items-center justify-center hover:bg-[#eee] transition-colors">📞</button>
                    <button className="w-10 h-10 rounded-full bg-[#f7f5f1] text-lg flex items-center justify-center hover:bg-[#eee] transition-colors">📹</button>
                    <button className="w-10 h-10 rounded-full bg-[#f7f5f1] text-lg flex items-center justify-center hover:bg-[#eee] transition-colors">ℹ️</button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Received Message */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0f7a58] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#ddd]">
                            <img src={selectedMessage.productImage} alt={selectedMessage.productName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#101111]">{selectedMessage.productName}</p>
                            <p className="text-base font-extrabold text-[#0b5d40] mt-0.5">{selectedMessage.price}</p>
                            <p className="text-xs text-[#666] mt-0.5">Min. Order: 100 MT</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sent Message */}
                <div className="flex gap-4 justify-end">
                  <div className="flex-1 max-w-[560px] flex flex-col items-end">
                    <div className="bg-[#0f7a58] text-white rounded-2xl rounded-tr-sm p-4 shadow-sm">
                      <p className="text-sm leading-relaxed">I am interested in your product. Please send me more details about the pricing and delivery timeline.</p>
                    </div>
                    <span className="text-xs text-[#888] mt-2">10:32 AM · Delivered</span>
                  </div>
                </div>

                {/* Another Received Message */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0f7a58] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
              <div className="p-5 bg-white border-t border-[#eee]">
                <div className="flex gap-3 items-center">
                  <button className="w-11 h-11 rounded-full bg-[#f7f5f1] text-base flex items-center justify-center hover:bg-[#eee] transition-colors">📎</button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full h-12 bg-[#f7f5f1] rounded-full px-5 text-sm outline-none focus:ring-2 focus:ring-[#0f7a58]/30"
                    />
                  </div>
                  <button className="w-11 h-11 rounded-full bg-[#f7f5f1] text-base flex items-center justify-center hover:bg-[#eee] transition-colors">😊</button>
                  <button
                    onClick={handleSendReply}
                    className="w-12 h-12 rounded-full bg-[#7b1113] text-white border-none text-lg flex items-center justify-center shadow-md hover:bg-[#6a0f11] transition-colors"
                  >
                    ➤
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="text-5xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-[#101111] mb-2">Select a message</h3>
                <p className="text-sm text-[#666]">Choose a conversation from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}