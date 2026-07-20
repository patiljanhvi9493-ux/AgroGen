import React from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Sun, 
  AlertTriangle, 
  Sparkles, 
  CloudRain, 
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';


export const WeatherPage: React.FC = () => {
  const { user } = useApp();

  const weeklyForecast = [
    { day: 'Today', temp: '28°C / 19°C', rain: '10%', icon: CloudSun, cond: 'Partly Cloudy' },
    { day: 'Tue', temp: '29°C / 20°C', rain: '65%', icon: CloudRain, cond: 'Heavy Showers' },
    { day: 'Wed', temp: '26°C / 18°C', rain: '80%', icon: CloudRain, cond: 'Thunderstorm' },
    { day: 'Thu', temp: '27°C / 17°C', rain: '20%', icon: CloudSun, cond: 'Scattered Clouds' },
    { day: 'Fri', temp: '30°C / 21°C', rain: '0%', icon: Sun, cond: 'Sunny' },
    { day: 'Sat', temp: '31°C / 22°C', rain: '5%', icon: Sun, cond: 'Sunny' },
    { day: 'Sun', temp: '28°C / 19°C', rain: '30%', icon: CloudSun, cond: 'Partly Cloudy' }
  ];

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
          <CloudSun className="w-3.5 h-3.5 text-emerald-400" />
          <span>Hyper-Local Microclimate Intelligence</span>
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-100">Live Weather & Crop Advisory</h1>
        <p className="text-xs text-emerald-300/70">
          Real-time weather station metrics for {user.state} tailored to {user.cropType} cultivation.
        </p>
      </div>

      {/* Hero Weather Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950 via-emerald-900/60 to-teal-950 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">Current Conditions • {user.state}</span>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <CloudSun className="w-16 h-16 text-emerald-300 animate-pulse" />
            <div>
              <span className="text-5xl font-black text-emerald-100">28°C</span>
              <span className="text-sm font-semibold text-emerald-300/80 block">Feels like 30°C • Partly Cloudy</span>
            </div>
          </div>
        </div>

        {/* Live Weather Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block flex items-center gap-1">
              <Droplets className="w-3 h-3 text-cyan-400" /> Humidity
            </span>
            <span className="text-base font-extrabold text-emerald-100">68%</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block flex items-center gap-1">
              <Wind className="w-3 h-3 text-teal-400" /> Wind Speed
            </span>
            <span className="text-base font-extrabold text-emerald-100">14 km/h NW</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block flex items-center gap-1">
              <CloudRain className="w-3 h-3 text-blue-400" /> Rain Chance
            </span>
            <span className="text-base font-extrabold text-emerald-100">10%</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-400" /> UV Index
            </span>
            <span className="text-base font-extrabold text-emerald-100">6.2 (Moderate)</span>
          </div>
        </div>

      </div>

      {/* Hyper-Local Crop Weather Warnings */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-base font-bold text-emerald-100 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <span>AI Crop Action Alerts</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Heavy Rain Warning on Tuesday (65% Precip)
            </span>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Delay pesticide and fertilizer foliar sprays until Wednesday. Ensure field drainage channels are clear to prevent waterlogging around root zones.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 space-y-2">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Optimal Spray Window Today
            </span>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Current wind speeds (14 km/h) are within safe boundaries for bio-pesticide spraying between 04:00 PM and 06:30 PM.
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Bar */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-base font-bold text-emerald-100">7-Day Weather Outlook</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weeklyForecast.map((w, idx) => {
            const Icon = w.icon;
            return (
              <div key={idx} className="glass-card p-3 rounded-2xl text-center space-y-2 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-300 block">{w.day}</span>
                <Icon className="w-6 h-6 text-emerald-400 mx-auto" />
                <span className="text-xs font-extrabold text-emerald-100 block">{w.temp}</span>
                <span className="text-[10px] text-cyan-400 font-semibold block">{w.rain} Rain</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
