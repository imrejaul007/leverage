'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Search, MessageSquare, UserPlus, Grid3X3, List, X, Send } from 'lucide-react';

interface Connection {
  id: string;
  name: string;
  company: string;
  role: string;
  status: 'connected' | 'pending';
  avatar: string;
  lastInteraction: string;
  country: string;
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const initial: Connection[] = [
      { id: '1', name: 'Sarah Chen', company: 'Asia Trade Hub', role: 'Trade Consultant', status: 'connected', avatar: 'SC', lastInteraction: '2 hours ago', country: '🇸🇬' },
      { id: '2', name: 'Rakesh Sharma', company: 'Global Trade Partners', role: 'Compliance Expert', status: 'connected', avatar: 'RS', lastInteraction: '1 day ago', country: '🇮🇳' },
      { id: '3', name: 'Michael Torres', company: 'FastFreight Solutions', role: 'Logistics Manager', status: 'connected', avatar: 'MT', lastInteraction: '3 days ago', country: '🇺🇸' },
      { id: '4', name: 'Emily Watson', company: 'ImportMaster Ltd', role: 'Operations', status: 'pending', avatar: 'EW', lastInteraction: 'Pending', country: '🇬🇧' },
      { id: '5', name: 'David Lee', company: 'Pacific Trade Co', role: 'Director', status: 'connected', avatar: 'DL', lastInteraction: '1 week ago', country: '🇰🇷' },
      { id: '6', name: 'Anna Mueller', company: 'EU Trade Connect', role: 'Import Specialist', status: 'connected', avatar: 'AM', lastInteraction: '2 weeks ago', country: '🇩🇪' },
    ];
    setConnections(initial);

    const initialPosts: Post[] = [
      { id: '1', author: { name: 'Sarah Chen', company: 'Asia Trade Hub', avatar: 'SC' }, content: 'Looking for reliable suppliers of organic cotton from India. Any recommendations?', timestamp: '2 hours ago', likes: 24, comments: 8 },
      { id: '2', author: { name: 'Rakesh Sharma', company: 'Global Trade Partners', avatar: 'RS' }, content: 'New HS code classification guidelines released for electronics. Important update for all importers!', timestamp: '5 hours ago', likes: 56, comments: 12 },
      { id: '3', author: { name: 'Michael Torres', company: 'FastFreight Solutions', avatar: 'MT' }, content: 'Shipping rates from Shanghai to LA dropping next month. Good time to book!', timestamp: '1 day ago', likes: 34, comments: 5 },
    ];
    setPosts(initialPosts);
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: { name: 'You', company: 'Your Company', avatar: 'YO' },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#101111]">My Network</h1>
          <p className="text-[#4A4A4A] text-sm">{connections.filter(c => c.status === 'connected').length} connections</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors text-sm">
          <UserPlus className="w-4 h-4" />
          Invite Contacts
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('connections')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'connections' ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A] border border-black/5'
          }`}
        >
          Connections
        </button>
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'feed' ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A] border border-black/5'
          }`}
        >
          Trade Feed
        </button>
      </div>

      {activeTab === 'connections' ? (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search connections..."
              className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 bg-white border border-black/5 rounded-lg p-1 w-fit">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#E6E2DA]' : ''}`}
            >
              <Grid3X3 className="w-4 h-4 text-[#4A4A4A]" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#E6E2DA]' : ''}`}
            >
              <List className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>

          {/* Connections Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {connections.map(conn => (
                <div key={conn.id} className="bg-white border border-black/5 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center text-white font-bold">
                      {conn.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#101111] font-semibold text-sm truncate">{conn.name}</h3>
                      <p className="text-[#4A4A4A] text-xs truncate">{conn.role}</p>
                    </div>
                    <span className="text-lg">{conn.country}</span>
                  </div>
                  <p className="text-[#4A4A4A] text-xs mb-3">{conn.company}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-[#154230] text-white font-medium rounded-lg text-xs hover:bg-[#1d5240] transition-colors">
                      Message
                    </button>
                    {conn.status === 'pending' && (
                      <button className="flex-1 py-2 bg-[#E6E2DA] text-[#101111] font-medium rounded-lg text-xs hover:bg-[#D4CCBE] transition-colors">
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {connections.map(conn => (
                <div key={conn.id} className="bg-white border border-black/5 rounded-xl p-4 hover:shadow-md transition-all flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center text-white font-bold">
                    {conn.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[#101111] font-semibold text-sm">{conn.name}</h3>
                      <span className="text-sm">{conn.country}</span>
                    </div>
                    <p className="text-[#4A4A4A] text-xs">{conn.role} at {conn.company}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${conn.status === 'connected' ? 'bg-[#154230]/10 text-[#154230]' : 'bg-[#5D1E21]/10 text-[#5D1E21]'}`}>
                    {conn.status}
                  </span>
                  <button className="p-2 text-[#4A4A4A] hover:text-[#154230] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          {/* New Post */}
          <div className="bg-white border border-black/5 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#154230] flex items-center justify-center text-white font-bold text-sm">
                YO
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share an update with your network..."
                  className="w-full p-3 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm resize-none"
                  rows={2}
                />
                <div className="flex justify-end mt-2">
                  <button onClick={handlePost} className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white font-semibold rounded-lg text-sm hover:bg-[#1d5240] transition-colors">
                    <Send className="w-4 h-4" />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {posts.map(post => (
            <div key={post.id} className="bg-white border border-black/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#A6824A] flex items-center justify-center text-white font-bold text-sm">
                  {post.author.avatar}
                </div>
                <div>
                  <h3 className="text-[#101111] font-semibold text-sm">{post.author.name}</h3>
                  <p className="text-[#4A4A4A] text-xs">{post.author.company}</p>
                </div>
                <span className="ml-auto text-[#4A4A4A] text-xs">{post.timestamp}</span>
              </div>
              <p className="text-[#101111] text-sm mb-3">{post.content}</p>
              <div className="flex gap-4 text-[#4A4A4A] text-xs">
                <button className="flex items-center gap-1 hover:text-[#154230]">
                  <span>❤️</span> {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-[#154230]">
                  <MessageSquare className="w-3 h-3" /> {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
