// Shared supplier data

export interface Supplier {
  id: string;
  name: string;
  logo?: string;
  coverImage?: string;
  description: string;
  location: string;
  country: string;
  verified: boolean;
  rating: number;
  reviews: number;
  products: number;
  responseTime?: string;
  categories: string[];
  established?: string;
  contactEmail?: string;
  website?: string;
  // IndiaMART-style fields
  businessType?: string;
  gstVerified?: boolean;
  trustseal?: boolean;
  yearsInBusiness?: number;
  annualRevenue?: string;
  exportPercentage?: string;
  importPercentage?: string;
  employeeCount?: string;
  natureOfBusiness?: string;
  // Contact
  phone?: string;
  whatsapp?: string;
}

export const suppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Global Trade Exports',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200',
    description: 'Leading exporter of premium agricultural products including rice, spices, and pulses from India. We have been serving international buyers for over 12 years with consistent quality and competitive pricing.',
    location: 'Mumbai, Maharashtra',
    country: 'India',
    verified: true,
    rating: 4.8,
    reviews: 128,
    products: 245,
    responseTime: '< 2 hours',
    categories: ['Food & Agriculture', 'Spices', 'Rice', 'Pulses'],
    established: '2012',
    businessType: 'Exporter, Manufacturer',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 12,
    annualRevenue: '₹100+ Crores',
    exportPercentage: '80%',
    natureOfBusiness: 'Manufacturer',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
  },
  {
    id: 'sup-002',
    name: 'Cotton World Ltd',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    coverImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200',
    description: 'Specialized in organic and conventional cotton yarn, fabrics, and textile raw materials. We produce sustainable textiles meeting international standards.',
    location: 'Ahmedabad, Gujarat',
    country: 'India',
    verified: true,
    rating: 4.7,
    reviews: 96,
    products: 128,
    responseTime: '< 4 hours',
    categories: ['Textiles', 'Raw Materials', 'Yarn', 'Fabrics'],
    established: '2016',
    businessType: 'Manufacturer, Exporter',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 8,
    annualRevenue: '₹50+ Crores',
    exportPercentage: '60%',
    natureOfBusiness: 'Manufacturer',
    phone: '+91 98765 43211',
    whatsapp: '+91 98765 43211',
  },
  {
    id: 'sup-003',
    name: 'MetalLink Global FZE',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    coverImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200',
    description: 'Industrial metals and minerals supplier with global logistics capabilities. We specialize in copper, aluminum, and steel products for manufacturing industries.',
    location: 'Dubai, UAE',
    country: 'UAE',
    verified: true,
    rating: 4.9,
    reviews: 78,
    products: 89,
    responseTime: '< 1 hour',
    categories: ['Metals & Minerals', 'Industrial', 'Copper', 'Steel'],
    established: '2009',
    businessType: 'Supplier, Exporter, Distributor',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 15,
    annualRevenue: 'USD 50+ Million',
    exportPercentage: '70%',
    natureOfBusiness: 'Trader',
    phone: '+971 50 123 4567',
    whatsapp: '+971 50 123 4567',
  },
  {
    id: 'sup-004',
    name: 'Shanghai Import Co. Ltd',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200',
    description: 'Electronics and solar energy products manufacturer and exporter. Tier 1 solar panels and electronic components at competitive prices.',
    location: 'Shanghai, China',
    country: 'China',
    verified: false,
    rating: 4.6,
    reviews: 89,
    products: 156,
    responseTime: '< 6 hours',
    categories: ['Electronics', 'Energy', 'Solar Panels', 'Components'],
    established: '2018',
    businessType: 'Manufacturer, Exporter',
    gstVerified: false,
    trustseal: false,
    yearsInBusiness: 6,
    annualRevenue: 'USD 20+ Million',
    exportPercentage: '90%',
    natureOfBusiness: 'Manufacturer',
    phone: '+86 21 1234 5678',
    whatsapp: '+86 21 1234 5678',
  },
  {
    id: 'sup-005',
    name: 'Turkey Merchants A.S.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    coverImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200',
    description: 'Premium food products exporter from Turkey. Olive oil, dried fruits, and agricultural commodities with European quality standards.',
    location: 'Istanbul, Turkey',
    country: 'Turkey',
    verified: true,
    rating: 4.9,
    reviews: 156,
    products: 78,
    responseTime: '< 3 hours',
    categories: ['Food & Agriculture', 'Dried Fruits', 'Olive Oil', 'Spices'],
    established: '2006',
    businessType: 'Exporter, Manufacturer',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 18,
    annualRevenue: 'USD 30+ Million',
    exportPercentage: '85%',
    natureOfBusiness: 'Manufacturer, Exporter',
    phone: '+90 212 123 4567',
    whatsapp: '+90 532 123 4567',
  },
  {
    id: 'sup-006',
    name: 'Ethiopia Direct Coffee',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    coverImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200',
    description: 'Direct source of premium Ethiopian coffee beans and specialty exports. We work directly with farmers ensuring fair trade practices.',
    location: 'Addis Claude, Ethiopia',
    country: 'Ethiopia',
    verified: true,
    rating: 4.8,
    reviews: 64,
    products: 34,
    responseTime: '< 4 hours',
    categories: ['Food & Agriculture', 'Coffee', 'Specialty Foods'],
    established: '2014',
    businessType: 'Exporter, Supplier',
    gstVerified: true,
    trustseal: true,
    yearsInBusiness: 10,
    annualRevenue: 'USD 5+ Million',
    exportPercentage: '95%',
    natureOfBusiness: 'Exporter',
    phone: '+251 11 123 4567',
    whatsapp: '+251 91 123 4567',
  },
];

export function getSupplier(id: string): Supplier | undefined {
  return suppliers.find(s => s.id === id);
}

export function getSuppliersByCountry(country: string): Supplier[] {
  if (country === 'all') return suppliers;
  return suppliers.filter(s => s.country.toLowerCase().includes(country.toLowerCase()));
}

export function getSuppliersByCategory(category: string): Supplier[] {
  if (category === 'all') return suppliers;
  return suppliers.filter(s => s.categories.includes(category));
}
