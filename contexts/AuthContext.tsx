'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  email: string;
  // Add other user properties as needed
};

type RegisteredUser = {
  email: string;
  password: string; // In a real app, never store plain passwords
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get registered users from localStorage
  const getRegisteredUsers = (): RegisteredUser[] => {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };
  
  // Save registered users to localStorage
  const saveRegisteredUsers = (users: RegisteredUser[]) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    return new Promise<{ success: boolean; message?: string }>((resolve) => {
      setTimeout(() => {
        const registeredUsers = getRegisteredUsers();
        const userExists = registeredUsers.some(
          (user) => user.email === email && user.password === password
        );

        if (userExists) {
          const userData = { email };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve({ success: true });
        } else {
          resolve({ 
            success: false, 
            message: 'Invalid email or password. Please check your credentials or register for an account.' 
          });
        }
      }, 1000); // Simulate network delay
    });
  };
  
  const register = async (email: string, password: string) => {
    return new Promise<{ success: boolean; message?: string }>((resolve) => {
      setTimeout(() => {
        if (!email || !password) {
          resolve({ success: false, message: 'Email and password are required' });
          return;
        }
        
        if (!email.includes('@')) {
          resolve({ success: false, message: 'Please enter a valid email address' });
          return;
        }
        
        if (password.length < 6) {
          resolve({ success: false, message: 'Password must be at least 6 characters long' });
          return;
        }
        
        const registeredUsers = getRegisteredUsers();
        const userExists = registeredUsers.some(user => user.email === email);
        
        if (userExists) {
          resolve({ success: false, message: 'Email already registered' });
          return;
        }
        
        // Add new user
        registeredUsers.push({ email, password });
        saveRegisteredUsers(registeredUsers);
        
        // Auto-login the user after registration
        const userData = { email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        resolve({ success: true });
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
