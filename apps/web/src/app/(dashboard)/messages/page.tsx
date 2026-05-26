'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Conversation {
  id: string;
  participant: { name: string; company?: string };
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

const mockConversations: Conversation[] = [
  { id: '1', participant: { name: 'Sarah Chen', company: 'Asia Trade Hub' }, lastMessage: 'Shipment confirmed for next week.', lastMessageAt: '2m ago', unreadCount: 2 },
  { id: '2', participant: { name: 'Rakesh Sharma', company: 'Global Trade Partners' }, lastMessage: 'Updated quotation attached.', lastMessageAt: '15m ago', unreadCount: 0 },
  { id: '3', participant: { name: 'Michael Torres', company: 'FastFreight' }, lastMessage: 'Container CL-1234 ready.', lastMessageAt: '1h ago', unreadCount: 1 },
  { id: '4', participant: { name: 'John Williams', company: 'US Imports' }, lastMessage: 'Payment confirmed!', lastMessageAt: '3h ago', unreadCount: 0 },
  { id: '5', participant: { name: 'Ahmad Hassan', company: 'Dubai Trading' }, lastMessage: 'Send the COO document?', lastMessageAt: '1d ago', unreadCount: 0 },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConversations(mockConversations);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col -mx-4 -my-4">
      {/* Mobile Header */}
      <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.05)] bg-[#081512]">
        <h1 className="text-lg font-bold text-[#F4F1EA]">Messages</h1>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-start gap-3 animate-pulse">
                <div className="w-12 h-12 bg-[#0E3B36]/50 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-[#0E3B36]/50 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-[#0E3B36]/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-[#D8CCBC]/50 text-sm">No conversations yet</p>
          </div>
        ) : (
          <div>
            {conversations.map(conv => {
              const initials = conv.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              const isSelected = selectedConv?.id === conv.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full flex items-start gap-3 p-4 border-b border-[rgba(255,255,255,0.03)] text-left transition-colors ${
                    isSelected ? 'bg-[#0E3B36]/50' : 'hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold text-sm border border-[#C49A6C]/20 flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#F4F1EA] text-sm font-medium truncate">{conv.participant.name}</span>
                      <span className="text-[#D8CCBC]/40 text-xs flex-shrink-0">{conv.lastMessageAt}</span>
                    </div>
                    {conv.participant.company && (
                      <p className="text-[#C49A6C] text-xs truncate">{conv.participant.company}</p>
                    )}
                    <p className="text-[#D8CCBC]/60 text-sm truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 bg-[#C49A6C] rounded-full text-[#081512] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat Area - Mobile: Shows when conversation selected */}
      {selectedConv && (
        <div className="flex-1 flex flex-col border-t border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 border-b border-[rgba(255,255,255,0.05)]">
            <button onClick={() => setSelectedConv(null)} className="p-1 text-[#D8CCBC]">
              ←
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold text-sm">
              {selectedConv.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-[#F4F1EA] text-sm font-medium">{selectedConv.participant.name}</p>
              {selectedConv.participant.company && (
                <p className="text-[#C49A6C] text-xs">{selectedConv.participant.company}</p>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] bg-[#0E3B36] text-[#F4F1EA] rounded-2xl rounded-tl-sm px-4 py-3">
                <p className="text-sm">Hi! Regarding the shipment, everything is on track. The container will depart on Monday.</p>
                <p className="text-xs text-[#D8CCBC]/50 mt-1">10:30 AM</p>
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div className="max-w-[80%] bg-[#C49A6C] text-[#081512] rounded-2xl rounded-tr-sm px-4 py-3">
                <p className="text-sm">Great! Can you send me the tracking number?</p>
                <p className="text-xs text-[#081512]/60 mt-1">10:32 AM</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[80%] bg-[#0E3B36] text-[#F4F1EA] rounded-2xl rounded-tl-sm px-4 py-3">
                <p className="text-sm">{selectedConv.lastMessage}</p>
                <p className="text-xs text-[#D8CCBC]/50 mt-1">10:35 AM</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm"
              />
              <button className="w-12 h-12 bg-[#C49A6C] text-[#081512] rounded-xl flex items-center justify-center font-bold">
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State - when no conversation selected on mobile */}
      {!selectedConv && (
        <div className="hidden sm:flex flex-1 items-center justify-center bg-[rgba(255,255,255,0.02)] border-l border-[rgba(255,255,255,0.05)]">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-[#D8CCBC]/50 text-sm">Select a conversation</p>
          </div>
        </div>
      )}
    </div>
  );
}
