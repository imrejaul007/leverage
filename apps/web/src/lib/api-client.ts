import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

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
    api.post<ApiResponse<{ user: any; accessToken: string; refreshToken: string }>>('/auth/login', data),

  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) => api.post<ApiResponse<{ user: any; accessToken: string; refreshToken: string }>>('/auth/signup', data),

  logout: (refreshToken: string) =>
    api.post('/auth/logout', { refreshToken }),

  refresh: (refreshToken: string) =>
    api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/auth/refresh', { refreshToken }),

  me: () => api.get<ApiResponse<any>>('/auth/me'),

  verifyOtp: (code: string) =>
    api.post('/auth/verify-otp', { code }),

  setupMfa: () => api.post<ApiResponse<{ secret: string; otpauthUrl: string }>>('/auth/mfa/setup'),

  verifyMfa: (code: string) =>
    api.post('/auth/mfa/verify', { code }),
};

// Products API
export const productsApi = {
  list: (params?: { page?: number; limit?: number; categoryId?: string; search?: string }) =>
    api.get<PaginatedResponse<any>>('/products', { params }),

  get: (id: string) =>
    api.get<ApiResponse<any>>(`/products/${id}`),

  create: (data: any) =>
    api.post<ApiResponse<any>>('/products', data),

  update: (id: string, data: any) =>
    api.patch<ApiResponse<any>>(`/products/${id}`, data),

  delete: (id: string) =>
    api.delete(`/products/${id}`),

  search: (query: string) =>
    api.get<ApiResponse<any[]>>('/products/search', { params: { q: query } }),
};

// Orders API
export const ordersApi = {
  list: (params?: { page?: number; status?: string }) =>
    api.get<PaginatedResponse<any>>('/orders', { params }),

  get: (id: string) =>
    api.get<ApiResponse<any>>(`/orders/${id}`),

  create: (data: any) =>
    api.post<ApiResponse<any>>('/orders', data),

  updateStatus: (id: string, status: string) =>
    api.patch<ApiResponse<any>>(`/orders/${id}/status`, { status }),

  cancel: (id: string) =>
    api.delete<ApiResponse<any>>(`/orders/${id}`),

  timeline: (id: string) =>
    api.get<ApiResponse<any>>(`/orders/${id}/timeline`),
};

// Messages API
export const messagesApi = {
  getConversations: () =>
    api.get<ApiResponse<any[]>>('/messages/conversations'),

  getMessages: (conversationId: string, params?: { limit?: number; offset?: number }) =>
    api.get<ApiResponse<any[]>>(`/messages/conversations/${conversationId}/messages`, { params }),

  sendMessage: (conversationId: string, content: string) =>
    api.post<ApiResponse<any>>(`/messages/conversations/${conversationId}/messages`, { content }),

  markAsRead: (conversationId: string) =>
    api.post(`/messages/conversations/${conversationId}/read`),
};

// AI Chat API
export const chatApi = {
  chat: (message: string, conversationId?: string) =>
    api.post<ApiResponse<any>>('/ai/chat', { message, conversation_id: conversationId }),

  getConversations: () =>
    api.get<ApiResponse<any[]>>('/ai/conversations'),

  getConversation: (conversationId: string) =>
    api.get<ApiResponse<any>>(`/ai/conversations/${conversationId}`),

  complianceAdvice: (productDescription: string, originCountry: string, destinationCountry: string) =>
    api.post<ApiResponse<any>>('/ai/compliance/advice', {
      product_description: productDescription,
      origin_country: originCountry,
      destination_country: destinationCountry,
    }),
};

// Compliance API
export const complianceApi = {
  classifyProduct: (description: string) =>
    api.post<ApiResponse<any>>('/compliance/classify', { description }),

  calculateDuty: (data: { hsCode: string; value: number; country: string }) =>
    api.post<ApiResponse<any>>('/compliance/duty-calculate', data),

  screenEntity: (name: string, country?: string) =>
    api.post<ApiResponse<any>>('/compliance/screen', { name, country }),

  validateShipment: (shipment: any) =>
    api.post<ApiResponse<any>>('/compliance/validate-shipment', shipment),

  calculateLandedCost: (data: any) =>
    api.post<ApiResponse<any>>('/compliance/landed-cost', data),
};

// Freight API
export const freightApi = {
  getQuotes: (data: any) =>
    api.post<ApiResponse<any[]>>('/freight/quotes', data),

  bookQuote: (quoteId: string) =>
    api.post<ApiResponse<any>>(`/freight/quotes/${quoteId}/book`),

  getCarriers: () =>
    api.get<ApiResponse<any[]>>('/freight/carriers'),
};

// Documents API
export const documentsApi = {
  list: (params?: { type?: string; page?: number }) =>
    api.get<PaginatedResponse<any>>('/documents', { params }),

  generate: (data: any) =>
    api.post<ApiResponse<any>>('/documents/generate', data),

  download: (id: string) =>
    api.get(`/documents/${id}/download`, { responseType: 'blob' }),

  sign: (id: string, signature: any) =>
    api.post<ApiResponse<any>>(`/documents/${id}/sign`, signature),
};

// Analytics API
export const analyticsApi = {
  trackEvent: (event: { eventType: string; eventName: string; properties?: any }) =>
    api.post('/analytics/events', event),

  getDashboard: () =>
    api.get<ApiResponse<any>>('/analytics/dashboard'),

  getRevenue: (params?: { period?: string; startDate?: string; endDate?: string }) =>
    api.get<ApiResponse<any>>('/analytics/revenue', { params }),
};

export default api;
