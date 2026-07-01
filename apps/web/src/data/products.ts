// Shared product data for marketplace

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  moq: string;
  category: string;
  supplier: string;
  supplierId: string;
  rating: number;
  reviews: number;
  salesCount: number;
  featured?: boolean;
  image: string;
  images?: string[];
  location: string;
  country: string;
  gstVerified?: boolean;
  trustseal?: boolean;
  yearsInBusiness?: number;
  specifications?: Record<string, string>;
  packaging?: string;
  certifications?: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice 1121 Steam',
    description: 'Extra long grain aromatic basmati rice for export. Perfect for international trade.',
    price: 850,
    originalPrice: 950,
    currency: 'MT',
    moq: '50 MT',
    category: 'Food & Agriculture',
    supplier: 'Global Trade Exports',
    supplierId: 'sup-001',
    rating: 4.8,
    reviews: 128,
    salesCount: 1248,
    featured: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800',
    ],
    location: 'Mumbai, Maharashtra',
    country: 'India',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 12,
    specifications: {
      'Grain Type': '1121 Steam',
      'Grain Length': '8.35mm min',
      'Moisture': '12.5% max',
    },
    packaging: '25 kg Bags, 50 kg Bags',
    certifications: ['ISO 22000', 'FSSAI', 'APEDA'],
  },
  {
    id: '2',
    name: 'Organic Cotton Yarn 40s Ne',
    description: 'Premium organic cotton yarn for textiles. Sustainable and certified.',
    price: 4.20,
    currency: 'KG',
    moq: '1000 KG',
    category: 'Textiles',
    supplier: 'Cotton World Ltd',
    supplierId: 'sup-002',
    rating: 4.7,
    reviews: 96,
    salesCount: 890,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
    location: 'Ahmedabad, Gujarat',
    country: 'India',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 8,
  },
  {
    id: '3',
    name: 'Copper Cathode 99.99% Grade A',
    description: 'Industrial grade copper cathode for manufacturing. LME registered.',
    price: 7250,
    currency: 'MT',
    moq: '25 MT',
    category: 'Metals & Minerals',
    supplier: 'MetalLink Global',
    supplierId: 'sup-003',
    rating: 4.9,
    reviews: 78,
    salesCount: 560,
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800',
    location: 'Dubai, UAE',
    country: 'UAE',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 15,
  },
  {
    id: '4',
    name: 'Solar Panels 550W Mono PERC',
    description: 'Tier 1 solar panels with high efficiency rating. 25 year warranty.',
    price: 165,
    currency: 'unit',
    moq: '100 units',
    category: 'Energy',
    supplier: 'Shanghai Import Co.',
    supplierId: 'sup-004',
    rating: 4.6,
    reviews: 89,
    salesCount: 2100,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    location: 'Shanghai, China',
    country: 'China',
    gstVerified: false,
    trustseal: false,
    yearsInBusiness: 6,
  },
  {
    id: '5',
    name: 'Extra Virgin Olive Oil Premium',
    description: 'Cold pressed, first harvest olive oil. Premium quality from Turkey.',
    price: 4.50,
    currency: 'L',
    moq: '5 MT',
    category: 'Food & Agriculture',
    supplier: 'Turkey Merchants',
    supplierId: 'sup-005',
    rating: 4.9,
    reviews: 156,
    salesCount: 3450,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
    location: 'Istanbul, Turkey',
    country: 'Turkey',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 18,
  },
  {
    id: '6',
    name: 'Steel Billets IS 2062 Grade A',
    description: 'IS 2062 certified steel billets for construction and manufacturing.',
    price: 620,
    currency: 'MT',
    moq: '100 MT',
    category: 'Metals & Minerals',
    supplier: 'Turkey Merchants',
    supplierId: 'sup-005',
    rating: 4.9,
    reviews: 32,
    salesCount: 890,
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
    location: 'Istanbul, Turkey',
    country: 'Turkey',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 20,
  },
  {
    id: '7',
    name: 'Arabica Green Coffee Beans',
    description: 'Premium Arabica coffee beans, washed process. Specialty grade.',
    price: 3200,
    currency: 'MT',
    moq: '10 MT',
    category: 'Food & Agriculture',
    supplier: 'Ethiopia Direct',
    supplierId: 'sup-006',
    rating: 4.8,
    reviews: 64,
    salesCount: 420,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    location: 'Addis Claude, Ethiopia',
    country: 'Ethiopia',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 10,
  },
  {
    id: '8',
    name: 'Wheat Grain Grade 1 Milling',
    description: 'High quality wheat for milling and export. Excellent gluten content.',
    price: 280,
    currency: 'MT',
    moq: '100 MT',
    category: 'Food & Agriculture',
    supplier: 'Ukraine Grain Co.',
    supplierId: 'sup-007',
    rating: 4.5,
    reviews: 45,
    salesCount: 2100,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
    location: 'Kyiv, Ukraine',
    country: 'Ukraine',
    gstVerified: false,
    trustseal: false,
    yearsInBusiness: 5,
  },
];
