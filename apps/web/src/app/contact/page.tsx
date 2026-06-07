import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#081512]">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.05)]">
        <div className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image src="/logo.png" alt="LEVERAGE" width={160} height={50} className="object-contain" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/marketplace" className="text-[#D8CCBC]/80 hover:text-[#F4F1EA] transition-colors">
                Marketplace
              </Link>
              <Link href="/about" className="text-[#D8CCBC]/80 hover:text-[#F4F1EA] transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="px-5 py-2.5 bg-[#C49A6C] hover:bg-[#D4AA82] text-[#081512] font-semibold rounded-xl transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F4F1EA] mb-4">Contact Us</h1>
          <p className="text-xl text-[#D8CCBC]/70">
            Get in touch with our team for support, partnerships, or inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0E3B36] rounded-xl flex items-center justify-center text-2xl">
                  📧
                </div>
                <div>
                  <h3 className="text-[#F4F1EA] font-semibold mb-1">Email</h3>
                  <p className="text-[#D8CCBC]/70">support@leveragebylerar.com</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0E3B36] rounded-xl flex items-center justify-center text-2xl">
                  🌐
                </div>
                <div>
                  <h3 className="text-[#F4F1EA] font-semibold mb-1">Website</h3>
                  <p className="text-[#D8CCBC]/70">www.leveragebylerar.com</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0E3B36] rounded-xl flex items-center justify-center text-2xl">
                  💬
                </div>
                <div>
                  <h3 className="text-[#F4F1EA] font-semibold mb-1">Live Chat</h3>
                  <p className="text-[#D8CCBC]/70">Available in the app 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Subject</label>
                <select className="input w-full">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Sales</option>
                </select>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help?"
                  className="input w-full resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.05)] py-8 px-8">
        <div className="container mx-auto text-center">
          <p className="text-[#D8CCBC]/40 text-sm">
            © 2024 Leverge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
