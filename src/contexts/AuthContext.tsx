import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/database';
import { users } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('globalTrotter_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('globalTrotter_user', JSON.stringify(foundUser));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }
    
    
    const newUser: User = {
      user_id: `usr_${Date.now()}`,
      name,
      email,
      password,
      created_at: new Date().toISOString(),
    };
    
    users.push(newUser);
    setUser(newUser);
    localStorage.setItem('globalTrotter_user', JSON.stringify(newUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('globalTrotter_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
