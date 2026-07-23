import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CloudLightning, 
  Info, 
  CheckCheck, 
  Trash2,
  Bug
} from 'lucide-react';

interface AlertItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'Weather' | 'Pests' | 'System';
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      type: 'critical',
      category: 'Pests',
      title: 'Locust Swarm Advisory (Yellow Alert)',
      content: 'Migratory locust movements detected in neighboring state fields. Implement preventative boundary trenching and inspect wheat farms hourly.',
      time: '15 mins ago',
      read: false
    },
    {
      id: '2',
      type: 'critical',
      category: 'Weather',
      title: 'Severe Hailstorm Warning tonight',
      content: 'Heavy thunderstorm activity and high probability of hail expected tonight between 11:00 PM and 2:00 AM. Secure crop shelters, tarps, and greenhouses.',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      category: 'Weather',
      title: 'Extreme Heatwave Forecast',
      content: 'Ambient temperatures will rise above 40°C for the next 4 days. Implement double mulch lining and schedule irrigation during late evening hours.',
      time: '5 hours ago',
      read: false
    },
    {
      id: '4',
      type: 'info',
      category: 'System',
      title: 'Soil Sensor calibration update',
      content: 'Your wireless soil probe calibration has been synchronized with the AgroGen cloud framework. Reading accuracy increased to 99.8%.',
      time: '1 day ago',
      read: true
    }
  ]);

  const [activeTab, setActiveTab] = useState<'All' | 'Weather' | 'Pests' | 'System'>('All');

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: !a.read } : a));
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const filteredAlerts = alerts.filter(a => activeTab === 'All' || a.category === activeTab);
  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="space-y-8 py-4 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
            <Bell className="w-8 h-8 text-emerald-400" />
            <span>Farm Intelligence Alerts & Advisory</span>
          </h1>
          <p className="text-xs text-emerald-300/70 mt-1">
            Real-time notifications regarding high-risk weather patterns, pathogen spreads, local market shifts, and system calibrations.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 hover:bg-emerald-800/80 text-xs font-bold flex items-center gap-1.5 shrink-0"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Categories Filtering tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-emerald-800/40 pb-2">
        {(['All', 'Weather', 'Pests', 'System'] as const).map(tab => {
          const count = alerts.filter(a => (tab === 'All' || a.category === tab) && !a.read).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
                activeTab === tab
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-emerald-100/70 hover:text-emerald-200'
              }`}
            >
              <span>{tab}</span>
              {count > 0 && (
                <span className="ml-1.5 px-1 py-0.2 rounded-full text-[9px] font-black bg-rose-500 text-rose-100">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Advisory Cards List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => {
          let cardBg = 'bg-emerald-900/10 border-emerald-500/20';
          let icon = <Info className="w-5 h-5 text-emerald-400" />;
          
          if (alert.type === 'critical') {
            cardBg = 'bg-rose-950/40 border-rose-500/30';
            icon = alert.category === 'Weather' 
              ? <CloudLightning className="w-5 h-5 text-rose-400" />
              : <Bug className="w-5 h-5 text-rose-400" />;
          } else if (alert.type === 'warning') {
            cardBg = 'bg-amber-950/40 border-amber-500/30';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400" />;
          }

          return (
            <div 
              key={alert.id}
              className={`p-5 rounded-3xl border flex gap-4 items-start transition-all ${cardBg} ${
                alert.read ? 'opacity-60' : 'shadow-lg shadow-emerald-500/5'
              }`}
            >
              <div className="shrink-0 p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/10 mt-0.5">
                {icon}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className={`text-sm font-bold ${alert.read ? 'text-emerald-200/80' : 'text-emerald-100'}`}>
                    {alert.title}
                  </h3>
                  <span className="text-[9px] text-emerald-400/60 shrink-0">{alert.time}</span>
                </div>
                
                <p className="text-xs text-emerald-200/80 leading-relaxed">{alert.content}</p>
                
                <div className="flex gap-3 pt-2.5 text-[10px]">
                  <button 
                    onClick={() => handleToggleRead(alert.id)}
                    className="font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    {alert.read ? 'Mark Unread' : 'Dismiss Alert'}
                  </button>
                  <span className="text-emerald-800/40">|</span>
                  <button 
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="font-bold text-emerald-300/60 hover:text-rose-400 flex items-center gap-0.5"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="py-16 text-center text-emerald-300/40 italic">
            No notification advisories logged. All operations active.
          </div>
        )}
      </div>

    </div>
  );
};
