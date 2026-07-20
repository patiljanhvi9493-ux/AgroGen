import React from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  FileSpreadsheet, 
  CloudSun, 
  Bot, 
  BookOpen, 
  GraduationCap, 
  ShoppingBag, 
  UserCheck, 
  User, 
  Settings as SettingsIcon, 
  ShieldAlert, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { TabType } from '../context/AppContext';


export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, user, setAuthModalOpen } = useApp();

  const menuItems: { label: string; tab: TabType; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { label: 'Dashboard', tab: 'dashboard', icon: LayoutDashboard },
    { label: 'Disease Scanner', tab: 'detection', icon: Scan, badge: 'AI Vision' },
    { label: 'My Reports', tab: 'reports', icon: FileSpreadsheet },
    { label: 'Live Weather', tab: 'weather', icon: CloudSun },
    { label: 'AI Chatbot', tab: 'chatbot', icon: Bot, badge: '24/7' },
    { label: 'Crop Library', tab: 'crops', icon: BookOpen },
    { label: 'Knowledge Center', tab: 'knowledge', icon: GraduationCap },
    { label: 'Marketplace', tab: 'marketplace', icon: ShoppingBag },
    { label: 'Book Expert', tab: 'consultation', icon: UserCheck },
    { label: 'My Profile', tab: 'profile', icon: User },
    { label: 'Settings', tab: 'settings', icon: SettingsIcon },
    { label: 'Admin Panel', tab: 'admin', icon: ShieldAlert }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-emerald-500/20 bg-emerald-950/60 glass-panel min-h-[calc(100vh-4rem)] p-4 space-y-6">
      
      {/* User Mini Farm Profile Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-900/60 to-teal-950/80 border border-emerald-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-bold text-sm">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-emerald-100 truncate">{user.name}</span>
            <span className="text-[11px] text-emerald-400/80 truncate">{user.cropType} • {user.farmSize}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider px-3 mb-2 block">
          Platform Menu
        </span>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;

          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                  : 'text-emerald-100/70 hover:text-emerald-200 hover:bg-emerald-900/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-emerald-400/60 group-hover:text-emerald-300'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick AI Pro Banner */}
      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600/20 via-teal-600/10 to-transparent border border-emerald-500/30 text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-emerald-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AgroGen Vision Pro</span>
        </div>
        <p className="text-[11px] text-emerald-200/70">Instant 99% accuracy disease diagnostic engine active.</p>
      </div>

      {/* Logout button */}
      <button
        onClick={() => setAuthModalOpen(true)}
        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-300/80 hover:text-rose-200 hover:bg-rose-950/40 border border-transparent hover:border-rose-800/40 transition-colors"
      >
        <LogOut className="w-4 h-4 text-rose-400/70" />
        <span>Switch Account / Auth</span>
      </button>

    </aside>
  );
};
