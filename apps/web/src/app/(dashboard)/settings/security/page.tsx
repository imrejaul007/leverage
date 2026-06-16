'use client';

import { useState } from 'react';
import { Shield, Smartphone, Mail, Key, Check, Copy, Download, Loader2, Eye, EyeOff, AlertCircle, Lock, Trash2, Plus, QrCode } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

interface AuthenticatorApp {
  name: string;
  icon: string;
}

const authenticatorApps: AuthenticatorApp[] = [
  { name: 'Google Authenticator', icon: '🔵' },
  { name: 'Authy', icon: '🔐' },
  { name: 'Microsoft Authenticator', icon: '🟢' },
  { name: '1Password', icon: '🔑' },
  { name: 'LastPass Authenticator', icon: '🔒' },
];

interface RecoveryCode {
  code: string;
  used: boolean;
}

export default function SecuritySettingsPage() {
  // MFA State
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [setupStep, setSetupStep] = useState(0); // 0: not started, 1: choose method, 2: scan QR, 3: verify, 4: save codes
  const [selectedMethod, setSelectedMethod] = useState<'app' | 'sms' | 'email' | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<RecoveryCode[]>([]);

  // Sessions State
  const [sessions, setSessions] = useState([
    { id: '1', device: 'Chrome on MacOS', location: 'San Francisco, CA', ip: '192.168.1.1', lastActive: 'Now', current: true },
    { id: '2', device: 'Safari on iPhone', location: 'San Francisco, CA', ip: '192.168.1.2', lastActive: '2 hours ago', current: false },
    { id: '3', device: 'Firefox on Windows', location: 'New York, NY', ip: '10.0.0.1', lastActive: '3 days ago', current: false },
  ]);

  // Password State
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const secretKey = 'JBSWY3DPEHPK3PXP'; // Demo secret

  const startSetup = (method: 'app' | 'sms' | 'email') => {
    setSelectedMethod(method);
    setSetupStep(1);

    // Generate recovery codes
    const codes: RecoveryCode[] = [];
    for (let i = 0; i < 10; i++) {
      codes.push({
        code: `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        used: false,
      });
    }
    setRecoveryCodes(codes);
  };

  const verifyCode = async () => {
    if (verificationCode.length !== 6) return;

    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo: accept any 6-digit code
    if (verificationCode === '123456' || verificationCode.length === 6) {
      setVerificationSuccess(true);
      setSetupStep(4);
    }
    setIsVerifying(false);
  };

  const completeSetup = () => {
    setMfaEnabled(true);
    setSetupStep(0);
    setVerificationCode('');
    setVerificationSuccess(false);
  };

  const copyRecoveryCodes = () => {
    const codes = recoveryCodes.map(c => c.code).join('\n');
    navigator.clipboard.writeText(codes);
    alert('Recovery codes copied to clipboard!');
  };

  const downloadRecoveryCodes = () => {
    const content = `LEVERAGE Account Recovery Codes\n\n${recoveryCodes.map(c => c.code).join('\n')}\n\nStore these codes safely. Each code can only be used once.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leverage-recovery-codes.txt';
    a.click();
  };

  const terminateSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsVerifying(false);
    setPasswordChanged(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordChanged(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Security Settings"
        subtitle="Protect your account"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* MFA Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${mfaEnabled ? 'bg-[#16A34A]/10' : 'bg-[#E6E2DA]'}`}>
                  <Shield className={`w-6 h-6 ${mfaEnabled ? 'text-[#16A34A]' : 'text-[#4A4A4A]'}`} />
                </div>
                <div>
                  <h2 className="text-[#101111] font-bold">Two-Factor Authentication</h2>
                  <p className="text-[#4A4A4A] text-xs">
                    {mfaEnabled ? 'Your account is protected' : 'Add an extra layer of security'}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                mfaEnabled ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-[#E6E2DA] text-[#4A4A4A]'
              }`}>
                {mfaEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>

            {!mfaEnabled && setupStep === 0 && (
              <>
                <p className="text-[#4A4A4A] text-sm mb-4">
                  Two-factor authentication adds an extra security layer to your account. We recommend using an authenticator app.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => startSetup('app')}
                    className="flex items-center gap-3 p-4 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#154230] rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[#101111] font-semibold">Authenticator App</p>
                      <p className="text-[#4A4A4A] text-xs">Use Google Authenticator, Authy, etc.</p>
                    </div>
                    <span className="text-[#154230] text-sm font-semibold">Recommended</span>
                  </button>

                  <button
                    onClick={() => startSetup('sms')}
                    className="flex items-center gap-3 p-4 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#A6824A] rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[#101111] font-semibold">SMS / Email</p>
                      <p className="text-[#4A4A4A] text-xs">Receive codes via text or email</p>
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* Setup Steps */}
            {setupStep === 1 && selectedMethod === 'app' && (
              <div className="space-y-4">
                <h3 className="text-[#101111] font-bold">Choose an Authenticator App</h3>
                <div className="grid grid-cols-2 gap-3">
                  {authenticatorApps.map(app => (
                    <button
                      key={app.name}
                      onClick={() => setSetupStep(2)}
                      className="flex items-center gap-3 p-4 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors"
                    >
                      <span className="text-2xl">{app.icon}</span>
                      <span className="text-[#101111] font-medium text-sm">{app.name}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSetupStep(0)}
                  className="text-[#4A4A4A] text-sm hover:underline"
                >
                  Cancel
                </button>
              </div>
            )}

            {setupStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-[#101111] font-bold">Scan the QR Code</h3>
                <p className="text-[#4A4A4A] text-sm">
                  Open your authenticator app and scan this QR code, or enter the secret key manually.
                </p>

                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    {/* QR Code Placeholder */}
                    <div className="w-48 h-48 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-[#154230]" />
                    </div>
                  </div>
                </div>

                {/* Secret Key */}
                <div className="bg-[#E6E2DA] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#4A4A4A] text-xs">Or enter this secret key:</span>
                    <button
                      onClick={() => setShowSecret(!showSecret)}
                      className="text-[#154230] text-xs"
                    >
                      {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <code className="text-[#101111] font-mono text-sm block">
                    {showSecret ? secretKey : '••••••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(secretKey);
                      alert('Secret key copied!');
                    }}
                    className="mt-2 flex items-center gap-1 text-[#154230] text-xs"
                  >
                    <Copy className="w-3 h-3" /> Copy key
                  </button>
                </div>

                <button
                  onClick={() => setSetupStep(3)}
                  className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold"
                >
                  I've scanned the code
                </button>
              </div>
            )}

            {setupStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-[#101111] font-bold">Verify Setup</h3>
                <p className="text-[#4A4A4A] text-sm">
                  Enter the 6-digit code from your authenticator app to verify.
                </p>

                <div className="flex gap-2">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={verificationCode[i] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length === 1) {
                          const newCode = verificationCode.split('');
                          newCode[i] = val;
                          setVerificationCode(newCode.join(''));
                        }
                      }}
                      className="flex-1 h-14 bg-[#E6E2DA] rounded-xl text-center text-2xl font-bold border border-transparent focus:border-[#154230] focus:outline-none"
                    />
                  ))}
                </div>

                <button
                  onClick={verifyCode}
                  disabled={verificationCode.length !== 6 || isVerifying}
                  className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify and Enable'
                  )}
                </button>
              </div>
            )}

            {setupStep === 4 && verificationSuccess && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#16A34A]" />
                  </div>
                  <h3 className="text-[#101111] font-bold text-lg">You're all set!</h3>
                  <p className="text-[#4A4A4A] text-sm mt-2">
                    Two-factor authentication is now enabled on your account.
                  </p>
                </div>

                <div className="bg-[#E6E2DA] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#101111] font-semibold">Recovery Codes</span>
                    <span className="text-[#4A4A4A] text-xs">Save these codes somewhere safe</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {recoveryCodes.slice(0, 6).map((code, i) => (
                      <code key={i} className="text-[#101111] font-mono text-sm bg-white rounded px-2 py-1">
                        {code.code}
                      </code>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyRecoveryCodes}
                      className="flex-1 py-2 bg-white text-[#154230] rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Copy className="w-4 h-4" /> Copy All
                    </button>
                    <button
                      onClick={downloadRecoveryCodes}
                      className="flex-1 py-2 bg-white text-[#154230] rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </div>

                <button
                  onClick={completeSetup}
                  className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold"
                >
                  Done
                </button>
              </div>
            )}

            {mfaEnabled && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMfaEnabled(false);
                    setSetupStep(0);
                  }}
                  className="flex-1 py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-semibold"
                >
                  Disable MFA
                </button>
                <button
                  onClick={() => setSetupStep(4)}
                  className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold"
                >
                  View Recovery Codes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                <Key className="w-6 h-6 text-[#4A4A4A]" />
              </div>
              <div>
                <h2 className="text-[#101111] font-bold">Change Password</h2>
                <p className="text-[#4A4A4A] text-xs">Update your account password</p>
              </div>
            </div>

            {passwordChanged && (
              <div className="mb-4 p-3 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-xl flex items-center gap-2 text-[#16A34A] text-sm">
                <Check className="w-4 h-4" />
                Password changed successfully!
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword || !confirmPassword || isVerifying}
                className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-[#4A4A4A]" />
              </div>
              <div className="flex-1">
                <h2 className="text-[#101111] font-bold">Active Sessions</h2>
                <p className="text-[#4A4A4A] text-xs">Manage devices logged into your account</p>
              </div>
              <button
                onClick={() => setSessions(sessions.filter(s => s.current))}
                className="text-[#DC2626] text-xs font-medium hover:underline"
              >
                Sign out all
              </button>
            </div>

            <div className="space-y-3">
              {sessions.map(session => (
                <div key={session.id} className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
                  <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-[#154230]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[#101111] font-medium text-sm">{session.device}</p>
                      {session.current && (
                        <span className="px-2 py-0.5 bg-[#154230] text-white text-xs rounded">Current</span>
                      )}
                    </div>
                    <p className="text-[#4A4A4A] text-xs">{session.location} • {session.ip}</p>
                    <p className="text-[#4A4A4A]/60 text-xs">{session.lastActive}</p>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => terminateSession(session.id)}
                      className="p-2 text-[#DC2626] hover:bg-[#DC2626]/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Security Best Practices</p>
              <ul className="text-sm text-white/70 mt-1 space-y-1">
                <li>• Use a unique password for each account</li>
                <li>• Enable 2FA on all trade platforms</li>
                <li>• Regularly review active sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
