'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import {
  Search,
  Phone,
  ShoppingCart,
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  MapPin,
  CheckCircle,
} from 'lucide-react';

const cartItems = [
  { id: '1', name: 'Premium Basmati Rice 1121 Steam', price: 850, currency: 'MT', moq: '50 MT', quantity: 100, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200', supplier: 'Global Trade Exports' },
  { id: '2', name: 'Organic Cotton Yarn 40s Ne', price: 4.20, currency: 'KG', moq: '1000 KG', quantity: 2000, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200', supplier: 'Cotton World Ltd' },
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 2500 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Toaster position="top-right" />

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <Link href="/marketplace" className="p-2 -ml-2 mr-2"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
          <ShoppingCart className="w-5 h-5 text-gray-600 mr-2" />
          <span className="font-medium text-gray-900 flex-1">My Cart ({items.length})</span>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:block bg-gradient-to-br from-[#154230] via-[#1a5a3a] to-[#0d3d28]">
        <div className="bg-[#0d2e20]">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between text-sm text-white/80">
            <span>LEVERAGE Marketplace</span>
            <div className="flex items-center gap-4"><span>24x7 Support</span><Link href="/contact" className="flex items-center gap-1"><Phone className="w-4 h-4" />+1-xxx-xxx-xxxx</Link></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/"><Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" /></Link>
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search products..." className="w-full h-11 pl-12 pr-4 bg-white rounded-xl text-gray-900" />
            </div>
            <div className="flex items-center gap-3">
              <Link href="/marketplace/login" className="px-4 py-2 bg-white/10 rounded-lg text-white">Sign In</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
            <Link href="/marketplace" className="inline-block px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg">Browse Products</Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} width={96} height={96} className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1">
                      <Link href={`/marketplace/products/${item.id}`} className="font-bold text-gray-900 hover:text-[#154230]">{item.name}</Link>
                      <p className="text-sm text-gray-500 mt-1">{item.supplier}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Mumbai, Maharashtra</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">per {item.currency}</p>
                      <p className="text-xs text-gray-500 mt-1">MOQ: {item.moq}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, -50)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-gray-900 w-20 text-center">{item.quantity.toLocaleString()} {item.currency}</span>
                      <button onClick={() => updateQuantity(item.id, 50)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping (FOB)</span><span>₹{shipping.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Taxes</span><span>Included</span></div>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 mb-6">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <button onClick={() => toast.success('Proceeding to checkout...')} className="w-full py-3 bg-[#154230] hover:bg-[#1a5a3a] text-white font-bold rounded-lg">Proceed to Checkout</button>
                <Link href="/marketplace" className="block w-full py-3 text-center border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Continue Shopping</Link>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Secure checkout with escrow protection</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} LEVERAGE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
