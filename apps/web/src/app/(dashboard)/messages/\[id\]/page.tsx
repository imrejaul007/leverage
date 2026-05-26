'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function MessageDetailPage() {
  const params = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participant, setParticipant] = useState<any>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!params.id) return;
    const stored = localStorage.getItem('leverage_conversations');
    if (stored) {
      const all = JSON.parse(stored);
      const conv = all.find((c: any) => c.id === params.id);
      if (conv) {
        setParticipant(conv.participant);
        setMessages(conv.messages || []);
      }
    }
  }, [params.id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = { id: Date.now().toString(), role: 'user', content: newMessage, timestamp: new Date() };
    setMessages([...messages, msg]);
    setNewMessage('');
    
    setTimeout(() => {
      const reply = { id: Date.now() + 1, role: 'assistant', content: 'Got it! I will check and respond shortly.', timestamp: new Date() };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-[rgba(255,255,255,0.05)]">
        <Link href="/messages" className="text-[#D8CCBC]">←</Link>
        <div className="w-10 h-10 rounded-full bg-[#0E3B36] flex items-center justify-center text-[#C49A6C] font-bold">
          {participant?.name?.charAt(0) || '?'}
        </div>
        <div>
          <p className="text-[#F4F1EA] font-medium">{participant?.name || 'Loading...'}</p>
          <p className="text-[#C49A6C] text-xs">{participant?.company}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#F4F1EA]'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex gap-2">
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..." className="flex-1 h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C]" />
          <button onClick={sendMessage} className="w-12 h-12 bg-[#C49A6C] text-[#081512] rounded-xl font-bold">→</button>
        </div>
      </div>
    </div>
  );
}
