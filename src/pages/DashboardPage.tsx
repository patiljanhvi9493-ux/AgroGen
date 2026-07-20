import React from 'react';
import { 
  Scan, 
  CloudSun, 
  Activity, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Droplets,
  Wind
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_DISEASES } from '../data/mockData';


export const DashboardPage: React.FC = () => {
  const { user, setActiveTab, reports } = useApp();

  const recentReport = reports[0] || MOCK_DISEASES['tomato-blight'];

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950 via-emerald-900/60 to-teal-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Farm Intelligence Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-100">
            Good Afternoon, {user.name}! 🌾
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300/80 max-w-xl">
            Your primary crop ({user.cropType}) in {user.state} is in optimal condition with an average health score of <strong className="text-emerald-300 font-extrabold">88/100</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 z-10">
          <button
            onClick={() => setActiveTab('detection')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center gap-2"
          >
            <Scan className="w-4 h-4" />
            <span>Scan Leaf Now</span>
          </button>

          <button
            onClick={() => setActiveTab('weather')}
            className="px-5 py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 font-bold text-xs hover:bg-emerald-800/60 flex items-center gap-2"
          >
            <CloudSun className="w-4 h-4 text-emerald-400" />
            <span>Weather Forecast</span>
          </button>
        </div>
      </div>

      {/* 4 Overview Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Recent Disease */}
        <div 
          onClick={() => setActiveTab('detection')}
          className="glass-card p-5 rounded-3xl space-y-3 cursor-pointer border border-emerald-500/20 hover:border-emerald-400/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Recent Scan</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-sm font-bold text-emerald-100 truncate">{recentReport.name}</h3>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-900/40">
            <span className="text-emerald-300/70">Severity: <strong className="text-amber-300">{recentReport.severity}</strong></span>
            <span className="text-emerald-400 font-extrabold">{recentReport.confidence}% Match</span>
          </div>
        </div>

        {/* Today's Weather */}
        <div 
          onClick={() => setActiveTab('weather')}
          className="glass-card p-5 rounded-3xl space-y-3 cursor-pointer border border-emerald-500/20 hover:border-emerald-400/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Today's Weather</span>
            <CloudSun className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-xl font-black text-emerald-100">28°C <span className="text-xs font-normal text-emerald-300/70">Partly Cloudy</span></h3>
          <div className="flex items-center gap-4 text-[11px] text-emerald-300/80 pt-2 border-t border-emerald-900/40">
            <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-cyan-400" /> 68% Hum</span>
            <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-teal-400" /> 14 km/h</span>
          </div>
        </div>

        {/* Crop Health Score */}
        <div className="glass-card p-5 rounded-3xl space-y-3 border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Crop Health Index</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-emerald-300">88 / 100</h3>
          <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden border border-emerald-500/30">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[88%]" />
          </div>
        </div>

        {/* Pending Consultations */}
        <div 
          onClick={() => setActiveTab('consultation')}
          className="glass-card p-5 rounded-3xl space-y-3 cursor-pointer border border-emerald-500/20 hover:border-emerald-400/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Next Consultation</span>
            <UserCheck className="w-4 h-4 text-teal-400" />
          </div>
          <h3 className="text-sm font-bold text-emerald-100">Dr. Rajesh Kumar</h3>
          <span className="text-xs text-teal-300 font-semibold block">Today @ 04:00 PM (Video Call)</span>
        </div>

      </div>

      {/* AI Smart Suggestions & Weather Risk */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left: AI Suggestions List */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-emerald-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Real-Time AI Crop Guidance & Alerts</span>
            </h3>
            <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Updated Live
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 space-y-1">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Nitrogen Top-Dressing Recommended
              </span>
              <p className="text-xs text-emerald-100/70">
                Based on soil temperature and vegetative growth stage of your wheat crop, apply 25 kg/acre urea before morning irrigation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Fungal Spore Risk Warning (High Humidity)
              </span>
              <p className="text-xs text-emerald-100/70">
                Humidity levels in your region will surpass 85% tonight. Apply preventative Copper Fungicide spray to tomato crops.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Tools */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-100">Quick Actions</h3>
            <p className="text-xs text-emerald-300/70">Fast access to key farming modules.</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('crops')}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-xs font-semibold text-emerald-200 hover:bg-emerald-800/60 text-left flex items-center justify-between"
            >
              <span>Explore Crop Encyclopedia</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-xs font-semibold text-emerald-200 hover:bg-emerald-800/60 text-left flex items-center justify-between"
            >
              <span>Order Organic Pesticides</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-xs font-semibold text-emerald-200 hover:bg-emerald-800/60 text-left flex items-center justify-between"
            >
              <span>View Scan Reports History</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
