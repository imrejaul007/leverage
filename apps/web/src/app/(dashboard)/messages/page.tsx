'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Conversation {
  id: string;
  name: string;
  company: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const conversations: Conversation[] = [
    { id: '1', name: 'Sarah Chen', company: 'TechExport Solutions', lastMessage: 'Thanks for the quote! I\'ll review and get back to you.', timestamp: '10 min ago', unread: true, avatar: 'SC' },
    { id: '2', name: 'Michael Rodriguez', company: 'Global Logistics Inc', lastMessage: 'The shipment has been dispatched. Tracking number attached.', timestamp: '1 hour ago', unread: true, avatar: 'MR' },
    { id: '3', name: 'Emily Watson', company: 'ImportMaster Ltd', lastMessage: 'Document received. Processing now.', timestamp: '3 hours ago', unread: false, avatar: 'EW' },
    { id: '4', name: 'James Lee', company: 'Pacific Trade Co', lastMessage: 'Can we schedule a call tomorrow?', timestamp: '1 day ago', unread: false, avatar: 'JL' },
    { id: '5', name: 'Anna Schmidt', company: 'EuroTrade GmbH', lastMessage: 'The samples have been shipped.', timestamp: '2 days ago', unread: false, avatar: 'AS' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Conversations List */}
      <div className="w-80 bg-slate-800 rounded-xl border border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/messages/${conv.id}`}
              className={`block p-4 border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors ${
                selectedConversation === conv.id ? 'bg-slate-700' : ''
              }`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                  conv.unread ? 'bg-blue-600' : 'bg-slate-600'
                }`}>
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${conv.unread ? 'text-white' : 'text-gray-300'}`}>
                      {conv.name}
                    </span>
                    <span className="text-gray-500 text-xs">{conv.timestamp}</span>
                  </div>
                  <p className="text-gray-400 text-sm truncate">{conv.company}</p>
                  <p className={`text-sm truncate mt-1 ${conv.unread ? 'text-gray-300' : 'text-gray-500'}`}>
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-gray-400 mb-2">Select a conversation to start messaging</p>
          <p className="text-gray-500 text-sm">or go to a specific conversation via direct link</p>
        </div>
      </div>
    </div>
  );
}
