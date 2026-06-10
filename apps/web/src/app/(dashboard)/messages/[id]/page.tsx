'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import BottomNav from '@/components/BottomNav';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  participant: { name: string; company?: string; avatar?: string };
  messages: Message[];
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
}

export default function MessageDetailPage() {
  const params = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = params.id as string;
    const stored = localStorage.getItem('leverage_conversations');
    if (stored) {
      const parsed: Conversation[] = JSON.parse(stored);
      parsed.forEach((conv: Conversation) => {
        conv.lastMessageAt = new Date(conv.lastMessageAt);
        conv.messages.forEach((msg: Message) => { msg.timestamp = new Date(msg.timestamp); });
      });
      const found = parsed.find(c => c.id === id);
      setConversation(found || null);
      setConversations(parsed);
    }
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const saveConversations = (data: Conversation[]) => {
    setConversations(data);
    localStorage.setItem('leverage_conversations', JSON.stringify(data));
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !conversation) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: newMessage, timestamp: new Date() };

    const updated = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return { ...conv, messages: [...conv.messages, userMsg], lastMessage: newMessage, lastMessageAt: new Date(), unreadCount: 0 };
      }
      return conv;
    });

    saveConversations(updated);
    setConversation(updated.find(c => c.id === conversation.id) || null);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const replies = [
        'Thanks for your message. Let me check on that for you.',
        'Got it! I\'ll get back to you shortly.',
        'Understood. I\'ll process this right away.',
        'Thanks for the update. I\'ll review and respond soon.',
      ];
      const replyMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: replies[Math.floor(Math.random() * replies.length)], timestamp: new Date() };

      const updatedWithReply = conversations.map(conv => {
        if (conv.id === conversation.id) {
          return { ...conv, messages: [...conv.messages, replyMsg], lastMessage: replyMsg.content, lastMessageAt: new Date(), unreadCount: 0 };
        }
        return conv;
      });

      saveConversations(updatedWithReply);
      setConversation(updatedWithReply.find(c => c.id === conversation.id) || null);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/messages" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></Link>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Conversation Not Found</h1>
        </div>
        <div className="card text-center py-12"><div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">💬</span></div><p className="text-[#D8CCBC]/50 mb-4">This conversation does not exist.</p><Link href="/messages" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">Back to Messages</Link></div>
      </div>
    );
  }

  const initials = conversation.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="flex items-center gap-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
        <Link href="/messages" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></Link>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold border border-[#C49A6C]/20">{initials}</div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#F4F1EA]">{conversation.participant.name}</h2>
          {conversation.participant.company && <p className="text-[#C49A6C] text-sm">{conversation.participant.company}</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {conversation.messages.length === 0 ? (
          <div className="text-center py-12"><div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">💬</span></div><p className="text-[#D8CCBC]/50 mb-2">No messages yet</p><p className="text-[#D8CCBC]/30 text-sm">Start the conversation by sending a message</p></div>
        ) : conversation.messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#F4F1EA]'}`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-[#081512]/60' : 'text-[#D8CCBC]/50'}`}>{formatTime(msg.timestamp)}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#0E3B36] rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="pt-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex gap-3">
          <button className="w-12 h-12 bg-[#0E3B36] rounded-xl flex items-center justify-center text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></button>
          <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Type a message..." className="flex-1 min-h-[48px] max-h-[120px] px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm resize-none" rows={1} />
          <button onClick={sendMessage} disabled={!newMessage.trim() || isTyping} className="w-12 h-12 bg-[#C49A6C] text-[#081512] rounded-xl flex items-center justify-center font-bold disabled:opacity-50 hover:bg-[#D4AA82] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></button>
        </div>
        <p className="text-[#D8CCBC]/30 text-xs mt-2 text-center">Press Enter to send, Shift+Enter for new line</p>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeItem="inbox" />
    </div>
  );
}
