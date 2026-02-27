import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiLogin, apiRegister, apiLogout, apiGetMe, ApiUser } from '@/app/services/api';

// Re-export User type for backward compatibility
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'customer';
  phone?: string;
}

// Convert API user to app user (id as string for compatibility)
function toAppUser(apiUser: ApiUser): User {
  return {
    id: String(apiUser.id),
    name: apiUser.name,
    email: apiUser.email,
    role: apiUser.role,
    phone: apiUser.phone,
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored token and validate with API
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('currentUser');
    if (token && storedUser) {
      // Use stored user data immediately for fast UI
      setUser(JSON.parse(storedUser));
      // Optionally validate token in background
      apiGetMe()
        .then(apiUser => {
          const appUser = toAppUser(apiUser);
          setUser(appUser);
          localStorage.setItem('currentUser', JSON.stringify(appUser));
        })
        .catch(() => {
          // Token expired or invalid
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    try {
      const response = await apiLogin(email, password, role);
      const appUser = toAppUser(response.user);
      setUser(appUser);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(appUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, phone: string): Promise<boolean> => {
    try {
      const response = await apiRegister(name, email, password, phone);
      const appUser = toAppUser(response.user);
      setUser(appUser);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(appUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    apiLogout().catch(() => { }); // Fire and forget
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
