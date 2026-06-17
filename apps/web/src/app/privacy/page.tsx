import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#154230] to-[#1a5a3a] flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-[#101111] text-xl font-semibold">LEVERAGE</span>
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#101111] mb-8">Privacy Policy</h1>
        <div className="prose max-w-none text-[#4A4A4A] space-y-6">
          <p className="text-lg">Last updated: June 17, 2026</p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">1. Information We Collect</h2>
          <p>
            LEVERAGE Global Trade Platform ("we," "our," or "us") collects information you provide directly to us, such as when you create an account, make a purchase, fill out a form, or communicate with us. This information includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, postal address, and company information.</li>
            <li><strong>Trade Data:</strong> Import/export information, shipping details, product classifications, and transaction records.</li>
            <li><strong>Financial Information:</strong> Payment method details, billing address, and transaction history.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, device information, and browsing activity on our platform.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill trade transactions</li>
            <li>Provide customer support and communicate about your account</li>
            <li>Send promotional communications and updates (with your consent)</li>
            <li>Improve our services and platform functionality</li>
            <li>Comply with legal obligations and regulatory requirements</li>
            <li>Detect and prevent fraud and unauthorized access</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Providers:</strong> Third parties who assist in operating our platform, including payment processors, shipping carriers, and cloud service providers.</li>
            <li><strong>Business Partners:</strong> Trade partners, suppliers, or freight carriers you engage with through our platform.</li>
            <li><strong>Legal Compliance:</strong> When required by law, court order, or governmental authority.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and penetration testing</li>
            <li>Access controls and authentication requirements</li>
            <li>Employee training on data protection</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">5. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activity. You can control cookies through your browser settings.
          </p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Delete your personal information</li>
            <li>Object to or restrict certain processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">7. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="bg-[#E6E2DA] p-4 rounded-xl">
            <p><strong>LEVERAGE</strong></p>
            <p>Email: privacy@leverage.one</p>
            <p>Address: [Company Address]</p>
          </div>
        </div>
      </main>
    </div>
  );
}
