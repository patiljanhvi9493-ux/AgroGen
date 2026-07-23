import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Sparkles
} from 'lucide-react';

export const PlannerPage: React.FC = () => {
  // Soil test state
  const [ph, setPh] = useState('6.2');
  const [nitrogen, setNitrogen] = useState('low');
  const [phosphorus, setPhosphorus] = useState('medium');
  const [potassium, setPotassium] = useState('medium');
  const [soilType, setSoilType] = useState('Loamy');
  
  // Crop state for irrigation
  const [targetCrop, setTargetCrop] = useState('Tomato');
  const [weatherCondition, setWeatherCondition] = useState('Warm');
  
  // Soil recommendation trigger
  const [showAnalysis, setShowAnalysis] = useState(true);

  // Recommendations mapping
  const getFertilizerRecs = () => {
    const organic: string[] = [];
    const chemical: string[] = [];
    const concerns: string[] = [];

    if (nitrogen === 'low') {
      organic.push('Apply well-decomposed poultry manure or blood meal (high nitrogen).');
      organic.push('Sow leguminous cover crops (peas, clover) to naturally fix atmospheric nitrogen.');
      chemical.push('Side-dress with Urea (46-0-0) at 35kg/acre or ammonium nitrate spray.');
      concerns.push('Low Nitrogen causes chlorosis (leaf yellowing) and stunting of growth.');
    }
    if (phosphorus === 'low') {
      organic.push('Apply steamed bone meal or soft rock phosphate to the root zone.');
      chemical.push('Apply Di-Ammonium Phosphate (DAP 18-46-0) during seedling transplanting.');
      concerns.push('Low Phosphorus limits root development, flowering, and fruit setting.');
    } else {
      organic.push('Maintain balanced phosphorus with regular compost mulching.');
    }
    if (potassium === 'low') {
      organic.push('Apply sulfate of potash, greensand, or wood ash (potassium carbonate).');
      chemical.push('Apply Muriate of Potash (MOP 0-0-60) at 20kg/acre.');
      concerns.push('Low Potassium reduces plant water regulation and leaves it susceptible to frost and pathogens.');
    } else {
      organic.push('Apply organic seaweed liquid extract foliar spray to boost cell wall strength.');
    }

    const phVal = parseFloat(ph);
    if (phVal < 6.0) {
      organic.push('Acidic soil detected. Apply agricultural lime (calcium carbonate) or dolomite to raise pH.');
      concerns.push(`Highly acidic pH (${ph}) limits availability of phosphorus, calcium, and magnesium.`);
    } else if (phVal > 7.2) {
      organic.push('Alkaline soil detected. Apply agricultural sulfur or organic peat moss to lower soil pH.');
      concerns.push(`Alkaline pH (${ph}) locks out micronutrients like Iron, Manganese, and Zinc.`);
    } else {
      organic.push('Soil pH is in the optimal range (6.0 - 7.0) for nutrient uptake.');
    }

    return { organic, chemical, concerns };
  };

  const getIrrigationPlan = () => {
    let interval = 4; // days
    let volume = 3.0; // liters per plant per day
    let method = 'Drip Irrigation (Recommended)';
    
    if (soilType === 'Sandy') {
      interval = 2; // Sandy soils drain fast, water more frequently
      volume = 2.5;
    } else if (soilType === 'Clayey') {
      interval = 6; // Clayey soils retain water longer
      volume = 4.0;
    }

    if (weatherCondition === 'Hot') {
      interval = Math.max(1, interval - 1);
      volume *= 1.35;
    } else if (weatherCondition === 'Cool') {
      interval += 2;
      volume *= 0.75;
    }

    if (targetCrop === 'Rice') {
      method = 'Controlled Flood Basin Irrigation';
      return {
        method,
        frequency: 'Continuous standing water (keep 2-5cm level)',
        amount: '1200 - 1500 mm seasonal requirement',
        warning: 'Drain fields completely 10 days before harvest to accelerate ripening.'
      };
    }

    return {
      method,
      frequency: `Every ${interval} days (adjust for rain)`,
      amount: `${volume.toFixed(1)} liters per plant daily`,
      warning: 'Water early in the morning. Avoid overhead spraying to reduce leaf mold risk.'
    };
  };

  const getCropRecommendation = () => {
    const phVal = parseFloat(ph);
    if (phVal < 5.8) {
      return ['Potatoes', 'Blueberries', 'Sweet Potatoes', 'Oats'];
    } else if (phVal > 7.0) {
      return ['Sugar Beet', 'Cabbage', 'Barley', 'Spinach'];
    }
    return ['Tomato', 'Wheat', 'Rice (Paddy)', 'Cotton', 'Maize (Corn)', 'Soybeans'];
  };

  const fert = getFertilizerRecs();
  const irr = getIrrigationPlan();
  const cropRecs = getCropRecommendation();

  return (
    <div className="space-y-8 py-4 pb-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
          <FlaskConical className="w-8 h-8 text-emerald-400" />
          <span>Precision Soil & Crop Planner</span>
        </h1>
        <p className="text-xs text-emerald-300/70 mt-1">
          Input soil metrics, calculate fertilizer dosages, design irrigation schedules, and fetch AI crop suitability lists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Soil Metrics Input Form */}
        <div className="lg:col-span-1 glass-panel p-5 rounded-3xl border border-emerald-500/20 space-y-4">
          <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>Soil Test Analysis Form</span>
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="text-[10px] font-bold text-emerald-300 block mb-1">Measured Soil pH (4.0 - 9.0)</label>
              <input
                type="number"
                min="4.0"
                max="9.0"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-emerald-300 block mb-1">Nitrogen (N) Content</label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map(level => (
                  <button
                    key={level}
                    onClick={() => setNitrogen(level)}
                    className={`py-1.5 rounded-lg font-bold border capitalize transition-all ${
                      nitrogen === level
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-emerald-950/40 border-emerald-500/10 text-emerald-100/60 hover:border-emerald-500/30'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-emerald-300 block mb-1">Phosphorus (P) Content</label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map(level => (
                  <button
                    key={level}
                    onClick={() => setPhosphorus(level)}
                    className={`py-1.5 rounded-lg font-bold border capitalize transition-all ${
                      phosphorus === level
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-emerald-950/40 border-emerald-500/10 text-emerald-100/60 hover:border-emerald-500/30'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-emerald-300 block mb-1">Potassium (K) Content</label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map(level => (
                  <button
                    key={level}
                    onClick={() => setPotassium(level)}
                    className={`py-1.5 rounded-lg font-bold border capitalize transition-all ${
                      potassium === level
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-emerald-950/40 border-emerald-500/10 text-emerald-100/60 hover:border-emerald-500/30'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-emerald-300 block mb-1">Soil Type / Texture</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
              >
                <option value="Sandy">Sandy Soil (High drainage, low retention)</option>
                <option value="Loamy">Loamy Soil (Balanced, rich organic matter)</option>
                <option value="Clayey">Clayey Soil (Low drainage, high retention)</option>
              </select>
            </div>

            <div>
              <button
                onClick={() => setShowAnalysis(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-bold shadow-md hover:brightness-110"
              >
                Analyze Soil & Update Planner
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis, Recommendations & Planner */}
        <div className="lg:col-span-2 space-y-6">
          
          {showAnalysis && (
            <>
              {/* Nutrient Dashboard */}
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
                  <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>AI Nutrient Diagnostics & Remedies</span>
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Soil pH: {ph}
                  </span>
                </div>

                {fert.concerns.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Soil Health Concerns Identified:</span>
                    </h4>
                    <ul className="list-disc pl-5 text-[11px] text-emerald-100/80 space-y-1">
                      {fert.concerns.map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Organic remedies */}
                  <div className="p-4 rounded-2xl bg-emerald-900/10 border border-emerald-500/20 space-y-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Organic Solutions
                    </span>
                    <ul className="text-xs text-emerald-100/90 space-y-1.5 pt-1">
                      {fert.organic.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chemical remedies */}
                  <div className="p-4 rounded-2xl bg-emerald-900/10 border border-amber-500/20 space-y-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Targeted Fertilizers
                    </span>
                    <ul className="text-xs text-emerald-100/90 space-y-1.5 pt-1">
                      {fert.chemical.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Crop & Irrigation Planner */}
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/40 pb-3">
                  <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-emerald-400" />
                    <span>Irrigation & Watering Schedule</span>
                  </h3>
                  
                  {/* Selectors */}
                  <div className="flex items-center gap-2 text-xs">
                    <select
                      value={targetCrop}
                      onChange={(e) => setTargetCrop(e.target.value)}
                      className="px-2 py-1 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-200 text-[10px]"
                    >
                      <option value="Tomato">Tomato</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Rice">Rice (Paddy)</option>
                      <option value="Cotton">Cotton</option>
                    </select>

                    <select
                      value={weatherCondition}
                      onChange={(e) => setWeatherCondition(e.target.value)}
                      className="px-2 py-1 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-200 text-[10px]"
                    >
                      <option value="Cool">Cool (15-20°C)</option>
                      <option value="Warm">Warm (21-28°C)</option>
                      <option value="Hot">Hot (&gt;30°C)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/10">
                    <span className="text-[10px] text-emerald-400 block uppercase font-semibold">Delivery Method</span>
                    <span className="text-xs font-bold text-emerald-100 block mt-1">{irr.method}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/10">
                    <span className="text-[10px] text-emerald-400 block uppercase font-semibold">Irrigation Frequency</span>
                    <span className="text-xs font-bold text-emerald-100 block mt-1">{irr.frequency}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/10">
                    <span className="text-[10px] text-emerald-400 block uppercase font-semibold">Target Water Rate</span>
                    <span className="text-xs font-bold text-emerald-100 block mt-1">{irr.amount}</span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-300/70 leading-relaxed italic">
                  * Note: {irr.warning}
                </p>
              </div>

              {/* AI Crop Recommendation List */}
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4 animate-fadeIn">
                <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <span>AI Crop Suitability Recommendations</span>
                </h3>

                <p className="text-xs text-emerald-100/70 leading-relaxed">
                  Based on soil pH ({ph}) and soil composition ({soilType}), the following crops will yield optimal productivity:
                </p>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {cropRecs.map((c, i) => (
                    <span 
                      key={i} 
                      className="px-3.5 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-xs font-extrabold text-emerald-300 flex items-center gap-1.5 shadow"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      <span>{c}</span>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};
