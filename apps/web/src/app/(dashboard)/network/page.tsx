'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Connection {
  id: string;
  name: string;
  company: string;
  role: string;
  status: 'connected' | 'pending';
  avatar: string;
  lastInteraction: string;
}

interface Post {
  id: string;
  author: { name: string; company: string; avatar: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState('connections');
  const [connections, setConnections] = useState<Connection[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('leverage_connections');
    if (stored) {
      setConnections(JSON.parse(stored));
    } else {
      const initial: Connection[] = [
        { id: '1', name: 'Sarah Chen', company: 'Asia Trade Hub', role: 'Trade Consultant', status: 'connected', avatar: 'SC', lastInteraction: '2 hours ago' },
        { id: '2', name: 'Rakesh Sharma', company: 'Global Trade Partners', role: 'Compliance Expert', status: 'connected', avatar: 'RS', lastInteraction: '1 day ago' },
        { id: '3', name: 'Michael Torres', company: 'FastFreight Solutions', role: 'Logistics Manager', status: 'connected', avatar: 'MT', lastInteraction: '3 days ago' },
        { id: '4', name: 'Emily Watson', company: 'ImportMaster Ltd', role: 'Operations', status: 'pending', avatar: 'EW', lastInteraction: 'Pending' },
        { id: '5', name: 'David Lee', company: 'Pacific Trade Co', role: 'Director', status: 'connected', avatar: 'DL', lastInteraction: '1 week ago' },
      ];
      setConnections(initial);
      localStorage.setItem('leverage_connections', JSON.stringify(initial));
    }

    const storedPosts = localStorage.getItem('leverage_posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      const initialPosts: Post[] = [
        { id: '1', author: { name: 'Sarah Chen', company: 'Asia Trade Hub', avatar: 'SC' }, content: 'Looking for reliable freight partners for SEA routes. New partnership opportunities available!', timestamp: '2 hours ago', likes: 24, comments: 5 },
        { id: '2', author: { name: 'Michael Torres', company: 'FastFreight Solutions', avatar: 'MT' }, content: 'Just completed automated HS code classification integration. 40% reduction in processing time!', timestamp: '5 hours ago', likes: 45, comments: 12 },
        { id: '3', author: { name: 'Emily Watson', company: 'ImportMaster Ltd', avatar: 'EW' }, content: 'New trade routes opening between Europe and Asia. Anyone interested in partnering?', timestamp: '1 day ago', likes: 32, comments: 8 },
      ];
      setPosts(initialPosts);
      localStorage.setItem('leverage_posts', JSON.stringify(initialPosts));
    }
  }, []);

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: { name: 'You', company: 'Your Company', avatar: 'YO' },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
    };
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem('leverage_posts', JSON.stringify(updated));
    setNewPost('');
  };

  const handleConnect = (id: string) => {
    const updated = connections.map(c =>
      c.id === id ? { ...c, status: 'connected' as const } : c
    );
    setConnections(updated);
    localStorage.setItem('leverage_connections', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F4F1EA]">Network</h1>
        <p className="text-[#D8CCBC]/60 text-sm">Connect with trade professionals</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['connections', 'feed', 'explore'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-medium text-sm ${
              activeTab === tab ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Connections Tab */}
      {activeTab === 'connections' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connections.map(conn => (
            <div key={conn.id} className="card">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold border border-[#C49A6C]/20">
                  {conn.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#F4F1EA] font-semibold">{conn.name}</h3>
                  <p className="text-[#C49A6C] text-sm">{conn.company}</p>
                  <p className="text-[#D8CCBC]/50 text-xs">{conn.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  conn.status === 'connected' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {conn.status}
                </span>
                <div className="flex gap-2">
                  <Link href="/messages" className="px-3 py-1.5 bg-[#0E3B36] text-[#F4F1EA] rounded-lg text-xs font-medium">Message</Link>
                  {conn.status === 'pending' && (
                    <button onClick={() => handleConnect(conn.id)} className="px-3 py-1.5 bg-[#C49A6C] text-[#081512] rounded-lg text-xs font-semibold">Accept</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feed Tab */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {/* Create Post */}
          <div className="card">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share an update or opportunity..."
              className="w-full bg-transparent text-[#F4F1EA] placeholder-[#D8CCBC]/40 resize-none focus:outline-none"
              rows={3}
            />
            <div className="flex justify-end mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
              <button onClick={handleCreatePost} className="px-4 py-2 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm">
                Post
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.map(post => (
            <div key={post.id} className="card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0E3B36] flex items-center justify-center text-[#C49A6C] font-bold text-sm">
                  {post.author.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#F4F1EA] font-medium">{post.author.name}</span>
                    <span className="text-[#C49A6C] text-sm">• {post.author.company}</span>
                  </div>
                  <p className="text-[#D8CCBC] text-sm mt-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-[#D8CCBC]/50 text-xs">
                    <button className="flex items-center gap-1 hover:text-[#C49A6C]">
                      ❤️ {post.likes}
                    </button>
                    <button className="hover:text-[#C49A6C]">💬 {post.comments}</button>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Explore Tab */}
      {activeTab === 'explore' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Suggested Connections</h2>
          <div className="space-y-4">
            {[
              { name: 'James Wilson', company: 'EuroTrade Partners', role: 'Export Manager', avatar: 'JW' },
              { name: 'Priya Sharma', company: 'India Export Co', role: 'Business Development', avatar: 'PS' },
              { name: 'Carlos Mendez', company: 'LatAm Trading', role: 'Operations Director', avatar: 'CM' },
            ].map((person, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0E3B36] flex items-center justify-center text-[#C49A6C] font-bold">
                    {person.avatar}
                  </div>
                  <div>
                    <p className="text-[#F4F1EA] font-medium">{person.name}</p>
                    <p className="text-[#C49A6C] text-sm">{person.company}</p>
                    <p className="text-[#D8CCBC]/50 text-xs">{person.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newConn: Connection = { id: Date.now().toString(), ...person, status: 'pending', lastInteraction: 'Pending' };
                    const updated = [...connections, newConn];
                    setConnections(updated);
                    localStorage.setItem('leverage_connections', JSON.stringify(updated));
                  }}
                  className="px-4 py-2 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
