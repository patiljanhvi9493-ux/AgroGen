import React, { useState } from 'react';
import { 
  Sprout, 
  Sun, 
  Moon, 
  Bell, 
  ShoppingBag, 
  Search, 
  Globe, 
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { TabType } from '../context/AppContext';


export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isDarkMode, 
    setIsDarkMode, 
    user, 
    cart, 
    setAuthModalOpen 
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: { label: string; tab: TabType }[] = [
    { label: 'Home', tab: 'landing' },
    { label: 'Dashboard', tab: 'dashboard' },
    { label: 'Disease Detection', tab: 'detection' },
    { label: 'Crops Library', tab: 'crops' },
    { label: 'Weather', tab: 'weather' },
    { label: 'Marketplace', tab: 'marketplace' },
    { label: 'Experts', tab: 'consultation' }
  ];

  const mockNotifications = [
    { id: 1, text: 'Weather Alert: High moisture expected tomorrow. Spray fungicide.', time: '10m ago' },
    { id: 2, text: 'Expert Dr. Rajesh confirmed your consultation at 4:00 PM.', time: '1h ago' },
    { id: 3, text: 'Government Scheme: 80% Drip Irrigation subsidy active.', time: '3h ago' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-emerald-500/20 bg-emerald-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
              <Sprout className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-green-200 to-teal-200 bg-clip-text text-transparent glow-text">
              AgroGen
            </span>
            <span className="text-[10px] font-medium text-emerald-400/80 uppercase tracking-widest -mt-1">
              Smart AI Farming
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.tab}
              onClick={() => setActiveTab(link.tab)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === link.tab
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                  : 'text-emerald-100/70 hover:text-emerald-200 hover:bg-emerald-900/40'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Search */}
          <button 
            onClick={() => setActiveTab('crops')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/40 border border-emerald-500/20 text-emerald-300/70 text-xs hover:border-emerald-500/40 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search crops, diseases...</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 rounded-lg bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/50 transition-colors flex items-center gap-1"
              title="Change Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">{user.language.substring(0, 2)}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-emerald-950 border border-emerald-500/30 shadow-2xl py-1 text-xs z-50">
                {['English', 'Hindi (हिंदी)', 'Punjabi (ਪੰਜਾਬੀ)', 'Spanish', 'French'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      user.language = lang.split(' ')[0];
                      setLangMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-emerald-200 hover:bg-emerald-800/40 transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/50 transition-colors"
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifMenuOpen(!notifMenuOpen)}
              className="p-2 rounded-lg bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/50 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {notifMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-emerald-950 border border-emerald-500/30 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-800/50">
                  <span className="text-xs font-bold text-emerald-200">Alerts & Notifications</span>
                  <span className="text-[10px] text-emerald-400 cursor-pointer">Mark all read</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockNotifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-lg bg-emerald-900/30 border border-emerald-500/10 text-xs">
                      <p className="text-emerald-100 font-medium">{n.text}</p>
                      <span className="text-[10px] text-emerald-400/60 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setActiveTab('marketplace')}
            className="p-2 rounded-lg bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/50 transition-colors relative"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-emerald-950 text-[9px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Admin Toggle */}
          <button
            onClick={() => setActiveTab('admin')}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-900/40 border border-teal-500/30 text-teal-300 text-xs font-semibold hover:bg-teal-800/50 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* User Profile / Auth Button */}
          {user.isLoggedIn ? (
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-400 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-emerald-950 font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-emerald-100 max-w-[90px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-emerald-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 transition-all"
            >
              Login / Signup
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
