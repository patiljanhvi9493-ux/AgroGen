import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  UserCheck, 
  Database, 
  ShoppingBag, 
  Terminal
} from 'lucide-react';
import { MOCK_DISEASES, MOCK_EXPERTS } from '../data/mockData';


export const AdminPanelPage: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'experts' | 'diseases' | 'products' | 'logs'>('users');

  const adminStats = [
    { label: 'Registered Farmers', value: '85,420', icon: Users, color: 'text-emerald-400' },
    { label: 'Verified Experts', value: '512', icon: UserCheck, color: 'text-teal-400' },
    { label: 'Total AI Scans', value: '250,910', icon: Database, color: 'text-cyan-400' },
    { label: 'System Uptime', value: '99.98%', icon: ShieldCheck, color: 'text-emerald-300' }
  ];

  const mockUsersList = [
    { id: 1, name: 'Gurpreet Singh', email: 'gurpreet@farm.in', state: 'Punjab', crop: 'Wheat & Rice', status: 'Active' },
    { id: 2, name: 'Ananya Sharma', email: 'ananya@agri.org', state: 'Maharashtra', crop: 'Grapes', status: 'Active' },
    { id: 3, name: 'Carlos Rodriguez', email: 'carlos@valley.com', state: 'California', crop: 'Strawberry', status: 'Active' },
    { id: 4, name: 'Rajesh Farmer', email: 'rajesh@paddy.in', state: 'Haryana', crop: 'Rice', status: 'Pending Verification' }
  ];

  const mockLogs = [
    '[19:58:12] Vision AI Inference Engine loaded: Model v2.4 (TensorFlow / CUDA active)',
    '[19:57:44] Hyper-local weather sync complete for Punjab region (Station ID #884)',
    '[19:55:01] User #AG-8840 generated late blight PDF report (Status 200 OK)',
    '[19:50:33] Expert consultation appointment reserved with Dr. Rajesh Kumar'
  ];

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-teal-400" />
            <span>AgroGen Admin Control Console</span>
          </h1>
          <p className="text-xs text-emerald-300/70 mt-1">
            System administration, user verification, AI model databases, and security logs.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30">
          Super Admin Privileges Active
        </span>
      </div>

      {/* Admin Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} className="glass-card p-5 rounded-3xl space-y-2 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-bold uppercase">{st.label}</span>
                <Icon className={`w-4 h-4 ${st.color}`} />
              </div>
              <span className="text-2xl font-black text-emerald-100 block">{st.value}</span>
            </div>
          );
        })}
      </div>

      {/* Admin Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-900/40 pb-3">
        {[
          { id: 'users' as const, label: 'Manage Users', icon: Users },
          { id: 'experts' as const, label: 'Verified Experts', icon: UserCheck },
          { id: 'diseases' as const, label: 'Disease Database', icon: Database },
          { id: 'products' as const, label: 'Agri Products', icon: ShoppingBag },
          { id: 'logs' as const, label: 'System Logs', icon: Terminal }
        ].map((t) => {
          const Icon = t.icon;
          const isSel = activeAdminTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveAdminTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isSel
                  ? 'bg-teal-500 text-teal-950 shadow-md'
                  : 'bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Admin Tab Content */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
        
        {activeAdminTab === 'users' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-100">Registered Platform Farmers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-emerald-100">
                <thead className="bg-emerald-900/60 text-emerald-300 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Farmer Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">State</th>
                    <th className="p-3">Crop</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/40">
                  {mockUsersList.map((u) => (
                    <tr key={u.id} className="hover:bg-emerald-900/20">
                      <td className="p-3 font-semibold">{u.name}</td>
                      <td className="p-3 text-emerald-300/70">{u.email}</td>
                      <td className="p-3">{u.state}</td>
                      <td className="p-3">{u.crop}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button className="text-emerald-400 hover:underline">Edit</button>
                        <button className="text-rose-400 hover:underline">Block</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeAdminTab === 'experts' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-100">Verified Agronomist Roster</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_EXPERTS.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={exp.image} alt={exp.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-100">{exp.name}</h4>
                      <span className="text-[10px] text-emerald-300/70">{exp.specialization}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-teal-300">${exp.consultationFee}/hr</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeAdminTab === 'diseases' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-100">AI Pathology Database Signatures</h3>
            <div className="space-y-2">
              {Object.values(MOCK_DISEASES).map((d) => (
                <div key={d.id} className="p-3 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-emerald-100">{d.name}</strong>
                    <span className="text-emerald-400/70 block text-[10px]">Crop: {d.crop} • Category: {d.category}</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Confidence: {d.confidence}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeAdminTab === 'logs' && (
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold text-emerald-100 font-sans">Live System Server & AI Logs</h3>
            <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500/30 space-y-2 text-emerald-300 max-h-60 overflow-y-auto">
              {mockLogs.map((log, i) => (
                <div key={i} className="text-[11px] font-mono leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
