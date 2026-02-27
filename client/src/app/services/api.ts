// API Service for Smart Canteen
// Handles all HTTP requests to the Laravel backend

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper to get the auth token from localStorage
function getToken(): string | null {
  return localStorage.getItem('authToken');
}

// Helper to build headers
function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

// Generic fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
}

// ==================== AUTH ====================

export interface LoginResponse {
  message: string;
  user: ApiUser;
  token: string;
}

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'customer';
  phone?: string;
}

export async function apiLogin(email: string, password: string, role?: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
}

export async function apiRegister(
  name: string,
  email: string,
  password: string,
  phone?: string
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, phone }),
  });
}

export async function apiLogout(): Promise<void> {
  await apiFetch('/logout', { method: 'POST' });
}

export async function apiGetMe(): Promise<ApiUser> {
  return apiFetch<ApiUser>('/me');
}

// ==================== MENU ITEMS ====================

export interface ApiMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'snacks' | 'meals' | 'drinks';
  image: string;
  in_stock: boolean;
  stock_quantity: number;
  created_at?: string;
  updated_at?: string;
}

export async function apiGetMenuItems(): Promise<ApiMenuItem[]> {
  return apiFetch<ApiMenuItem[]>('/menu-items');
}

export async function apiCreateMenuItem(
  data: Omit<ApiMenuItem, 'id' | 'created_at' | 'updated_at'>
): Promise<{ message: string; data: ApiMenuItem }> {
  return apiFetch('/menu-items', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiUpdateMenuItem(
  id: number,
  data: Partial<ApiMenuItem>
): Promise<{ message: string; data: ApiMenuItem }> {
  return apiFetch(`/menu-items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function apiDeleteMenuItem(id: number): Promise<{ message: string }> {
  return apiFetch(`/menu-items/${id}`, {
    method: 'DELETE',
  });
}

// ==================== ORDERS ====================

export interface ApiOrderItem {
  id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  price: number;
  menu_item?: ApiMenuItem;
}

export interface ApiOrder {
  id: number;
  customer_id: number;
  customer_name: string;
  total_amount: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  payment_method: 'cash' | 'card' | 'online';
  special_notes?: string;
  table_number?: number;
  estimated_time?: number;
  assigned_staff?: string;
  items: ApiOrderItem[];
  created_at?: string;
  updated_at?: string;
}

export async function apiGetOrders(): Promise<ApiOrder[]> {
  return apiFetch<ApiOrder[]>('/orders');
}

export async function apiCreateOrder(data: {
  items: { menu_item_id: number; quantity: number }[];
  payment_method: 'cash' | 'card' | 'online';
  special_notes?: string;
  table_number?: number;
}): Promise<{ message: string; data: ApiOrder }> {
  return apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiUpdateOrderStatus(
  id: number,
  status: 'pending' | 'preparing' | 'completed' | 'cancelled'
): Promise<{ message: string; data: ApiOrder }> {
  return apiFetch(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

// ==================== EMPLOYEES ====================

export interface ApiEmployee {
  id: number;
  user_id: number;
  hourly_rate: number;
  working_hours: number;
  total_salary: number;
  joined_date: string;
  user?: ApiUser;
}

export async function apiGetEmployees(): Promise<ApiEmployee[]> {
  return apiFetch<ApiEmployee[]>('/employees');
}

export async function apiUpdateEmployee(
  id: number,
  data: Partial<{ hourly_rate: number; working_hours: number; total_salary: number }>
): Promise<{ message: string; data: ApiEmployee }> {
  return apiFetch(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ==================== DASHBOARD ====================

export interface DashboardStats {
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
  total_revenue: number;
  total_menu_items: number;
  out_of_stock_items: number;
  total_customers: number;
  total_employees: number;
}

export async function apiGetDashboardStats(): Promise<DashboardStats> {
  return apiFetch<DashboardStats>('/dashboard/stats');
}
