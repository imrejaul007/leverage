// Leverage by Lerar - Shared Types & Utilities
// Global Trade Operating System

// ============================================
// USER & AUTH TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  isMfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  EXPORTER = 'EXPORTER',
  IMPORTER = 'IMPORTER',
  MANUFACTURER = 'MANUFACTURER',
  FREIGHT_FORWARDER = 'FREIGHT_FORWARDER',
  CONSULTANT = 'CONSULTANT',
  BUYER = 'BUYER',
  BUYER_PENDING = 'BUYER_PENDING',
  GOVERNMENT_OFFICIAL = 'GOVERNMENT_OFFICIAL',
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

// ============================================
// COMPANY TYPES
// ============================================

export interface Company {
  id: string;
  name: string;
  legalName?: string;
  logo?: string;
  description?: string;
  website?: string;
  email: string;
  phone?: string;
  address?: Address;
  gstin?: string;
  iec?: string;
  pan?: string;
  businessType?: BusinessType;
  verificationStatus: VerificationStatus;
  isVerified: boolean;
  ownerId: string;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export enum BusinessType {
  MANUFACTURER = 'MANUFACTURER',
  EXPORTER = 'EXPORTER',
  IMPORTER = 'IMPORTER',
  TRADING_COMPANY = 'TRADING_COMPANY',
  FREIGHT_FORWARDER = 'FREIGHT_FORWARDER',
  CONSULTANT = 'CONSULTANT',
  OTHER = 'OTHER',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  id: string;
  companyId: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  currency: string;
  moq: number;
  images?: string[];
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  parentId?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  children?: Category[];
  productCount: number;
}

export interface RFQ {
  id: string;
  userId: string;
  companyId: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  targetPrice?: number;
  currency: string;
  deliveryCountry: string;
  deliveryDeadline?: string;
  status: RfqStatus;
  responseCount: number;
  createdAt: string;
  expiresAt?: string;
}

export enum RfqStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  IN_REVIEW = 'IN_REVIEW',
  CLOSED = 'CLOSED',
  AWARDED = 'AWARDED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

// ============================================
// ORDER TYPES
// ============================================

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerCompanyId: string;
  sellerId: string;
  sellerCompanyId: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

// ============================================
// DOCUMENT TYPES
// ============================================

export interface TradeDocument {
  id: string;
  type: DocumentCategory;
  title: string;
  number?: string;
  status: DocumentStatus;
  fileUrl?: string;
  createdAt: string;
}

export enum DocumentCategory {
  COMMERCIAL_INVOICE = 'COMMERCIAL_INVOICE',
  PACKING_LIST = 'PACKING_LIST',
  BILL_OF_LADING = 'BILL_OF_LADING',
  AIR_WAYBILL = 'AIR_WAYBILL',
  CERTIFICATE_OF_ORIGIN = 'CERTIFICATE_OF_ORIGIN',
  SHIPPING_BILL = 'SHIPPING_BILL',
}

export enum DocumentStatus {
  DRAFT = 'DRAFT',
  VALIDATED = 'VALIDATED',
  SIGNED = 'SIGNED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// ============================================
// FREIGHT TYPES
// ============================================

export interface FreightQuote {
  id: string;
  carrierId: string;
  carrierName: string;
  origin: Location;
  destination: Location;
  transportMode: TransportMode;
  transitDays?: number;
  totalRate: number;
  currency: string;
  validUntil: string;
}

export interface Location {
  country: string;
  city?: string;
  port?: string;
  type: 'port' | 'airport' | 'address';
}

export enum TransportMode {
  OCEAN = 'OCEAN',
  AIR = 'AIR',
  TRUCK = 'TRUCK',
  RAIL = 'RAIL',
  MULTIMODAL = 'MULTIMODAL',
  COURIER = 'COURIER',
}

export interface Shipment {
  id: string;
  shipmentNumber: string;
  status: ShipmentStatus;
  origin: Location;
  destination: Location;
  transportMode: TransportMode;
  carrierId?: string;
  blNumber?: string;
  createdAt: string;
}

export enum ShipmentStatus {
  DRAFT = 'DRAFT',
  BOOKED = 'BOOKED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// ============================================
// COMPLIANCE TYPES
// ============================================

export interface ComplianceResult {
  valid: boolean;
  checks: {
    hsCode: HsCodeCheck;
    sanctions: SanctionsCheck;
  };
  warnings: string[];
}

export interface HsCodeCheck {
  restricted: boolean;
  requiresLicense: boolean;
  warnings: string[];
}

export interface SanctionsCheck {
  blocked: boolean;
  match?: SanctionMatch;
  riskScore: number;
}

export interface SanctionMatch {
  name: string;
  lists: string[];
}

export interface DutyCalculation {
  hsCode: string;
  country: string;
  cargoValue: number;
  basicDuty: number;
  additionalDuty: number;
  gst: number;
  totalDuty: number;
  cif: number;
  landedCost: number;
  currency: string;
}

// ============================================
// SOCIAL TYPES
// ============================================

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  media?: Media[];
  hashtags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  type: PostType;
  createdAt: string;
  isLiked?: boolean;
}

export interface Media {
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnail?: string;
}

export enum PostType {
  STANDARD = 'STANDARD',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  JOB_POSTING = 'JOB_POSTING',
  EVENT = 'EVENT',
  SHOWCASE = 'SHOWCASE',
}

export interface Conversation {
  id: string;
  type: ConversationType;
  participants: Participant[];
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  companyName?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  contentType: ContentType;
  sentAt: string;
  readAt?: string;
  status: MessageStatus;
}

export enum ConversationType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
  TRADE = 'TRADE',
}

export enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM',
}

export enum MessageStatus {
  SENDING = 'SENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
}

// ============================================
// AI TYPES
// ============================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  title?: string;
  lastMessage?: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceAdvice {
  advice: string;
  risks: string[];
  recommendations: string[];
  sources: string[];
  confidence: number;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface DashboardMetrics {
  revenue: MetricValue;
  orders: MetricValue;
  users: MetricValue;
  activeProducts: MetricValue;
  pendingShipments: MetricValue;
}

export interface MetricValue {
  value: number;
  previousValue?: number;
  change?: number;
  changeDirection?: 'up' | 'down' | 'stable';
}

// ============================================
// ADS TYPES
// ============================================

export interface AdCampaign {
  id: string;
  name: string;
  type: AdType;
  status: AdStatus;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate?: string;
}

export enum AdType {
  SPONSORED_LISTING = 'SPONSORED_LISTING',
  BANNER = 'BANNER',
  RFQ_PROMOTION = 'RFQ_PROMOTION',
}

export enum AdStatus {
  DRAFT = 'DRAFT',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, unknown>;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(date);
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `LBL-${year}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ============================================
// VALIDATION SCHEMAS (Zod)
// ============================================

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive').optional(),
  moq: z.number().int().positive().default(1),
  categoryId: z.string().uuid('Invalid category'),
  currency: z.string().default('USD'),
});

export const createOrderSchema = z.object({
  sellerId: z.string().uuid('Invalid seller'),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
  })).min(1, 'At least one item is required'),
  shippingAddress: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().length(2),
    postalCode: z.string().min(3),
  }),
});

export const createPostSchema = z.object({
  content: z.string().min(1, 'Post content is required').max(5000),
  media: z.array(z.object({
    type: z.enum(['image', 'video', 'document']),
    url: z.string().url(),
  })).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
