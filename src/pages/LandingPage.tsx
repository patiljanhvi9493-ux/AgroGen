import React, { useState } from 'react';
import { 
  Scan, 
  Bot, 
  CloudSun, 
  Sprout, 
  UserCheck, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  Star, 
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';


export const LandingPage: React.FC = () => {
  const { setActiveTab, setAuthModalOpen } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { label: 'Diseases Identified', value: '250,000+' },
    { label: 'Farmers Using Platform', value: '85,000+' },
    { label: 'AI Accuracy', value: '98.7%' },
    { label: 'Expert Doctors', value: '500+' }
  ];

  const features = [
    {
      title: 'AI Disease Detection',
      desc: 'Scan leaf photos instantly using vision AI to diagnose fungal, bacterial, and pest infections in seconds.',
      icon: Scan,
      color: 'from-emerald-500 to-green-600',
      action: 'detection' as const
    },
    {
      title: 'Pest & Bug Identification',
      desc: 'Detect aphids, bollworms, and armyworms with detailed organic and chemical spraying instructions.',
      icon: Sprout,
      color: 'from-teal-500 to-emerald-600',
      action: 'detection' as const
    },
    {
      title: '24/7 Multi-Modal AI Chatbot',
      desc: 'Ask questions in English, Hindi, Punjabi, or Spanish via Voice, Text, or PDF document uploads.',
      icon: Bot,
      color: 'from-cyan-500 to-teal-600',
      action: 'chatbot' as const
    },
    {
      title: 'Hyper-Local Weather Alerts',
      desc: 'Real-time rainfall, humidity, and frost risk notifications tailored directly to your farm location.',
      icon: CloudSun,
      color: 'from-amber-500 to-yellow-600',
      action: 'weather' as const
    },
    {
      title: 'Precision Fertilizer Guide',
      desc: 'Custom NPK ratios, bio-stimulants, and soil nutrient schedules to maximize crop yield.',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-700',
      action: 'crops' as const
    },
    {
      title: 'Expert Consultation',
      desc: 'Connect via 1-on-1 video call or voice consultation with certified agronomists and plant pathologists.',
      icon: UserCheck,
      color: 'from-teal-600 to-cyan-700',
      action: 'consultation' as const
    }
  ];

  const testimonials = [
    {
      name: 'Gurpreet Singh',
      location: 'Ludhiana, Punjab',
      crop: 'Wheat & Rice Farmer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      review: 'AgroGen saved my wheat crop from Yellow Rust! The AI scanner identified the spores in 3 seconds and gave me exact fungicide dosages before the rust spread.'
    },
    {
      name: 'Ananya Sharma',
      location: 'Nashik, Maharashtra',
      crop: 'Grape & Tomato Grower',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
      review: 'The voice AI chatbot is amazing! I can ask questions in my native language while working in the field and get organic bio-pesticide recipes instantly.'
    },
    {
      name: 'Carlos Rodriguez',
      location: 'Central Valley, California',
      crop: 'Strawberry & Vegetable Producer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
      review: 'The downloadable PDF diagnostic reports helped me get instant approval for crop insurance. The expert consultation video call was super helpful!'
    }
  ];

  const faqs = [
    {
      q: 'How does the AI disease scanner work?',
      a: 'Simply snap or upload a photo of your affected plant leaf, fruit, or stem. Our deep learning vision AI model analyzes leaf discoloration, spot geometry, and texture patterns to match against a database of over 500+ plant diseases in under 3 seconds.'
    },
    {
      q: 'Is AgroGen free for small-scale farmers?',
      a: 'Yes! Basic disease scanning, AI chatbot access, crop library references, and weather forecasting are completely free for all farmers.'
    },
    {
      q: 'What languages does the AI Chatbot support?',
      a: 'AgroGen supports English, Hindi, Punjabi, Spanish, French, and multiple regional dialects via text and voice input/output.'
    },
    {
      q: 'Can I download the diagnostic reports to share with agronomists or insurance providers?',
      a: 'Absolutely! Every scan generates a comprehensive PDF report including disease severity, treatment schedules, recommended products, and verified expert signatures.'
    }
  ];

  return (
    <div className="space-y-16 py-6 pb-20">

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-12 lg:p-16 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/90 via-emerald-900/40 to-teal-950/90 text-center">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold shadow-lg">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Next-Generation AI Smart Farming Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-emerald-100 tracking-tight leading-tight">
            AI Powered <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300 bg-clip-text text-transparent glow-text">
              Smart Farming Assistant
            </span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Detect diseases instantly, identify destructive pests, receive 24/7 AI guidance, and protect your crops with precision organic and chemical remedies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('detection')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 text-emerald-950 font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/30 hover:scale-105 hover:brightness-110 transition-all flex items-center justify-center gap-3 group"
            >
              <Scan className="w-5 h-5 text-emerald-950 group-hover:rotate-12 transition-transform" />
              <span>Detect Disease Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 font-bold text-sm sm:text-base hover:bg-emerald-800/80 transition-all flex items-center justify-center gap-3"
            >
              <Bot className="w-5 h-5 text-emerald-400" />
              <span>Talk to AgroGen AI</span>
            </button>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-emerald-500/20 mt-12">
            {stats.map((st, i) => (
              <div key={i} className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-black text-emerald-300 block">{st.value}</span>
                <span className="text-xs font-medium text-emerald-200/70">{st.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Features Grid Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-emerald-100">Engineered for Maximum Crop Health</h2>
          <p className="text-sm text-emerald-300/70">Everything you need to manage your farm from seed to harvest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveTab(feat.action)}
                className="glass-card p-6 rounded-3xl space-y-4 cursor-pointer group hover:border-emerald-400/50 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-emerald-300" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-emerald-100 group-hover:text-emerald-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-emerald-100/70 leading-relaxed">
                  {feat.desc}
                </p>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform pt-2">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-emerald-100">Trusted by Farmers Worldwide</h2>
          <p className="text-sm text-emerald-300/70">Real stories from agricultural communities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl space-y-4 border border-emerald-500/20 relative">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs text-emerald-100/80 italic leading-relaxed">
                "{t.review}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-emerald-800/40">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-emerald-400/40" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-100">{t.name}</h4>
                  <span className="text-[10px] text-emerald-400/80">{t.crop} • {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-emerald-100">Frequently Asked Questions</h2>
          <p className="text-sm text-emerald-300/70">Quick answers to common questions about AgroGen.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-emerald-500/20 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-emerald-100 font-semibold text-sm hover:text-emerald-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-emerald-100/70 leading-relaxed border-t border-emerald-900/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 border-t border-emerald-500/20 space-y-8 text-xs text-emerald-300/70">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-lg">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>AgroGen AI</span>
            </div>
            <p className="text-emerald-100/60 leading-relaxed">
              Empowering global farmers with AI-driven plant diagnostics, precision nutrition, and real-time expert guidance.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-emerald-200 uppercase tracking-wider block">Quick Links</span>
            <ul className="space-y-1">
              <li><button onClick={() => setActiveTab('detection')} className="hover:text-emerald-300">Disease Scanner</button></li>
              <li><button onClick={() => setActiveTab('crops')} className="hover:text-emerald-300">Crop Library</button></li>
              <li><button onClick={() => setActiveTab('weather')} className="hover:text-emerald-300">Weather Forecast</button></li>
              <li><button onClick={() => setActiveTab('marketplace')} className="hover:text-emerald-300">Agri Marketplace</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-emerald-200 uppercase tracking-wider block">Support & Legal</span>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-emerald-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-300">Farmer Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-300">Expert Enrollment</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-emerald-200 uppercase tracking-wider block">Get Started</span>
            <p className="text-emerald-100/60">Create an account or login to access full report history and consultation booking.</p>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-emerald-500/20"
            >
              Sign Up Free
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 AgroGen AI Technologies. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-300">Twitter</a>
            <a href="#" className="hover:text-emerald-300">YouTube</a>
            <a href="#" className="hover:text-emerald-300">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
