'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Shield, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const risks = [
  { name: 'Denied Party Screening', level: 'high', desc: 'Check against export denial lists', icon: AlertTriangle },
  { name: 'Sanctioned Countries', level: 'high', desc: 'Restrictions on trade with sanctioned nations', icon: AlertTriangle },
  { name: 'Antiboycott Compliance', level: 'medium', desc: 'Report boycott requests', icon: AlertCircle },
  { name: 'Antidumping Duties', level: 'medium', desc: 'Special duties on specific products', icon: AlertCircle },
  { name: 'Quota Restrictions', level: 'low', desc: 'Import quotas for certain goods', icon: CheckCircle },
];

const levelColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

export default function RiskAssessmentPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Risk Assessment" subtitle="Identify and mitigate trade risks" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#154230]" />
            <div>
              <h3 className="text-[#101111] font-semibold">Trade Risk Categories</h3>
              <p className="text-sm text-[#4A4A4A]">Stay compliant and avoid penalties</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">Risk Factors</h3>
          <div className="space-y-3">
            {risks.map((risk) => {
              const Icon = risk.icon;
              return (
                <div key={risk.name} className="p-4 bg-[#E6E2DA] rounded-xl">
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 ${risk.level === 'high' ? 'text-red-500' : risk.level === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-[#101111]">{risk.name}</h4>
                      <p className="text-sm text-[#4A4A4A]">{risk.desc}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${levelColors[risk.level as keyof typeof levelColors]}`}>
                      {risk.level}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
