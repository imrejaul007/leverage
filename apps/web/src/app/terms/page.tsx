import Link from 'next/link';

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-[#101111] mb-8">Terms of Service</h1>
        <div className="prose max-w-none text-[#4A4A4A] space-y-6">
          <p className="text-lg">Last updated: June 17, 2026</p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the LEVERAGE Global Trade Platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform.
          </p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">2. Description of Services</h2>
          <p>
            LEVERAGE provides a digital platform for global trade facilitation, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Connecting buyers and sellers of goods and services</li>
            <li>Trade document generation and management</li>
            <li>Freight and logistics coordination</li>
            <li>Compliance and regulatory guidance</li>
            <li>Payment processing and escrow services</li>
            <li>AI-powered trade assistance</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">3. Account Registration</h2>
          <p>
            To use certain features of the Platform, you must create an account. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your information to keep it accurate</li>
            <li>Keep your password secure and confidential</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Be responsible for all activities under your account</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">4. User Obligations</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Platform for any illegal or unauthorized purpose</li>
            <li>Violate any laws in your jurisdiction regarding trade</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Transmit viruses, malware, or other malicious code</li>
            <li>Attempt to gain unauthorized access to the Platform</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Impersonate any person or entity</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">5. Trade Transactions</h2>
          <p>
            LEVERAGE facilitates but does not participate in trade transactions between users. Users are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Verifying the legitimacy of trading partners</li>
            <li>Negotiating terms and conditions of transactions</li>
            <li>Ensuring compliance with applicable import/export regulations</li>
            <li>Obtaining necessary licenses and permits</li>
            <li>Fulfilling contractual obligations to trading partners</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">6. Fees and Payments</h2>
          <p>
            Use of certain Platform features may require payment of fees. All fees are clearly disclosed before you incur them. We reserve the right to modify our fee structure with reasonable notice.
          </p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, LEVERAGE shall not be liable for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Loss of profits, revenue, data, or business opportunities</li>
            <li>Actions or omissions of users or third parties</li>
            <li>Trade disputes between users</li>
            <li>Regulatory compliance decisions made by users</li>
          </ul>

          <h2 className="text-xl font-bold text-[#101111] mt-8">8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless LEVERAGE, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Platform or violation of these Terms.
          </p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">9. Intellectual Property</h2>
          <p>
            The Platform and its content, features, and functionality are owned by LEVERAGE and are protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">10. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Platform at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the Platform.
          </p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">11. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. We will provide notice of material changes. Your continued use of the Platform after such changes constitutes acceptance of the modified Terms.
          </p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law principles.
          </p>

          <h2 className="text-xl font-bold text-[#101111] mt-8">13. Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at:
          </p>
          <div className="bg-[#E6E2DA] p-4 rounded-xl">
            <p><strong>LEVERAGE</strong></p>
            <p>Email: legal@leverage.one</p>
            <p>Address: [Company Address]</p>
          </div>
        </div>
      </main>
    </div>
  );
}
