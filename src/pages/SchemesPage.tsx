import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  BookOpen, 
  CheckCircle, 
  HelpCircle,
  FileText,
  ExternalLink
} from 'lucide-react';

interface Scheme {
  id: string;
  title: string;
  category: 'Subsidies' | 'Loans & Insurance' | 'Direct Benefits';
  description: string;
  subsidyRate: string;
  eligibility: string;
  documents: string[];
  department: string;
}

export const SchemesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [appliedSchemes, setAppliedSchemes] = useState<string[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const schemes: Scheme[] = [
    {
      id: '1',
      title: 'PM Kisan Samman Nidhi Yojana',
      category: 'Direct Benefits',
      description: 'Provides direct income support of $75 (Rs 6,000) per year in three equal installments to all landholding farmer families.',
      subsidyRate: '100% Direct Benefit Transfer',
      eligibility: 'All small and marginal landholding farmer families.',
      documents: ['Land ownership papers', 'Identity proof (Aadhar)', 'Bank account details'],
      department: 'Ministry of Agriculture and Farmers Welfare'
    },
    {
      id: '2',
      title: 'Agricultural Mechanization & Tractor Subsidy Scheme',
      category: 'Subsidies',
      description: 'Get subsidy assistance for purchasing modern tractors, rotavators, power tillers, and laser land levelers to automate farm operations.',
      subsidyRate: '40% - 50% capital subsidy assistance',
      eligibility: 'Farmers with registered agricultural land, especially women and minority cooperatives.',
      documents: ['Land Title Deed', 'Quotations from approved vendor', 'Aadhar card copy', 'Bank passbook'],
      department: 'Department of Agriculture, Cooperation & Farmers Welfare'
    },
    {
      id: '3',
      title: 'PM Fasal Bima Yojana (Crop Insurance)',
      category: 'Loans & Insurance',
      description: 'Comprehensive yield insurance coverage against non-preventable natural risks (drought, flood, pests, storms) from pre-sowing to post-harvest.',
      subsidyRate: 'Premium capped at 1.5% - 2% (rem Balance subsidized by Gov)',
      eligibility: 'All farmers growing notified crops in notified areas, including sharecroppers.',
      documents: ['Sowing certificate', 'Land possession proof / lease agreement', 'Crop identification report'],
      department: 'National Insurance & Agriculture Ministries'
    },
    {
      id: '4',
      title: 'Solar Water Pump Subsidy (PM-KUSUM)',
      category: 'Subsidies',
      description: 'Install grid-independent solar irrigation pumps of 3HP to 7.5HP with massive government subsidy support, reducing diesel dependency.',
      subsidyRate: '60% government subsidy (state + central)',
      eligibility: 'Farmers, panchayats, and cooperatives having water sources or dug wells.',
      documents: ['Water table certificate', 'Electricity bill (if any)', 'Land documents', 'Aadhar card'],
      department: 'Ministry of New and Renewable Energy'
    },
    {
      id: '5',
      title: 'Organic Farming Promotion & Subsidy Scheme',
      category: 'Direct Benefits',
      description: 'Financial incentives for transitioning fields to certified organic farming, covering vermicompost setups, green manures, and organic branding.',
      subsidyRate: 'Up to $400 (Rs 31,000) per hectare support',
      eligibility: 'Farmers transitioning to organic certification or members of cluster farming groups.',
      documents: ['Soil health card', 'Cluster membership verification', 'Organic pledge document'],
      department: 'National Mission for Sustainable Agriculture'
    }
  ];

  const handleApply = (id: string, title: string) => {
    if (appliedSchemes.includes(id)) return;
    setAppliedSchemes(prev => [...prev, id]);
    // Trigger canvas confetti if loaded
    const win = window as any;
    if (typeof win.confetti === 'function') {
      win.confetti({ particleCount: 60, spread: 50 });
    }
    alert(`Application submitted successfully for: ${title}! Our cooperative representative will contact you for document verification within 3 business days.`);
  };

  const filteredSchemes = schemes.filter(sch => {
    const matchesSearch = sch.title.toLowerCase().includes(search.toLowerCase()) || 
                          sch.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || sch.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 py-4 pb-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
          <Award className="w-8 h-8 text-emerald-400" />
          <span>Government Schemes & Farming Subsidies</span>
        </h1>
        <p className="text-xs text-emerald-300/70 mt-1">
          Search and apply for active subsidies, crop insurance programs, solar installations, and direct benefit income transfers.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/20">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-400/60" />
          <input
            type="text"
            placeholder="Search schemes by name or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-emerald-950 border border-emerald-500/30 rounded-xl text-xs text-emerald-100 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Subsidies', 'Loans & Insurance', 'Direct Benefits'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-emerald-950 shadow'
                  : 'bg-emerald-900/40 text-emerald-300 hover:bg-emerald-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((sch) => {
          const isApplied = appliedSchemes.includes(sch.id);
          return (
            <div 
              key={sch.id}
              className="glass-panel p-6 rounded-3xl border border-emerald-500/20 flex flex-col justify-between hover:border-emerald-400/40 transition-all space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {sch.category}
                  </span>
                  <span className="text-[10px] text-emerald-400/60">{sch.department}</span>
                </div>
                <h3 className="text-base font-bold text-emerald-100">{sch.title}</h3>
                <p className="text-xs text-emerald-200/70 leading-relaxed line-clamp-3">{sch.description}</p>
              </div>

              <div className="pt-3 border-t border-emerald-900/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-300/80">Government Support:</span>
                  <strong className="text-emerald-300 font-extrabold">{sch.subsidyRate}</strong>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedScheme(sch)}
                    className="flex-1 py-2 rounded-xl bg-emerald-900/50 border border-emerald-500/30 text-emerald-200 hover:bg-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Eligibility</span>
                  </button>

                  <button
                    onClick={() => handleApply(sch.id, sch.title)}
                    disabled={isApplied}
                    className={`flex-1 py-2 rounded-xl text-xs font-extrabold shadow-md flex items-center justify-center gap-1.5 transition-all ${
                      isApplied 
                        ? 'bg-emerald-950 border border-emerald-500/20 text-emerald-500 cursor-default'
                        : 'bg-emerald-500 text-emerald-950 hover:brightness-110'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Apply Online</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredSchemes.length === 0 && (
          <div className="md:col-span-2 py-16 text-center text-emerald-300/50 space-y-2">
            <HelpCircle className="w-12 h-12 text-emerald-500/40 mx-auto" />
            <p className="text-sm font-bold">No schemes match your active filter.</p>
            <p className="text-xs">Try clearing search terms or modifying category selections.</p>
          </div>
        )}
      </div>

      {/* Details / Eligibility Overlay Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg glass-panel rounded-3xl border border-emerald-500/40 p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setSelectedScheme(null)}
              className="absolute top-5 right-5 text-emerald-300 hover:text-rose-400 font-bold"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {selectedScheme.category}
              </span>
              <h3 className="text-lg font-bold text-emerald-100 pt-1">{selectedScheme.title}</h3>
              <p className="text-xs text-emerald-400/80">{selectedScheme.department}</p>
            </div>

            <div className="space-y-3.5 text-xs border-t border-emerald-800/40 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-300 uppercase block">Who is Eligible?</span>
                <p className="text-emerald-100/80">{selectedScheme.eligibility}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-300 uppercase block">Government Subsidy / Benefits</span>
                <p className="text-emerald-100/80 font-bold">{selectedScheme.subsidyRate}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-300 uppercase block flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Required Documents:</span>
                </span>
                <ul className="list-disc pl-5 text-emerald-100/80 space-y-1">
                  {selectedScheme.documents.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setSelectedScheme(null)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-900/60 text-emerald-300 text-xs font-bold"
              >
                Close Details
              </button>
              <button 
                onClick={() => {
                  const id = selectedScheme.id;
                  setSelectedScheme(null);
                  handleApply(id, selectedScheme.title);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 text-xs font-black shadow-lg"
              >
                Apply for Subsidy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
