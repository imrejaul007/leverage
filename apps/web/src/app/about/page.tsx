import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-white text-xl font-semibold">Leverage by Lerar</span>
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-4">About Leverage by Lerar</h1>
        <p className="text-gray-400 mb-8">The Global Trade Operating System for modern businesses.</p>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-gray-400">About page content coming soon...</p>
        </div>
      </main>
    </div>
  );
}
