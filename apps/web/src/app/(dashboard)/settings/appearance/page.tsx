'use client';

import { useState } from 'react';
import {
  Sun,
  Moon,
  Monitor,
  Check,
  Loader2,
  Palette,
  Type,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

type Theme = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'medium' | 'large';
type Density = 'compact' | 'comfortable' | 'spacious';

export default function AppearanceSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light' as Theme,
    fontSize: 'medium' as FontSize,
    density: 'comfortable' as Density,
    reducedMotion: false,
    highContrast: false,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const themes = [
    { value: 'light' as Theme, label: 'Light', icon: Sun, description: 'Best for daytime use' },
    { value: 'dark' as Theme, label: 'Dark', icon: Moon, description: 'Easier on the eyes' },
    { value: 'system' as Theme, label: 'System', icon: Monitor, description: 'Match device settings' },
  ];

  const fontSizes = [
    { value: 'small' as FontSize, label: 'Small', preview: 'Aa' },
    { value: 'medium' as FontSize, label: 'Medium', preview: 'Aa' },
    { value: 'large' as FontSize, label: 'Large', preview: 'Aa' },
  ];

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Appearance"
        subtitle="Display and visual settings"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {saved && (
          <div className="p-3 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-xl flex items-center gap-2 text-[#16A34A] text-sm">
            <Check className="w-4 h-4" />
            Appearance saved!
          </div>
        )}

        {/* Theme */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-2">
            <h3 className="text-[#101111] font-bold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#154230]" />
              Theme
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {themes.map(theme => (
                <button
                  key={theme.value}
                  onClick={() => setSettings({ ...settings, theme: theme.value })}
                  className={`p-4 rounded-xl transition-colors flex flex-col items-center gap-2 ${
                    settings.theme === theme.value
                      ? 'bg-[#154230]/10 border-2 border-[#154230]'
                      : 'bg-[#E6E2DA] hover:bg-[#154230]/5 border-2 border-transparent'
                  }`}
                >
                  <theme.icon className={`w-8 h-8 ${settings.theme === theme.value ? 'text-[#154230]' : 'text-[#4A4A4A]'}`} />
                  <span className="text-[#101111] font-medium text-sm">{theme.label}</span>
                  <span className="text-[#4A4A4A] text-xs">{theme.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Font Size */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-4">
            <h3 className="text-[#101111] font-bold mb-4 flex items-center gap-2">
              <Type className="w-5 h-5 text-[#154230]" />
              Font Size
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {fontSizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => setSettings({ ...settings, fontSize: size.value })}
                  className={`p-4 rounded-xl transition-colors flex flex-col items-center gap-2 ${
                    settings.fontSize === size.value
                      ? 'bg-[#154230]/10 border-2 border-[#154230]'
                      : 'bg-[#E6E2DA] hover:bg-[#154230]/5 border-2 border-transparent'
                  }`}
                >
                  <span
                    className="text-[#101111] font-medium"
                    style={{ fontSize: size.value === 'small' ? '14px' : size.value === 'medium' ? '16px' : '18px' }}
                  >
                    {size.preview}
                  </span>
                  <span className="text-[#4A4A4A] text-sm">{size.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-4">
            <h3 className="text-[#101111] font-bold mb-4">Accessibility</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                <div>
                  <p className="text-[#101111] font-medium">Reduced Motion</p>
                  <p className="text-[#4A4A4A] text-xs">Minimize animations</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, reducedMotion: !settings.reducedMotion })}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.reducedMotion ? 'bg-[#154230]' : 'bg-[#4A4A4A]/30'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                <div>
                  <p className="text-[#101111] font-medium">High Contrast</p>
                  <p className="text-[#4A4A4A] text-xs">Increase color contrast</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, highContrast: !settings.highContrast })}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.highContrast ? 'bg-[#154230]' : 'bg-[#4A4A4A]/30'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
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
