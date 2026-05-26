'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { messagesApi } from '@/lib/api-client';

interface Conversation {
  id: string;
  participants?: Array<{ id: string; name: string; email?: string }>;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount?: number;
}

export default function MessagesPage() {
  const { data, isLoading, isError } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await messagesApi.getConversations();
      return response.data.data || [];
    },
    retry: false,
  });

  const conversations = data || [];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Conversations List */}
      <div className="w-80 bg-slate-800 rounded-xl border border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
        </div>

        {/* Error State */}
        {isError && (
          <div className="p-4 text-red-400 text-sm">
            Failed to load conversations
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && conversations.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            No conversations yet
          </div>
        )}

        {/* Conversations */}
        {!isLoading && conversations.length > 0 && (
          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => {
              const participant = conv.participants?.[0];
              const name = participant?.name || 'Unknown';
              const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

              return (
                <Link
                  key={conv.id}
                  href={`/messages/${conv.id}`}
                  className="block p-4 border-b border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{name}</span>
                        {conv.lastMessageAt && (
                          <span className="text-xs text-gray-500">
                            {formatTime(conv.lastMessageAt)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 truncate">
                        {conv.lastMessage || 'No messages yet'}
                      </p>
                    </div>
                    {conv.unreadCount && conv.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-blue-600 rounded-full text-xs text-white flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Empty Chat Area */}
      <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-400">Select a conversation to start messaging</p>
        </div>
      </div>
    </div>
  );
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}
