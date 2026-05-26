'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

interface CartItem extends Product {
  quantity: number;
}

const categories = ['All', 'Food & Agriculture', 'Textiles', 'Electronics', 'Metals & Minerals', 'Healthcare', 'Automotive'];

const initialProducts: Product[] = [
  { id: '1', name: 'Premium Basmati Rice - 1121', description: 'Premium quality long grain basmati rice, aged for perfect cooking', category: 'Food & Agriculture', price: 850, currency: 'USD', stock: 500, status: 'active', sku: 'RICE-1121', minOrder: '50 MT', createdAt: '2024-01-20' },
  { id: '2', name: 'Cotton Yarn 40/1 Combed', description: 'High-quality combed cotton yarn for textile manufacturing', category: 'Textiles', price: 3.20, currency: 'USD', stock: 50, status: 'active', sku: 'COT-401', minOrder: '10 MT', createdAt: '2024-01-18' },
  { id: '3', name: 'Solar Panels - 550W Mono PERC', description: 'High-efficiency monocrystalline solar panels', category: 'Electronics', price: 165, currency: 'USD', stock: 1000, status: 'active', sku: 'SOL-550M', minOrder: '100 units', createdAt: '2024-01-15' },
  { id: '4', name: 'Steel Billets - Grade A', description: 'Premium quality steel billets for construction', category: 'Metals & Minerals', price: 620, currency: 'USD', stock: 2000, status: 'active', sku: 'STL-GA', minOrder: '100 MT', createdAt: '2024-01-12' },
  { id: '5', name: 'Pharmaceutical Raw Materials', description: 'GMP certified raw materials for pharmaceutical manufacturing', category: 'Healthcare', price: 45, currency: 'USD', stock: 5000, status: 'active', sku: 'PHA-RAW', minOrder: '1 MT', createdAt: '2024-01-10' },
  { id: '6', name: 'Bicycle Components Set', description: 'Complete set of high-quality bicycle components', category: 'Automotive', price: 28, currency: 'USD', stock: 250, status: 'active', sku: 'BIC-SET', minOrder: '50 sets', createdAt: '2024-01-08' },
];

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Load products
    const stored = localStorage.getItem('leverage_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('leverage_products', JSON.stringify(initialProducts));
    }

    // Load cart
    const cartItems = localStorage.getItem('leverage_cart');
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }

    setIsLoading(false);
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem('leverage_cart', JSON.stringify(items));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const updated = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      saveCart(updated);
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    saveCart(updated);
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Marketplace</h1>
          <p className="text-[#D8CCBC]/60 text-sm">{filteredProducts.length} products available</p>
        </div>
        <button onClick={() => setShowCart(true)} className="relative px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm hover:bg-[#D4AA82] transition-colors">
          Cart ({cartCount})
          {cartCount > 0 && <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#081512] text-[#C49A6C] rounded-full text-xs font-bold flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm" />
          <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#D8CCBC] text-sm focus:outline-none focus:border-[#C49A6C]">
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0E3B36]/80'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🔍</span></div>
          <p className="text-[#D8CCBC]/50 mb-4">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="card p-3 sm:p-4 hover:border-[#C49A6C]/30 transition-all">
              <div className="aspect-square bg-[#0E3B36]/50 rounded-xl mb-3 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl opacity-50">📦</span>
              </div>
              <h3 className="text-[#F4F1EA] font-medium text-sm sm:text-base line-clamp-2 mb-1">{product.name}</h3>
              <p className="text-[#D8CCBC]/50 text-xs mb-2 truncate">{product.category}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg sm:text-xl font-bold text-[#C49A6C]">${product.price.toFixed(2)}</span>
                <span className={`text-xs ${product.stock < 10 ? 'text-red-400' : 'text-[#D8CCBC]/50'}`}>{product.stock} in stock</span>
              </div>
              <button onClick={() => addToCart(product)} className="w-full py-2.5 bg-[#C49A6C] text-[#081512] rounded-lg font-semibold text-sm hover:bg-[#D4AA82] transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-[#081512] border-l border-[rgba(255,255,255,0.1)] h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#F4F1EA]">Shopping Cart ({cartCount})</h2>
                <button onClick={() => setShowCart(false)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🛒</span></div>
                  <p className="text-[#D8CCBC]/50 mb-4">Your cart is empty</p>
                  <button onClick={() => setShowCart(false)} className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">Continue Shopping</button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                        <div className="w-16 h-16 bg-[#0E3B36]/50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl opacity-50">📦</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#F4F1EA] font-medium truncate">{item.name}</h4>
                          <p className="text-[#C49A6C] text-sm">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 bg-[#0E3B36] rounded-lg text-[#F4F1EA] flex items-center justify-center hover:bg-[#0E3B36]/80">-</button>
                            <span className="text-[#F4F1EA] font-medium w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 bg-[#0E3B36] rounded-lg text-[#F4F1EA] flex items-center justify-center hover:bg-[#0E3B36]/80">+</button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-400 hover:text-red-300">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[rgba(255,255,255,0.05)] pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-[#D8CCBC]">Subtotal</span>
                      <span className="text-[#F4F1EA] font-medium">${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-6">
                      <span className="text-[#D8CCBC]">Shipping</span>
                      <span className="text-[#D8CCBC]/50">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between mb-6 text-lg">
                      <span className="text-[#F4F1EA] font-semibold">Total</span>
                      <span className="text-[#C49A6C] font-bold">${cartTotal.toLocaleString()}</span>
                    </div>
                    <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
