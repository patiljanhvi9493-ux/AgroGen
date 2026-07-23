import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DiseaseInfo, Product } from '../data/mockData';

export type TabType = 
  | 'landing' 
  | 'dashboard' 
  | 'detection' 
  | 'chatbot' 
  | 'crops' 
  | 'knowledge' 
  | 'weather' 
  | 'marketplace' 
  | 'consultation' 
  | 'reports' 
  | 'profile' 
  | 'settings' 
  | 'admin'
  | 'expenses'
  | 'planner'
  | 'schemes'
  | 'forum'
  | 'selling'
  | 'calendar'
  | 'alerts';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  language: string;
  state: string;
  cropType: string;
  farmSize: string;
  isLoggedIn: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  reports: DiseaseInfo[];
  addReport: (report: DiseaseInfo) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  selectedCropId: string | null;
  setSelectedCropId: (id: string | null) => void;
}

const defaultUser: UserProfile = {
  name: 'Ramesh Patel',
  email: 'ramesh.farmer@agrogen.ai',
  phone: '+91 98765 43210',
  language: 'English',
  state: 'Punjab',
  cropType: 'Tomato & Wheat',
  farmSize: '5.5 Acres',
  isLoggedIn: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [reports, setReports] = useState<DiseaseInfo[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addReport = (report: DiseaseInfo) => {
    setReports((prev) => [report, ...prev]);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isDarkMode,
        setIsDarkMode,
        user,
        setUser,
        reports,
        addReport,
        cart,
        addToCart,
        removeFromCart,
        authModalOpen,
        setAuthModalOpen,
        selectedCropId,
        setSelectedCropId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
