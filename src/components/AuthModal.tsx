import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Sprout, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';


export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, setUser } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [otpLogin, setOtpLogin] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('English');
  const [stateRegion, setStateRegion] = useState('Punjab');
  const [cropType, setCropType] = useState('Tomato & Wheat');


  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: name || (mode === 'login' ? 'Ramesh Patel' : 'New Farmer'),
      email: email || 'farmer@agrogen.ai',
      phone: phone || '+91 98765 43210',
      language,
      state: stateRegion,
      cropType,
      farmSize: '5 Acres',
      isLoggedIn: true
    });
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md glass-panel rounded-3xl border border-emerald-500/30 p-6 sm:p-8 space-y-6 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-emerald-900/40 text-emerald-300 hover:bg-emerald-800/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 mb-1">
            <Sprout className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-100">
            {mode === 'login' ? 'Welcome Back to AgroGen' : 'Create Farmer Account'}
          </h3>
          <p className="text-xs text-emerald-300/70">
            {mode === 'login' ? 'Access your AI disease reports & consultation bookings' : 'Join 85,000+ farmers using smart AI agriculture'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex p-1 rounded-xl bg-emerald-950/80 border border-emerald-500/20">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'login' ? 'bg-emerald-500 text-emerald-950 shadow-md' : 'text-emerald-300 hover:text-emerald-100'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'signup' ? 'bg-emerald-500 text-emerald-950 shadow-md' : 'text-emerald-300 hover:text-emerald-100'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-emerald-200 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-emerald-400/60 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Gurpreet Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>
          )}

          {!otpLogin ? (
            <div>
              <label className="text-xs font-semibold text-emerald-200 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-emerald-400/60 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-emerald-200 block mb-1">Phone Number (OTP Verification)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-emerald-400/60 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-emerald-200 block mb-1">State / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Punjab"
                    value={stateRegion}
                    onChange={(e) => setStateRegion(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-emerald-200 block mb-1">Primary Crop</label>
                  <input
                    type="text"
                    placeholder="e.g. Wheat & Rice"
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-emerald-200 block mb-1">Preferred Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </>
          )}


          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-emerald-200">Password</label>
              {mode === 'login' && (
                <button type="button" className="text-[11px] text-emerald-400 hover:underline">
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-400/60 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-emerald-500 bg-emerald-950 text-emerald-500 focus:ring-0" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setOtpLogin(!otpLogin)}
                className="text-teal-300 hover:underline font-semibold"
              >
                {otpLogin ? 'Use Email' : 'Login via OTP'}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 text-emerald-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all"
          >
            {mode === 'login' ? 'Login to Platform' : 'Create Free Account'}
          </button>
        </form>

        {/* Social Auth Separator */}
        <div className="relative flex items-center justify-center border-t border-emerald-800/40 pt-4">
          <span className="bg-emerald-950 px-3 text-[10px] text-emerald-400 uppercase tracking-widest absolute">
            Or Continue With
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2.5 rounded-xl bg-emerald-900/40 border border-emerald-500/30 text-emerald-200 text-xs font-semibold hover:bg-emerald-800/50 transition-colors flex items-center justify-center gap-2"
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Quick Google One-Tap Login</span>
        </button>

      </div>
    </div>
  );
};
