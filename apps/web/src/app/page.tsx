import Link from 'next/link';
import Logo from '@/components/Logo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#081512]">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.05)]">
        <div className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <Logo showTagline />
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/marketplace" className="text-[#D8CCBC]/80 hover:text-[#F4F1EA] transition-colors">
                Marketplace
              </Link>
              <Link href="/freight" className="text-[#D8CCBC]/80 hover:text-[#F4F1EA] transition-colors">
                Freight
              </Link>
              <Link href="/compliance" className="text-[#D8CCBC]/80 hover:text-[#F4F1EA] transition-colors">
                Compliance
              </Link>
              <Link href="/about" className="text-[#D8CCBC]/80 hover:text-[#F4F1EA] transition-colors">
                About
              </Link>
            </nav>
            <Link href="/dashboard" className="px-5 py-2.5 bg-[#C49A6C] hover:bg-[#D4AA82] text-[#081512] font-semibold rounded-xl transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-8">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-block px-5 py-2 bg-[#0E3B36] border border-[#C49A6C]/30 rounded-full mb-8">
            <span className="text-[#C49A6C] text-sm font-medium">🚀 Connecting Dots to Ports</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#F4F1EA] mb-6 leading-tight">
            The Operating System for
            <span className="text-[#C49A6C] brand-font"> Global Trade</span>
          </h1>
          <p className="text-xl text-[#D8CCBC]/70 mb-10 max-w-2xl mx-auto">
            Connect with verified partners worldwide. Manage orders, track shipments, ensure compliance, and grow your trade business — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-[#C49A6C] hover:bg-[#D4AA82] text-[#081512] font-bold rounded-xl transition-colors text-lg">
              Start Free Trial
            </Link>
            <Link href="/marketplace" className="px-8 py-4 bg-[#0E3B36] border border-[#C49A6C]/30 text-[#F4F1EA] hover:bg-[#0E3B36]/80 font-semibold rounded-xl transition-colors text-lg">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-8 border-y border-[rgba(255,255,255,0.05)]">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#C49A6C] mb-2">$2.4B+</p>
              <p className="text-[#D8CCBC]/70">Trade Volume</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#C49A6C] mb-2">12,000+</p>
              <p className="text-[#D8CCBC]/70">Active Partners</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#C49A6C] mb-2">150+</p>
              <p className="text-[#D8CCBC]/70">Countries</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#C49A6C] mb-2">99.9%</p>
              <p className="text-[#D8CCBC]/70">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#F4F1EA] mb-4">
              Everything You Need for Global Trade
            </h2>
            <p className="text-[#D8CCBC]/70 max-w-2xl mx-auto">
              From sourcing to settlement, Leverage handles every step of your international trade operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🌐"
              title="Global Marketplace"
              description="Connect with verified manufacturers and suppliers across 150+ countries. Source products at competitive prices."
            />
            <FeatureCard
              icon="📦"
              title="Smart Logistics"
              description="Compare freight quotes from top carriers. Track shipments in real-time with automated customs clearance."
            />
            <FeatureCard
              icon="📋"
              title="Trade Compliance"
              description="Automated HS code classification, duty calculations, and sanctions screening for risk-free trading."
            />
            <FeatureCard
              icon="💰"
              title="Secure Payments"
              description="Multi-currency support with built-in escrow. Secure transactions with trade finance options."
            />
            <FeatureCard
              icon="📄"
              title="Document Management"
              description="Digital invoices, bills of lading, and certificates. Automated document verification and workflow."
            />
            <FeatureCard
              icon="🤖"
              title="AI Assistant"
              description="Get instant help with compliance questions, document analysis, and trade recommendations."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-to-r from-[#0E3B36]/50 to-[#C49A6C]/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#F4F1EA] mb-4">
            Ready to Scale Your Global Trade?
          </h2>
          <p className="text-[#D8CCBC]/70 mb-8 max-w-xl mx-auto">
            Join thousands of businesses already trading globally with Leverage.
          </p>
          <Link href="/signup" className="px-10 py-4 bg-[#C49A6C] hover:bg-[#D4AA82] text-[#081512] font-bold rounded-xl transition-colors inline-block text-lg">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.05)] py-12 px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#C49A6C] flex items-center justify-center">
                <span className="text-[#081512] font-bold text-sm brand-font">L</span>
              </div>
              <span className="text-[#C49A6C] font-bold brand-font">LEVERGE</span>
            </div>
            <div className="flex gap-6 text-sm text-[#D8CCBC]/60">
              <Link href="/terms" className="hover:text-[#F4F1EA] transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-[#F4F1EA] transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-[#F4F1EA] transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-[#D8CCBC]/40">
              © 2024 Leverage by Lerar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card hover:border-[#C49A6C]/30 transition-all hover:scale-[1.02]">
      <span className="text-5xl mb-4 block">{icon}</span>
      <h3 className="text-xl font-semibold text-[#F4F1EA] mb-3">{title}</h3>
      <p className="text-[#D8CCBC]/70">{description}</p>
    </div>
  );
}
