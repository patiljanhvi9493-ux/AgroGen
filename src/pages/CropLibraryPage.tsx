import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Award, 
  X, 
  ChevronRight
} from 'lucide-react';
import { MOCK_CROPS } from '../data/mockData';
import type { CropInfo } from '../data/mockData';

export const CropLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCropDetail, setActiveCropDetail] = useState<CropInfo | null>(null);


  const categories = ['All', 'Cereals', 'Vegetables', 'Fiber Crops', 'Cash Crops', 'Tubers'];

  const filteredCrops = MOCK_CROPS.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.overview.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Comprehensive Agronomic Encyclopedia</span>
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-100">Crop Library</h1>
        <p className="text-xs text-emerald-300/70">
          Discover optimal soil, weather, irrigation, pest management, and market pricing for major agricultural crops.
        </p>
      </div>

      {/* Search & Category Bar */}
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-emerald-400/60 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search crop by name (e.g. Rice, Tomato, Wheat)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-100 text-sm focus:outline-none focus:border-emerald-400 transition-colors shadow-lg"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => setActiveCropDetail(crop)}
            className="glass-card rounded-3xl overflow-hidden cursor-pointer group border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                {crop.category}
              </span>
              <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-emerald-950 shadow">
                {crop.marketPrice}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-emerald-100 group-hover:text-emerald-300 transition-colors">
                  {crop.name}
                </h3>
                <p className="text-xs text-emerald-100/70 line-clamp-2 mt-1">
                  {crop.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-900/40 grid grid-cols-2 gap-2 text-[11px] text-emerald-300/80">
                <span>Temp: {crop.idealClimate.temp}</span>
                <span>Harvest: {crop.harvestTime}</span>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold hover:bg-emerald-800/80 transition-colors flex items-center justify-center gap-2">
                <span>View Full Agronomic Blueprint</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Crop Full Detail Modal */}
      {activeCropDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl glass-panel rounded-3xl border border-emerald-500/40 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveCropDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800/80"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Hero Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img src={activeCropDetail.image} alt={activeCropDetail.name} className="w-24 h-24 rounded-2xl object-cover border border-emerald-400/40" />
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {activeCropDetail.category}
                </span>
                <h2 className="text-2xl font-black text-emerald-100">{activeCropDetail.name}</h2>
                <span className="text-xs text-emerald-300/80 block mt-1">Current Market Price: <strong className="text-emerald-300 font-extrabold">{activeCropDetail.marketPrice}</strong></span>
              </div>
            </div>

            {/* Climate & Soil Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Ideal Climate</span>
                <p className="text-xs text-emerald-100 font-semibold">{activeCropDetail.idealClimate.temp}</p>
                <span className="text-[10px] text-emerald-300/70 block">Humidity: {activeCropDetail.idealClimate.humidity}</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Soil & pH</span>
                <p className="text-xs text-emerald-100 font-semibold">{activeCropDetail.soil.type}</p>
                <span className="text-[10px] text-emerald-300/70 block">pH Range: {activeCropDetail.soil.ph}</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Water Requirement</span>
                <p className="text-xs text-emerald-100 font-semibold">{activeCropDetail.water.frequency}</p>
                <span className="text-[10px] text-emerald-300/70 block">{activeCropDetail.water.requirement}</span>
              </div>
            </div>

            {/* Overview & Nutrients */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-emerald-200">Overview</h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">{activeCropDetail.overview}</p>

              <h4 className="text-sm font-bold text-emerald-200 pt-2">Nutrient & NPK Schedule</h4>
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-xs text-emerald-100">
                {activeCropDetail.nutrients}
              </div>
            </div>

            {/* Applicable Government Schemes */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-emerald-200">Government Subsidies & Schemes</h4>
              <div className="space-y-1.5">
                {activeCropDetail.governmentSchemes.map((sch, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-teal-950/60 border border-teal-500/30 text-xs text-teal-200 flex items-center gap-2">
                    <Award className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{sch}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
