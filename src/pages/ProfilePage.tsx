import React from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Sprout, 
  Award, 
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';


export const ProfilePage: React.FC = () => {
  const { user, reports, setActiveTab } = useApp();

  const achievements = [
    { title: 'Early Disease Spotter', desc: 'Identified 10+ plant diseases before crop damage.', icon: ShieldCheck },
    { title: 'Eco Bio-Farming Champion', desc: 'Used organic copper remedies on 5+ scans.', icon: Sprout },
    { title: 'Certified AgroGen Member', desc: 'Active platform user since 2026.', icon: Award }
  ];

  return (
    <div className="space-y-8 py-4 pb-20 max-w-4xl mx-auto">
      
      {/* User Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950 via-emerald-900/50 to-teal-950 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-xl shadow-emerald-500/30">
          <div className="w-full h-full bg-emerald-950 rounded-[20px] flex items-center justify-center text-3xl font-black text-emerald-300">
            {user.name.charAt(0)}
          </div>
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
            Verified Farmer Account
          </div>
          <h1 className="text-2xl font-extrabold text-emerald-100">{user.name}</h1>
          <p className="text-xs text-emerald-300/80">{user.cropType} Cultivator • {user.state}</p>
        </div>

        <button
          onClick={() => setActiveTab('settings')}
          className="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold hover:bg-emerald-800/60"
        >
          Edit Profile
        </button>
      </div>

      {/* Farm & Personal Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal Info */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
          <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            <span>Personal Information</span>
          </h3>

          <div className="space-y-3 text-xs text-emerald-100/80">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/10">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/10">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{user.phone}</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/10">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Language: {user.language}</span>
            </div>
          </div>
        </div>

        {/* Farm Info */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
          <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Farm & Crop Information</span>
          </h3>

          <div className="space-y-3 text-xs text-emerald-100/80">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/10">
              <span>Farm Size:</span>
              <strong className="text-emerald-300">{user.farmSize}</strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/10">
              <span>Primary Crops:</span>
              <strong className="text-emerald-300">{user.cropType}</strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/10">
              <span>Total Saved Reports:</span>
              <strong className="text-emerald-300">{reports.length > 0 ? reports.length : 5} Reports</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Badges & Achievements */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
        <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Badges & Achievements</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 space-y-2 text-center">
                <Icon className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-100">{a.title}</h4>
                <p className="text-[10px] text-emerald-300/70">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
