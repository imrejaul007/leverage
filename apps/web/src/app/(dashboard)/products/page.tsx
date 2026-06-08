'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Search, Plus, Edit, Trash2, Globe, TrendingUp, CheckCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  sku: string;
  minOrder: string;
  createdAt: string;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Premium Basmati Rice - 1121', description: 'Premium quality long grain basmati rice, aged for perfect cooking', category: 'Food & Agriculture', price: 850, currency: 'USD', stock: 500, status: 'active', sku: 'RICE-1121', minOrder: '50 MT', createdAt: '2024-01-20' },
  { id: '2', name: 'Cotton Yarn 40/1 Combed', description: 'High-quality combed cotton yarn for textile manufacturing', category: 'Textiles', price: 3.20, currency: 'USD', stock: 50, status: 'active', sku: 'COT-401', minOrder: '10 MT', createdAt: '2024-01-18' },
  { id: '3', name: 'Solar Panels - 550W Mono PERC', description: 'High-efficiency monocrystalline solar panels', category: 'Electronics', price: 165, currency: 'USD', stock: 1000, status: 'active', sku: 'SOL-550M', minOrder: '100 units', createdAt: '2024-01-15' },
  { id: '4', name: 'Steel Billets - Grade A', description: 'Premium quality steel billets for construction', category: 'Metals & Minerals', price: 620, currency: 'USD', stock: 2000, status: 'active', sku: 'STL-GA', minOrder: '100 MT', createdAt: '2024-01-12' },
  { id: '5', name: 'Pharmaceutical Raw Materials', description: 'GMP certified raw materials for pharmaceutical manufacturing', category: 'Healthcare', price: 45, currency: 'USD', stock: 5000, status: 'active', sku: 'PHA-RAW', minOrder: '1 MT', createdAt: '2024-01-10' },
  { id: '6', name: 'Bicycle Components Set', description: 'Complete set of high-quality bicycle components', category: 'Automotive', price: 28, currency: 'USD', stock: 250, status: 'active', sku: 'BIC-SET', minOrder: '50 sets', createdAt: '2024-01-08' },
];

const categories = ['Food & Agriculture', 'Textiles', 'Electronics', 'Metals & Minerals', 'Healthcare', 'Automotive', 'Chemicals', 'Other'];
const currencies = ['USD', 'EUR', 'GBP', 'AED', 'INR'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Food & Agriculture',
    price: '',
    currency: 'USD',
    stock: '',
    sku: '',
    minOrder: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('leverage_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('leverage_products', JSON.stringify(initialProducts));
    }
    setIsLoading(false);
  }, []);

  const saveProducts = (data: Product[]) => {
    setProducts(data);
    localStorage.setItem('leverage_products', JSON.stringify(data));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      currency: formData.currency,
      stock: parseInt(formData.stock) || 0,
      status: 'active',
      sku: formData.sku || `SKU-${Date.now()}`,
      minOrder: formData.minOrder || '1 unit',
      createdAt: new Date().toISOString().split('T')[0],
    };
    saveProducts([newProduct, ...products]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleUpdate = () => {
    if (!selectedProduct) return;
    const updated = products.map(p =>
      p.id === selectedProduct.id
        ? { ...p, ...formData, price: parseFloat(formData.price) || 0, stock: parseInt(formData.stock) || 0 }
        : p
    );
    saveProducts(updated);
    setShowEditModal(false);
    setSelectedProduct(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      saveProducts(products.filter(p => p.id !== id));
      setViewingProduct(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Food & Agriculture',
      price: '',
      currency: 'USD',
      stock: '',
      sku: '',
      minOrder: '',
    });
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      currency: product.currency,
      stock: product.stock.toString(),
      sku: product.sku,
      minOrder: product.minOrder,
    });
    setShowEditModal(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6 relative overflow-hidden">
      {/* Background decorations - Products/Inventory themed */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Globe with Product Routes */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] animate-[spin_70s_linear_infinite]">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.06]">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#154230" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" transform="rotate(60 200 200)" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" transform="rotate(-60 200 200)" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#154230" strokeWidth="0.5" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#154230" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Product/Catalog Grid Pattern */}
        <svg className="absolute top-0 left-0 w-[350px] h-[300px] opacity-[0.05]" viewBox="0 0 350 300">
          {/* Product boxes grid */}
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="90" y="20" width="60" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="160" y="20" width="60" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="230" y="20" width="60" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="20" y="100" width="60" height="60" fill="none" stroke="#154230" strokeWidth="1" rx="4" />
          <rect x="90" y="100" width="60" height="60" fill="none" stroke="#154230" strokeWidth="1" rx="4" />
          <rect x="160" y="100" width="60" height="60" fill="none" stroke="#154230" strokeWidth="1" rx="4" />
          <rect x="230" y="100" width="60" height="60" fill="none" stroke="#154230" strokeWidth="1" rx="4" />
          <rect x="20" y="180" width="60" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="90" y="180" width="60" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="160" y="180" width="60" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="230" y="180" width="60" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
        </svg>

        {/* Supply Chain Arrows */}
        <svg className="absolute bottom-10 left-10 w-[200px] h-[100px] opacity-[0.06]" viewBox="0 0 200 100">
          <rect x="10" y="30" width="40" height="30" fill="none" stroke="#A6824A" strokeWidth="1" rx="2" />
          <path d="M55,45 L70,45 L65,40 M70,45 L65,50" fill="none" stroke="#A6824A" strokeWidth="1" />
          <rect x="75" y="30" width="40" height="30" fill="none" stroke="#A6824A" strokeWidth="1" rx="2" />
          <path d="M120,45 L135,45 L130,40 M135,45 L130,50" fill="none" stroke="#A6824A" strokeWidth="1" />
          <rect x="140" y="30" width="40" height="30" fill="none" stroke="#A6824A" strokeWidth="1" rx="2" />
        </svg>

        {/* Floating Product Particles */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${4 + (i * 5)}%`,
              top: `${12 + (i % 9) * 10}%`,
              width: i % 3 === 0 ? '8px' : i % 3 === 1 ? '6px' : '10px',
              height: i % 3 === 0 ? '8px' : i % 3 === 1 ? '6px' : '10px',
              backgroundColor: i % 4 === 0 ? '#A6824A' : i % 4 === 1 ? '#154230' : i % 4 === 2 ? '#5D1E21' : '#154230',
              animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.1 + (i % 4) * 0.05,
            }}
          />
        ))}

        {/* Connection Lines */}
        <svg className="absolute top-1/3 right-0 w-[300px] h-[150px] opacity-[0.05]" viewBox="0 0 300 150">
          <path d="M0,75 Q75,0 150,75 Q225,150 300,75" fill="none" stroke="#A6824A" strokeWidth="1" />
          <circle cx="0" cy="75" r="3" fill="#A6824A" />
          <circle cx="150" cy="75" r="4" fill="#A6824A" />
          <circle cx="300" cy="75" r="3" fill="#A6824A" />
        </svg>

        {/* Wave Pattern */}
        <svg className="absolute bottom-0 left-0 right-0 h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 Q180,0 360,40 T720,40 T1080,40 T1440,40 L1440,80 L0,80 Z" fill="#154230" opacity="0.02" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Package icon */}
          <div className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#101111]">My Products</h1>
            <p className="text-[#4A4A4A] text-sm">{filteredProducts.length} products in catalog</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#154230] text-white rounded-xl font-semibold text-sm shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Products Stats Bar */}
      <div className="flex items-center gap-6 p-4 bg-white border border-black/5 rounded-xl overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{products.length}</p>
            <p className="text-[#4A4A4A] text-xs">Total</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{products.filter(p => p.status === 'active').length}</p>
            <p className="text-[#4A4A4A] text-xs">Active</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#A6824A]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">$45.2K</p>
            <p className="text-[#4A4A4A] text-xs">Total Value</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#5D1E21]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">8</p>
            <p className="text-[#4A4A4A] text-xs">Categories</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm"
          />
          <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#D8CCBC] text-sm focus:outline-none focus:border-[#C49A6C]"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square bg-[#0E3B36]/50 rounded-xl mb-4"></div>
              <div className="h-5 bg-[#0E3B36]/50 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-[#0E3B36]/50 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📦</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-sm mb-4">No products found</p>
          <button onClick={() => setShowCreateModal(true)} className="text-[#C49A6C] hover:text-[#D4AA82] font-medium text-sm">
            Add your first product
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => setViewingProduct(product)}
              className="card p-3 sm:p-4 hover:border-[#C49A6C]/30 transition-all cursor-pointer"
            >
              <div className="aspect-square bg-[#0E3B36]/50 rounded-xl mb-3 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl opacity-50">📦</span>
              </div>
              <h3 className="text-[#F4F1EA] font-medium text-sm sm:text-base line-clamp-2 mb-1">{product.name}</h3>
              <p className="text-[#D8CCBC]/50 text-xs mb-2 truncate">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold text-[#C49A6C]">
                  ${product.price.toFixed(2)}
                </span>
                <span className={`text-xs ${product.stock < 10 ? 'text-red-400' : 'text-[#D8CCBC]/50'}`}>
                  {product.stock} in stock
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Product Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">Product Details</h2>
              <button onClick={() => setViewingProduct(null)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#0E3B36]/50 rounded-xl flex items-center justify-center text-4xl">
                  📦
                </div>
                <div>
                  <h3 className="text-[#F4F1EA] text-lg font-semibold">{viewingProduct.name}</h3>
                  <p className="text-[#C49A6C] text-sm">SKU: {viewingProduct.sku}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Price</p>
                  <p className="text-[#C49A6C] text-xl font-bold">${viewingProduct.price.toFixed(2)} {viewingProduct.currency}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Stock</p>
                  <p className={`text-xl font-bold ${viewingProduct.stock < 10 ? 'text-red-400' : 'text-[#F4F1EA]'}`}>
                    {viewingProduct.stock} units
                  </p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Category</p>
                  <p className="text-[#F4F1EA]">{viewingProduct.category}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Min Order</p>
                  <p className="text-[#F4F1EA]">{viewingProduct.minOrder}</p>
                </div>
              </div>

              <div>
                <p className="text-[#D8CCBC]/50 text-xs mb-1">Description</p>
                <p className="text-[#F4F1EA]">{viewingProduct.description}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => handleDelete(viewingProduct.id)} className="py-3 px-6 bg-red-500/20 text-red-400 rounded-xl font-medium">
                  Delete
                </button>
                <button
                  onClick={() => { setViewingProduct(null); openEditModal(viewingProduct); }}
                  className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">{showEditModal ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedProduct(null); resetForm(); }} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Product Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full input" placeholder="Premium Basmati Rice" />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">SKU</label>
                <input type="text" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} className="w-full input" placeholder="RICE-1121" />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full input">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Price *</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full input" placeholder="850" />
                </div>
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Currency</label>
                  <select value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })} className="w-full input">
                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Stock</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full input" placeholder="500" />
                </div>
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Min Order</label>
                  <input type="text" value={formData.minOrder} onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })} className="w-full input" placeholder="50 MT" />
                </div>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full input resize-none" rows={3} placeholder="Product description..." />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedProduct(null); resetForm(); }} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">Cancel</button>
                <button
                  onClick={showEditModal ? handleUpdate : handleCreate}
                  disabled={!formData.name || !formData.price}
                  className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50"
                >
                  {showEditModal ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
