import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type {
  User,
  Product,
  Order,
  Conversation,
  Message,
  FreightQuote,
  TradeDocument,
  DashboardMetrics,
  ComplianceAdvice,
  DutyCalculation,
  SanctionMatch,
} from '@leverage/shared';
import type {
  CreateProductInput,
  CreateOrderInput,
} from '@leverage/shared';

// Import types from shared or define locally
export type {
  CreateProductInput,
  CreateOrderInput,
};

// Additional input types for API calls
interface OrderTimeline {
  created: Date;
  confirmed?: Date;
  processing?: Date;
  shipped?: Date;
  delivered?: Date;
}

interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface AiConversation {
  id: string;
  title?: string;
  messageCount: number;
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
}

interface HsCodeClassification {
  code: string;
  description: string;
  category: string;
  confidence: number;
}

interface SanctionScreeningResult {
  blocked: boolean;
  match: SanctionMatch | null;
  riskScore: number;
  lists: string[];
}

interface ShipmentValidationInput {
  hsCode: string;
  destinationCountry: string;
  parties?: { name: string; country?: string }[];
  productDescription?: string;
  cargoValue?: number;
}

interface ValidationResult {
  valid: boolean;
  checks: {
    hsCode: {
      restricted: boolean;
      warnings: string[];
      requiresLicense: boolean;
    };
    sanctions: {
      blocked: boolean;
      matches: SanctionMatch[];
      riskLevel: string;
    };
  };
  warnings: string[];
}

interface LandedCostInput {
  hsCode: string;
  productValue: number;
  destinationCountry: string;
  shippingCost?: number;
  insuranceCost?: number;
  currency?: string;
}

interface LandedCostResult {
  productValue: number;
  shippingCost: number;
  insuranceCost: number;
  duties: number;
  taxes: number;
  totalLandedCost: number;
  currency: string;
}

interface FreightQuoteRequest {
  origin: { country: string; city?: string; port?: string };
  destination: { country: string; city?: string; port?: string };
  transportMode: string;
  weight?: number;
  volume?: number;
  incoterm?: string;
}

interface FreightBooking {
  id: string;
  bookingReference: string;
  status: string;
  quote: FreightQuote;
}

interface Carrier {
  id: string;
  name: string;
  code: string;
  logo?: string;
  transportModes: string[];
}

interface DocumentGenerationInput {
  type: string;
  orderId?: string;
  data?: Record<string, unknown>;
}

interface DocumentSignature {
  signature: string;
  type: 'text' | 'image';
}

interface Document {
  id: string;
  type: string;
  title: string;
  number?: string;
  status: string;
  fileUrl?: string;
  createdAt: string;
}

interface AnalyticsEventInput {
  eventType: string;
  eventName: string;
  properties?: Record<string, unknown>;
}

interface RevenueData {
  data: Array<{ date: string; revenue: number }>;
  total: number;
  period: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Required for HttpOnly cookies
});

// Request interceptor - token comes from HttpOnly cookie, not needed here
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Tokens are now HttpOnly cookies - no need to read from localStorage
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token is now HttpOnly cookie - server handles it
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;

        // Set new access token cookie
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login on refresh failure
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Token management functions for special cases (logout, etc.)
export const tokenService = {
  // Tokens are HttpOnly cookies - this just triggers logout
  clearTokens: () => {
    // Server handles cookie clearing via /auth/logout
  },

  // Check if user is authenticated (by presence of auth cookie)
  isAuthenticated: (): boolean => {
    if (typeof document === 'undefined') return false;
    return document.cookie.includes('accessToken') || document.cookie.includes('auth_token');
  },
};

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

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

// Auth API
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<{ user: User; accessToken: string }>>('/auth/login', data, { withCredentials: true }),

  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) => api.post<ApiResponse<{ user: User; accessToken: string }>>('/auth/signup', data, { withCredentials: true }),

  logout: () =>
    api.post('/auth/logout', {}, { withCredentials: true }),

  refresh: () =>
    api.post<ApiResponse<{ accessToken: string }>>('/auth/refresh', {}, { withCredentials: true }),

  me: () => api.get<ApiResponse<User>>('/auth/me'),

  verifyOtp: (code: string) =>
    api.post('/auth/verify-otp', { code }),

  setupMfa: () => api.post<ApiResponse<{ secret: string; otpauthUrl: string }>>('/auth/mfa/setup'),

  verifyMfa: (code: string) =>
    api.post('/auth/mfa/verify', { code }),
};

// Products API
export const productsApi = {
  list: (params?: { page?: number; limit?: number; categoryId?: string; search?: string }) =>
    api.get<PaginatedResponse<Product>>('/products', { params }),

  get: (id: string) =>
    api.get<ApiResponse<Product>>(`/products/${id}`),

  create: (data: CreateProductInput) =>
    api.post<ApiResponse<Product>>('/products', data),

  update: (id: string, data: Partial<CreateProductInput>) =>
    api.patch<ApiResponse<Product>>(`/products/${id}`, data),

  delete: (id: string) =>
    api.delete(`/products/${id}`),

  search: (query: string) =>
    api.get<ApiResponse<Product[]>>('/products/search', { params: { q: query } }),
};

// Orders API
export const ordersApi = {
  list: (params?: { page?: number; status?: string }) =>
    api.get<PaginatedResponse<Order>>('/orders', { params }),

  get: (id: string) =>
    api.get<ApiResponse<Order>>(`/orders/${id}`),

  create: (data: CreateOrderInput) =>
    api.post<ApiResponse<Order>>('/orders', data),

  updateStatus: (id: string, status: string) =>
    api.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status }),

  cancel: (id: string) =>
    api.delete<ApiResponse<Order>>(`/orders/${id}`),

  timeline: (id: string) =>
    api.get<ApiResponse<OrderTimeline>>(`/orders/${id}/timeline`),
};

// Messages API
export const messagesApi = {
  getConversations: () =>
    api.get<ApiResponse<Conversation[]>>('/messages/conversations'),

  getMessages: (conversationId: string, params?: { limit?: number; offset?: number }) =>
    api.get<ApiResponse<Message[]>>(`/messages/conversations/${conversationId}/messages`, { params }),

  sendMessage: (conversationId: string, content: string) =>
    api.post<ApiResponse<Message>>(`/messages/conversations/${conversationId}/messages`, { content }),

  markAsRead: (conversationId: string) =>
    api.post(`/messages/conversations/${conversationId}/read`),
};

// AI Chat API
export const chatApi = {
  chat: (message: string, conversationId?: string) =>
    api.post<ApiResponse<AiMessage>>('/ai/chat', { message, conversation_id: conversationId }),

  getConversations: () =>
    api.get<ApiResponse<AiConversation[]>>('/ai/conversations'),

  getConversation: (conversationId: string) =>
    api.get<ApiResponse<AiConversation>>(`/ai/conversations/${conversationId}`),

  complianceAdvice: (productDescription: string, originCountry: string, destinationCountry: string) =>
    api.post<ApiResponse<ComplianceAdvice>>('/ai/compliance/advice', {
      product_description: productDescription,
      origin_country: originCountry,
      destination_country: destinationCountry,
    }),
};

// Compliance API
export const complianceApi = {
  classifyProduct: (description: string) =>
    api.post<ApiResponse<HsCodeClassification>>('/compliance/classify', { description }),

  calculateDuty: (data: { hsCode: string; value: number; country: string }) =>
    api.post<ApiResponse<DutyCalculation>>('/compliance/duty-calculate', data),

  screenEntity: (name: string, country?: string) =>
    api.post<ApiResponse<SanctionScreeningResult>>('/compliance/screen', { name, country }),

  validateShipment: (shipment: ShipmentValidationInput) =>
    api.post<ApiResponse<ValidationResult>>('/compliance/validate-shipment', shipment),

  calculateLandedCost: (data: LandedCostInput) =>
    api.post<ApiResponse<LandedCostResult>>('/compliance/landed-cost', data),
};

// Freight API
export const freightApi = {
  getQuotes: (data: FreightQuoteRequest) =>
    api.post<ApiResponse<FreightQuote[]>>('/freight/quotes', data),

  bookQuote: (quoteId: string) =>
    api.post<ApiResponse<FreightBooking>>(`/freight/quotes/${quoteId}/book`),

  getCarriers: () =>
    api.get<ApiResponse<Carrier[]>>('/freight/carriers'),
};

// Documents API
export const documentsApi = {
  list: (params?: { type?: string; page?: number }) =>
    api.get<PaginatedResponse<Document>>('/documents', { params }),

  generate: (data: DocumentGenerationInput) =>
    api.post<ApiResponse<Document>>('/documents/generate', data),

  download: (id: string) =>
    api.get(`/documents/${id}/download`, { responseType: 'blob' }),

  sign: (id: string, signature: DocumentSignature) =>
    api.post<ApiResponse<Document>>(`/documents/${id}/sign`, signature),
};

// Analytics API
export const analyticsApi = {
  trackEvent: (event: AnalyticsEventInput) =>
    api.post('/analytics/events', event),

  getDashboard: () =>
    api.get<ApiResponse<DashboardMetrics>>('/analytics/dashboard'),

  getRevenue: (params?: { period?: string; startDate?: string; endDate?: string }) =>
    api.get<ApiResponse<RevenueData>>('/analytics/revenue', { params }),
};

export default api;
