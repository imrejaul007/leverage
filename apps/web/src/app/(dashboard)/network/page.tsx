'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  author: {
    name: string;
    company: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');

  const posts: Post[] = [
    {
      id: '1',
      author: { name: 'Sarah Chen', company: 'TechExport Solutions', avatar: 'SC' },
      content: 'Excited to announce our new partnership with manufacturers in Vietnam! Looking for reliable freight partners for SEA routes. #TradeExpansion #Vietnam',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 5,
    },
    {
      id: '2',
      author: { name: 'Michael Rodriguez', company: 'Global Logistics Inc', avatar: 'MR' },
      content: 'Anyone have experience with the new US-China trade regulations? Looking for insights on recent changes to semiconductor exports.',
      timestamp: '5 hours ago',
      likes: 18,
      comments: 12,
    },
    {
      id: '3',
      author: { name: 'Emily Watson', company: 'ImportMaster Ltd', avatar: 'EW' },
      content: 'Just completed our AI compliance integration for automated HS code classification. Results are impressive - 40% reduction in processing time!',
      timestamp: '1 day ago',
      likes: 56,
      comments: 8,
    },
  ];

  const companies = [
    { name: 'TechExport Solutions', type: 'Exporter', rating: 4.8, trades: 234 },
    { name: 'Global Logistics Inc', type: 'Logistics', rating: 4.9, trades: 567 },
    { name: 'ImportMaster Ltd', type: 'Importer', rating: 4.7, trades: 189 },
    { name: 'Pacific Trade Co', type: 'Trading', rating: 4.6, trades: 145 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Trade Network</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + New Post
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-700">
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'feed'
              ? 'text-blue-400 border-blue-400'
              : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'companies'
              ? 'text-blue-400 border-blue-400'
              : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Companies
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'connections'
              ? 'text-blue-400 border-blue-400'
              : 'text-gray-400 border-transparent hover:text-white'
          }`}
        >
          Connections
        </button>
      </div>

      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* New Post */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <textarea
              placeholder="Share an update with your network..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:border-blue-500 resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Post
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {post.author.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{post.author.name}</h3>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{post.author.company}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    <div className="flex items-center gap-6 text-gray-400">
                      <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {post.comments} comments
                      </button>
                      <span className="text-gray-500 text-sm">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company, i) => (
            <Link
              key={i}
              href={`/network/${i + 1}`}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                  {company.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{company.name}</h3>
                  <p className="text-gray-400 text-sm">{company.type}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-white">{company.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{company.trades} trades</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-gray-400 text-center">Your connections will appear here. Start connecting with companies in the network!</p>
        </div>
      )}
    </div>
  );
}
