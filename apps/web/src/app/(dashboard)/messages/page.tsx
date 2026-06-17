'use client';

import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const conversations = [
  { id: '1', name: 'Ahmed K.', company: 'ABC Imports Ltd', lastMessage: 'Thanks for the quote. Can you send samples?', time: '2h ago', unread: true, avatar: 'AK' },
  { id: '2', name: 'Sarah M.', company: 'Euro Textile Co', lastMessage: 'When can we expect delivery?', time: '5h ago', unread: true, avatar: 'SM' },
  { id: '3', name: 'James L.', company: 'Pacific Steel Inc', lastMessage: 'The quality looks great!', time: '1d ago', unread: false, avatar: 'JL' },
];

const messages = [
  { id: 1, sender: 'them', text: 'Hi, I\'m interested in your Basmati Rice. Can you provide a quote for 100 MT?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Hello! Thank you for your interest. Our price for 1121 Basmati Rice is $850/MT FOB.', time: '10:45 AM' },
  { id: 3, sender: 'them', text: 'That sounds reasonable. What about payment terms?', time: '11:00 AM' },
  { id: 4, sender: 'me', text: 'We typically accept L/C at sight or T/T 30% advance.', time: '11:15 AM' },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24 flex flex-col">
      <PageHeader title="Messages" subtitle="Communicate with buyers" backHref="/dashboard" />

      <div className="flex-1 px-4 -mt-6 flex gap-4">
        {/* Conversation List */}
        <div className="w-1/3 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-3 border-b border-black/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A]" />
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-[#E6E2DA] rounded-lg text-sm focus:outline-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className={`w-full p-3 text-left border-b border-black/5 hover:bg-[#E6E2DA] transition-colors ${selected.id === conv.id ? 'bg-[#154230]/10' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#101111] text-sm truncate">{conv.name}</span>
                      <span className="text-[#4A4A4A] text-xs">{conv.time}</span>
                    </div>
                    <p className="text-[#4A4A4A] text-xs truncate">{conv.company}</p>
                    <p className="text-[#4A4A4A] text-xs truncate mt-1">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && <div className="w-2 h-2 bg-[#154230] rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {selected.avatar}
              </div>
              <div>
                <p className="font-medium text-[#101111]">{selected.name}</p>
                <p className="text-[#4A4A4A] text-sm">{selected.company}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg"><MoreVertical className="w-5 h-5 text-[#4A4A4A]" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#101111]'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-[#4A4A4A]'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-black/5 flex items-center gap-3">
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg"><Paperclip className="w-5 h-5 text-[#4A4A4A]" /></button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-[#E6E2DA] rounded-xl focus:outline-none"
            />
            <button className="p-3 bg-[#154230] rounded-xl text-white hover:bg-[#1d5240]">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <BottomNav activeItem="messages" />
    </div>
  );
}
