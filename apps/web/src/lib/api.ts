const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiError {
  message: string;
  statusCode: number;
}

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }
}

export const api = new ApiClient();

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ data: { user: User; accessToken: string; refreshToken: string } }>('/api/v1/auth/login', { email, password }),

  signup: (data: SignupData) =>
    api.post<{ data: { user: User; accessToken: string; refreshToken: string } }>('/api/v1/auth/signup', data),

  logout: () =>
    api.post<{ success: boolean }>('/api/v1/auth/logout'),

  refresh: (refreshToken: string) =>
    api.post<{ accessToken: string; refreshToken: string }>('/api/v1/auth/refresh', { refreshToken }),

  me: () =>
    api.get<{ user: User }>('/api/v1/auth/me'),

  demo: () =>
    api.post<{ data: { user: User; accessToken: string; refreshToken: string } }>('/api/v1/auth/demo'),
};

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  avatar?: string;
  company?: string;
  country?: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}
