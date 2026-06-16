'use client';

import { useState } from 'react';
import {
  Globe,
  ChevronDown,
  Check,
  Loader2,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷' },
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
];

const units = [
  { value: 'metric', label: 'Metric (kg, cm)' },
  { value: 'imperial', label: 'Imperial (lb, in)' },
];

export default function LanguageSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    language: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
    units: 'metric',
    dateFormat: 'MM/DD/YYYY',
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Language & Region"
        subtitle="Language, currency, and timezone"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {saved && (
          <div className="p-3 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-xl flex items-center gap-2 text-[#16A34A] text-sm">
            <Check className="w-4 h-4" />
            Preferences saved!
          </div>
        )}

        {/* Language */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-2">
            <h3 className="text-[#101111] font-bold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#154230]" />
              Language
            </h3>
            <div className="space-y-2">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSettings({ ...settings, language: lang.code })}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    settings.language === lang.code
                      ? 'bg-[#154230]/10 border border-[#154230]'
                      : 'bg-[#E6E2DA] hover:bg-[#154230]/5'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <p className="text-[#101111] font-medium">{lang.name}</p>
                    <p className="text-[#4A4A4A] text-sm">{lang.native}</p>
                  </div>
                  {settings.language === lang.code && (
                    <Check className="w-5 h-5 text-[#154230]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Currency */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-4">
            <h3 className="text-[#101111] font-bold mb-4">Currency</h3>
            <div className="grid grid-cols-2 gap-2">
              {currencies.map(curr => (
                <button
                  key={curr.code}
                  onClick={() => setSettings({ ...settings, currency: curr.code })}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-colors ${
                    settings.currency === curr.code
                      ? 'bg-[#154230]/10 border border-[#154230]'
                      : 'bg-[#E6E2DA] hover:bg-[#154230]/5'
                  }`}
                >
                  <span className="text-xl font-bold">{curr.symbol}</span>
                  <div className="flex-1 text-left">
                    <p className="text-[#101111] font-medium text-sm">{curr.code}</p>
                    <p className="text-[#4A4A4A] text-xs">{curr.name}</p>
                  </div>
                  {settings.currency === curr.code && (
                    <Check className="w-4 h-4 text-[#154230]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-4">
            <h3 className="text-[#101111] font-bold mb-4">Timezone</h3>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Units */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-4">
            <h3 className="text-[#101111] font-bold mb-4">Measurement Units</h3>
            <div className="grid grid-cols-2 gap-3">
              {units.map(unit => (
                <button
                  key={unit.value}
                  onClick={() => setSettings({ ...settings, units: unit.value })}
                  className={`p-4 rounded-xl transition-colors ${
                    settings.units === unit.value
                      ? 'bg-[#154230]/10 border border-[#154230]'
                      : 'bg-[#E6E2DA] hover:bg-[#154230]/5'
                  }`}
                >
                  <p className="text-[#101111] font-medium">{unit.label}</p>
                  {settings.units === unit.value && (
                    <Check className="w-4 h-4 text-[#154230] mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Save Preferences
            </>
          )}
        </button>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
