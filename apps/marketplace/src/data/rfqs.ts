// Shared RFQ data

export type RFQStatus = 'OPEN' | 'IN_REVIEW' | 'CLOSED' | 'AWARDED';

export interface RFQ {
  id: string;
  title: string;
  description: string;
  buyer: string;
  buyerId: string;
  product: string;
  quantity: string;
  unit: string;
  targetPrice?: string;
  currency: string;
  deliveryCountry: string;
  deadline: string;
  status: RFQStatus;
  responseCount: number;
  createdAt: string;
  specifications?: string[];
  qualityRequired?: string;
  paymentTerms?: string;
  preferredSupplierLocation?: string;
}

export const rfqs: RFQ[] = [
  {
    id: 'RFQ-2024-001',
    title: 'Premium Basmati Rice 1121',
    description: 'Looking for 500 MT of premium basmati rice for our distribution network in the Middle East. Need consistent quality with proper certifications.',
    buyer: 'Global Imports LLC',
    buyerId: 'buyer-001',
    product: 'Basmati Rice',
    quantity: '500',
    unit: 'MT',
    targetPrice: '$800',
    currency: 'USD',
    deliveryCountry: 'UAE',
    deadline: 'Jun 25, 2026',
    status: 'OPEN',
    responseCount: 5,
    createdAt: '2026-06-10',
    specifications: ['1121 Steam', '8.35mm min grain length', 'Aged 1 year'],
    qualityRequired: 'Premium Grade A',
    paymentTerms: 'Letter of Credit',
    preferredSupplierLocation: 'India',
  },
  {
    id: 'RFQ-2024-002',
    title: 'Organic Cotton Yarn 40s',
    description: 'Need 10,000 KG of organic cotton yarn for our textile manufacturing facility. GOTS certification required.',
    buyer: 'EuroTrade Partners',
    buyerId: 'buyer-002',
    product: 'Cotton Yarn',
    quantity: '10,000',
    unit: 'KG',
    deliveryCountry: 'Germany',
    deadline: 'Jun 28, 2026',
    status: 'IN_REVIEW',
    responseCount: 3,
    createdAt: '2026-06-08',
    specifications: ['40s Ne', 'Organic certified', 'Ring spun'],
    qualityRequired: 'GOTS Certified',
    paymentTerms: 'Telegraphic Transfer',
    preferredSupplierLocation: 'India',
  },
  {
    id: 'RFQ-2024-003',
    title: 'Electronic Components Set',
    description: 'Seeking various electronic components for our manufacturing needs. Competitive pricing with reliable delivery.',
    buyer: 'Asia Pacific Trading',
    buyerId: 'buyer-003',
    product: 'Electronic Components',
    quantity: '5,000',
    unit: 'units',
    deliveryCountry: 'Singapore',
    deadline: 'Jul 1, 2026',
    status: 'OPEN',
    responseCount: 8,
    createdAt: '2026-06-05',
    specifications: ['Multi-spec', 'Industrial grade', 'REACH compliant'],
    qualityRequired: 'Industrial Grade',
    paymentTerms: 'Net 30',
    preferredSupplierLocation: 'China, Taiwan',
  },
  {
    id: 'RFQ-2024-004',
    title: 'Steel Billets Grade A',
    description: 'IS 2062 certified steel billets required for construction project. Bulk quantity needed.',
    buyer: 'Middle East Builders',
    buyerId: 'buyer-004',
    product: 'Steel Billets',
    quantity: '1,000',
    unit: 'MT',
    deliveryCountry: 'Saudi Arabia',
    deadline: 'Jul 5, 2026',
    status: 'OPEN',
    responseCount: 2,
    createdAt: '2026-06-01',
    specifications: ['IS 2062 E250A', '130x130mm', '6m length'],
    qualityRequired: 'BIS Certified',
    paymentTerms: 'Letter of Credit',
    preferredSupplierLocation: 'Turkey, UAE',
  },
  {
    id: 'RFQ-2024-005',
    title: 'Solar Panel Modules 550W',
    description: 'Tier 1 solar panels for our renewable energy project. Looking for competitive pricing on large volume.',
    buyer: 'Green Energy Solutions',
    buyerId: 'buyer-005',
    product: 'Solar Panels',
    quantity: '10,000',
    unit: 'units',
    deliveryCountry: 'Spain',
    deadline: 'Jul 10, 2026',
    status: 'OPEN',
    responseCount: 4,
    createdAt: '2026-05-28',
    specifications: ['550W', 'Mono PERC', 'Tier 1 manufacturer'],
    qualityRequired: 'IEC 61215, IEC 61730',
    paymentTerms: 'Telegraphic Transfer',
    preferredSupplierLocation: 'China',
  },
];

export function getRFQ(id: string): RFQ | undefined {
  return rfqs.find(r => r.id === id);
}

export function getRFQsByStatus(status: RFQStatus | 'all'): RFQ[] {
  if (status === 'all') return rfqs;
  return rfqs.filter(r => r.status === status);
}

export const rfqStatusColors: Record<RFQStatus, string> = {
  'OPEN': 'bg-emerald-100 text-emerald-700',
  'IN_REVIEW': 'bg-amber-100 text-amber-700',
  'CLOSED': 'bg-gray-100 text-gray-600',
  'AWARDED': 'bg-blue-100 text-blue-700',
};
