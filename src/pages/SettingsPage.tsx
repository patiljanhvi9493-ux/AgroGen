import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Key, 
  Save,
  Cpu
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [modelChoice, setModelChoice] = useState('agrogen-vision-v2');
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [diseaseAlerts, setDiseaseAlerts] = useState(true);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('agrogen_apiKey') || '';
    const savedModel = localStorage.getItem('agrogen_modelChoice') || 'agrogen-vision-v2';
    setApiKey(savedKey);
    setModelChoice(savedModel);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('agrogen_apiKey', apiKey);
    localStorage.setItem('agrogen_modelChoice', modelChoice);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };


  return (
    <div className="space-y-8 py-4 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-emerald-400" />
          <span>Platform Settings</span>
        </h1>
        <p className="text-xs text-emerald-300/70 mt-1">
          Customize AI models, API keys, notifications, and visual themes.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* AI & Vision Engine Settings */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
          <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>AI Model & API Configuration</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-emerald-200 block mb-1">Active Diagnostic AI Model</label>
              <select
                value={modelChoice}
                onChange={(e) => setModelChoice(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-emerald-900/40 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none"
              >
                <option value="agrogen-vision-v2">AgroGen Local Vision Engine (Simulated Fallback)</option>
                <option value="gemini-2.5-flash">Google Gemini 2.5 Flash API (Recommended - Fast & Free tier)</option>
                <option value="gemini-1.5-flash">Google Gemini 1.5 Flash API (Stable - Free tier)</option>
                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro API (High Accuracy)</option>
                <option value="gpt-4o">OpenAI GPT-4o API (Requires API Key)</option>
                <option value="gpt-4o-mini">OpenAI GPT-4o-Mini API (Fast & Low Cost)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-emerald-200 block mb-1">Custom API Key (Optional)</label>
              <div className="relative">
                <Key className="w-4 h-4 text-emerald-400/60 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="AI Key (AI Studio / OpenAI key)..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-100 text-xs focus:outline-none font-mono"
                />
              </div>
              <span className="text-[10px] text-emerald-300/70 mt-2 block leading-relaxed">
                Leave blank to use the built-in simulated engine. For real-time analysis, retrieve a free API Key from{' '}
                <a 
                  href="https://aistudio.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold"
                >
                  Google AI Studio
                </a>{' '}
                or your{' '}
                <a 
                  href="https://platform.openai.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold"
                >
                  OpenAI Platform
                </a>.
              </span>
            </div>
          </div>
        </div>

        {/* Notifications & Theme */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
          <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Notification Preferences</span>
          </h3>

          <div className="space-y-3 text-xs text-emerald-100">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 cursor-pointer">
              <span>Hyper-Local Weather Risk Alerts</span>
              <input
                type="checkbox"
                checked={weatherAlerts}
                onChange={(e) => setWeatherAlerts(e.target.checked)}
                className="rounded text-emerald-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 cursor-pointer">
              <span>Disease Outbreak Warnings in Region</span>
              <input
                type="checkbox"
                checked={diseaseAlerts}
                onChange={(e) => setDiseaseAlerts(e.target.checked)}
                className="rounded text-emerald-500 focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>

          {savedMsg && (
            <span className="text-xs text-emerald-300 font-bold animate-fadeIn">
              ✓ Settings saved successfully!
            </span>
          )}
        </div>

      </form>

    </div>
  );
};
