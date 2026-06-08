'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Search, Plus, Edit, Trash2, Bell, Home, FileText, Mail, User, Menu, X, Settings, LogOut, MessageSquare, Truck, BarChart3, Briefcase } from 'lucide-react';

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

const categories = ['Food& Agriculture', 'Textiles', 'Electronics', 'Metals & Minerals', 'Healthcare', 'Automotive', 'Chemicals', 'Other'];
const currencies = ['USD', 'EUR', 'GBP', 'AED', 'INR'];

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/products', icon: Briefcase, label: 'Products', active: true },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const bottomNavLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs/new', icon: Plus, label: 'Post RFQ', primary: true },
  { href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/account', icon: User, label: 'Account' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Food& Agriculture',
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
      category: 'Food& Agriculture',
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
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-black/5">
          <div className="flex items-center gap-3">
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Overlay - Visible only on mobile */}
      <div className="lg:hidden">
        {/* Green Gradient Header */}
        <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
                <Menu className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center gap-2">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5D1E21] rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">3</span>
                </span>
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">My Products</h2>
            <p className="text-white/70 text-sm">Manage your product catalog</p>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="relative w-72 bg-white h-full flex flex-col shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <div className="flex items-center gap-3">
                  <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
                  <X className="w-5 h-5 text-[#4A4A4A]" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = link.active;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-[#154230] text-white'
                          : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-black/5">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#101111] font-semibold text-sm">John Doe</p>
                    <p className="text-[#4A4A4A] text-xs">john@company.com</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pb-24 lg:pb-8">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-2xl">My Products</h2>
              <p className="text-white/70 text-sm mt-1">Manage your product catalog</p>
            </div>
            <button className="relative p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5D1E21] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Content Area */}
        <div className="lg:hidden px-4 -mt-6 space-y-5 pb-4">
          {/* Search & Filter */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm shadow-sm"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-black/5 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-[#A6824A] shadow-sm appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#154230] text-white rounded-xl font-semibold text-sm shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                  <div className="aspect-square bg-[#E6E2DA] rounded-xl mb-3"></div>
                  <div className="h-4 bg-[#E6E2DA] rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-[#E6E2DA] rounded w-1/3"></div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-[#154230]" />
              </div>
              <p className="text-[#4A4A4A] text-sm mb-4">No products found</p>
              <button onClick={() => setShowCreateModal(true)} className="text-[#154230] hover:text-[#1d5240] font-semibold text-sm">
                Add your first product
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => setViewingProduct(product)}
                  className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="aspect-square bg-[#E6E2DA] rounded-xl mb-3 flex items-center justify-center">
                    <Package className="w-12 h-12 text-[#154230]/30" />
                  </div>
                  <h3 className="text-[#101111] font-semibold text-sm line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-[#4A4A4A] text-xs mb-2 truncate">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#154230] font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className={`text-xs ${product.stock < 10 ? 'text-[#5D1E21]' : 'text-[#4A4A4A]'}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Burgundy Stats Bar */}
          <div className="bg-[#5D1E21] rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-white font-bold text-lg">${(products.reduce((acc, p) => acc + p.price * p.stock, 0) / 1000).toFixed(1)}K</p>
                <p className="text-white/60 text-xs">Total Value</p>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-lg">{products.length}</p>
                <p className="text-white/60 text-xs">Products</p>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-lg">{products.reduce((acc, p) => acc + p.stock, 0).toLocaleString()}</p>
                <p className="text-white/60 text-xs">Total Stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Content Area */}
        <div className="hidden lg:block px-8 py-8 space-y-6">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm shadow-sm"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-48 h-12 px-4 bg-white border border-black/5 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-[#A6824A] shadow-sm appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#154230] text-white rounded-xl font-semibold text-sm shadow-md hover:bg-[#1a5a3a] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          {/* Products Grid */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => setViewingProduct(product)}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="aspect-square bg-[#E6E2DA] rounded-xl mb-4 flex items-center justify-center">
                    <Package className="w-16 h-16 text-[#154230]/30" />
                  </div>
                  <h3 className="text-[#101111] font-semibold text-base line-clamp-2 mb-2">{product.name}</h3>
                  <p className="text-[#4A4A4A] text-sm mb-3 truncate">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#154230] font-bold text-xl">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className={`text-sm ${product.stock < 10 ? 'text-[#5D1E21]' : 'text-[#4A4A4A]'}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="w-20 h-20 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-[#154230]" />
              </div>
              <p className="text-[#4A4A4A] text-base mb-4">No products found</p>
              <button onClick={() => setShowCreateModal(true)} className="text-[#154230] hover:text-[#1d5240] font-semibold text-sm">
                Add your first product
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Fixed at bottom */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 px-4 py-2 z-30">
        <div className="flex items-center justify-around">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === '/dashboard';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 ${
                  link.primary ? '-mt-4' : ''
                }`}
              >
                {link.primary ? (
                  <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-[#154230]' : 'bg-[#E6E2DA]'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#4A4A4A]'}`} />
                  </div>
                )}
                <span className={`text-xs font-medium ${isActive ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* View Product Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#101111] font-bold text-lg">Product Details</h2>
              <button onClick={() => setViewingProduct(null)} className="text-[#4A4A4A] hover:text-[#101111] text-2xl leading-none">
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                  <Package className="w-10 h-10 text-[#154230]/30" />
                </div>
                <div>
                  <h3 className="text-[#101111] font-semibold">{viewingProduct.name}</h3>
                  <p className="text-[#A6824A] text-sm font-medium">SKU: {viewingProduct.sku}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-[#E6E2DA] rounded-xl">
                <div>
                  <p className="text-[#4A4A4A] text-xs">Price</p>
                  <p className="text-[#154230] font-bold text-lg">${viewingProduct.price.toFixed(2)} {viewingProduct.currency}</p>
                </div>
                <div>
                  <p className="text-[#4A4A4A] text-xs">Stock</p>
                  <p className={`font-bold text-lg ${viewingProduct.stock < 10 ? 'text-[#5D1E21]' : 'text-[#101111]'}`}>
                    {viewingProduct.stock} units
                  </p>
                </div>
                <div>
                  <p className="text-[#4A4A4A] text-xs">Category</p>
                  <p className="text-[#101111] font-medium text-sm">{viewingProduct.category}</p>
                </div>
                <div>
                  <p className="text-[#4A4A4A] text-xs">Min Order</p>
                  <p className="text-[#101111] font-medium text-sm">{viewingProduct.minOrder}</p>
                </div>
              </div>

              <div>
                <p className="text-[#4A4A4A] text-xs mb-1">Description</p>
                <p className="text-[#101111]">{viewingProduct.description}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleDelete(viewingProduct.id)}
                  className="py-3 px-4 bg-[#5D1E21]/10 text-[#5D1E21] rounded-xl font-semibold text-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => { setViewingProduct(null); openEditModal(viewingProduct); }}
                  className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#101111] font-bold text-lg">{showEditModal ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedProduct(null); resetForm(); }} className="text-[#4A4A4A] hover:text-[#101111] text-2xl leading-none">
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#4A4A4A] text-sm mb-2 font-medium">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                  placeholder="Premium Basmati Rice"
                />
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-sm mb-2 font-medium">SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                  placeholder="RICE-1121"
                />
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-sm mb-2 font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm appearance-none"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-2 font-medium">Price *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                    placeholder="850"
                  />
                </div>
                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-2 font-medium">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm appearance-none"
                  >
                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-2 font-medium">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-2 font-medium">Min Order</label>
                  <input
                    type="text"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                    placeholder="50 MT"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-sm mb-2 font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm resize-none"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedProduct(null); resetForm(); }}
                  className="flex-1 py-3 bg-[#E6E2DA] text-[#4A4A4A] rounded-xl font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={showEditModal ? handleUpdate : handleCreate}
                  disabled={!formData.name || !formData.price}
                  className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold text-sm disabled:opacity-50"
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
