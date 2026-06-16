'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Shield } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';

export default function CartPage() {
  const { cartItems, isLoaded, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const { showToast } = useToast();

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    showToast(`${name} removed from cart`, 'info');
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Cart cleared', 'info');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f7f5f1]">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[#E6E2DA] rounded w-1/4"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white rounded-xl"></div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header cartCount={cartCount} />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#101111] flex items-center gap-3">
              <ShoppingCart className="w-8 h-8" />
              Shopping Cart
            </h1>
            <p className="text-[#4A4A4A] mt-1">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <Button variant="ghost" onClick={handleClearCart}>
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="w-16 h-16" />}
            title="Your cart is empty"
            description="Browse our marketplace to find products from verified suppliers."
            action={
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 flex gap-4"
                >
                  <div className="relative w-24 h-24 bg-[#f7f5f1] rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.id}`}
                      className="font-semibold text-[#101111] hover:text-[#154230] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-[#4A4A4A] mt-1">
                      ${item.price.toLocaleString()}/{item.currency} | MOQ: {item.moq}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-[#154230]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-[#101111] mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated Total</span>
                    <span className="text-[#154230]">${cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="mt-6 pt-6 border-t border-black/10">
                  <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                    <Shield className="w-4 h-4 text-[#154230]" />
                    <span>Secure checkout with buyer protection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
