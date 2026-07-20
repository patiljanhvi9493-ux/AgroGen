import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Share2, 
  Download, 
  ShieldCheck, 
  UserCheck, 
  Activity, 
  Info,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzePlantImage, generateReportPDF } from '../services/aiEngine';
import type { DiseaseInfo } from '../data/mockData';
import { MOCK_EXPERTS, MOCK_PRODUCTS } from '../data/mockData';


export const DiseaseDetectionPage: React.FC = () => {
  const { addReport, user, addToCart, setActiveTab } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [_imageName, setImageName] = useState<string>('');

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepText, setScanStepText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<DiseaseInfo | null>(null);
  
  // Camera Modal state
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const sampleLeafs = [
    { title: 'Tomato Blight Leaf', img: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?w=400&q=80', file: 'tomato_blight.jpg' },
    { title: 'Paddy Rice Blast Leaf', img: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=400&q=80', file: 'rice_blast.jpg' },
    { title: 'Wheat Rust Leaf', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80', file: 'wheat_rust.jpg' },
    { title: 'Corn Nutrient Deficiency', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', file: 'corn_yellow.jpg' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setSelectedImage(url);
        runAiScan(url, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleClick = (sample: typeof sampleLeafs[0]) => {
    setSelectedImage(sample.img);
    setImageName(sample.file);
    runAiScan(sample.img, sample.file);
  };

  const runAiScan = async (imgUrl: string, name: string) => {
    setIsScanning(true);
    setAnalysisResult(null);

    setScanStepText('Uploading leaf image to AgroGen Vision Engine...');
    await new Promise((r) => setTimeout(r, 600));

    setScanStepText('Analyzing leaf discoloration & cellular lesion patterns...');
    await new Promise((r) => setTimeout(r, 800));

    setScanStepText('Matching against 500+ crop pathogen signatures...');
    await new Promise((r) => setTimeout(r, 700));

    const result = await analyzePlantImage(imgUrl, name);
    setAnalysisResult(result);
    addReport(result);
    setIsScanning(false);
  };

  // Camera stream capture
  const startCamera = async () => {
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access denied or not supported on this device.');
      setCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');

      // Stop camera stream
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach((t) => t.stop());

      setCameraOpen(false);
      setSelectedImage(dataUrl);
      setImageName('camera_snapshot.jpg');
      runAiScan(dataUrl, 'camera_snapshot.jpg');
    }
  };

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Page Title Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real-time AI Vision Pathology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-100">
          Plant Disease Diagnostics
        </h1>
        <p className="text-xs sm:text-sm text-emerald-300/70">
          Upload leaf photos, take live camera snapshots, or test sample crops for instant 99% accurate disease identification.
        </p>
      </div>

      {/* Main Upload Box & Scanner Area */}
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 text-center space-y-6">
          
          {selectedImage ? (
            <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl bg-emerald-950">
              <img src={selectedImage} alt="Plant scan sample" className="w-full h-64 object-cover" />

              {/* Laser Scan FX overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center space-y-4">
                  <div className="animate-laser-scan" />
                  <div className="px-4 py-2 rounded-xl bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-xs font-bold shadow-xl flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span>{scanStepText}</span>
                  </div>
                </div>
              )}

              {!isScanning && (
                <button
                  onClick={() => { setSelectedImage(null); setAnalysisResult(null); }}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 text-emerald-300 hover:bg-black/80 text-xs font-bold transition-colors"
                >
                  Change Photo
                </button>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400/80 rounded-3xl p-8 sm:p-12 transition-all space-y-4 bg-emerald-950/30">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400">
                <Upload className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-emerald-100">Drag & Drop Plant Leaf Photo</h3>
                <p className="text-xs text-emerald-300/60">Supports PNG, JPG, JPEG, HEIC files (Max 25MB)</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-emerald-500/20">
                  <span>Browse Image</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  onClick={startCamera}
                  className="px-5 py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 font-bold text-xs hover:bg-emerald-800/80 transition-colors flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Take Live Photo</span>
                </button>
              </div>
            </div>
          )}

          {/* Sample Photos Grid for quick testing */}
          {!selectedImage && (
            <div className="pt-4 border-t border-emerald-900/40 space-y-3">
              <span className="text-xs font-semibold text-emerald-300/70 block uppercase tracking-wider">
                Or Test with Demo Leaf Samples:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sampleLeafs.map((sample, i) => (
                  <div
                    key={i}
                    onClick={() => handleSampleClick(sample)}
                    className="p-2 rounded-xl bg-emerald-900/30 border border-emerald-500/20 hover:border-emerald-400 cursor-pointer text-left space-y-2 group transition-all"
                  >
                    <img src={sample.img} alt={sample.title} className="w-full h-20 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                    <span className="text-[11px] font-bold text-emerald-200 block truncate">{sample.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Live Camera Snapshot Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel rounded-3xl border border-emerald-500/40 p-6 space-y-4 text-center">
            <h3 className="text-lg font-bold text-emerald-100">Live Camera Leaf Capture</h3>
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-black">
              <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCameraOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-900/60 text-emerald-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20"
              >
                Capture Snapshot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diagnosis Results Card */}
      {analysisResult && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
          
          {/* Header Diagnostic Banner */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950 via-emerald-900/50 to-teal-950 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/40 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {analysisResult.category} Infection
                </span>
                <h2 className="text-2xl font-black text-emerald-100 mt-1">{analysisResult.name}</h2>
                <span className="text-xs text-emerald-300/80">Crop: {analysisResult.crop}</span>
              </div>

              {/* Action Downloads */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateReportPDF(analysisResult, user.name)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:brightness-110"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Report</span>
                </button>

                <button
                  onClick={() => alert('Diagnostic Report link copied to clipboard!')}
                  className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-800/60"
                  title="Share Report"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Diagnostics Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-400/80 block uppercase font-bold">AI Confidence</span>
                <span className="text-xl font-black text-emerald-200">{analysisResult.confidence}%</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-400/80 block uppercase font-bold">Severity Level</span>
                <span className={`text-xl font-black ${analysisResult.severity === 'Critical' ? 'text-rose-400' : 'text-amber-400'}`}>
                  {analysisResult.severity}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-400/80 block uppercase font-bold">Affected Area</span>
                <span className="text-sm font-bold text-emerald-100">{analysisResult.affectedArea}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-400/80 block uppercase font-bold">Health Score</span>
                <span className="text-xl font-black text-emerald-300">{analysisResult.healthScore}/100</span>
              </div>
            </div>
          </div>

          {/* Detailed Symptoms & Causes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Symptoms */}
            <div className="glass-panel p-6 rounded-3xl space-y-3 border border-emerald-500/20">
              <h3 className="text-sm font-bold text-emerald-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Observed Symptoms</span>
              </h3>
              <ul className="space-y-2">
                {analysisResult.symptoms.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-emerald-100/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Causes */}
            <div className="glass-panel p-6 rounded-3xl space-y-3 border border-emerald-500/20">
              <h3 className="text-sm font-bold text-emerald-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Root Causes & Environmental Triggers</span>
              </h3>
              <ul className="space-y-2">
                {analysisResult.possibleCauses.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-emerald-100/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Organic vs Chemical Remedies Tabs */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
            <h3 className="text-base font-bold text-emerald-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Recommended Treatment Protocol</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organic Remedies */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Organic & Eco Remedies
                </span>
                <ul className="space-y-2 pt-1">
                  {analysisResult.treatment.organic.map((org, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{org}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Remedies */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-amber-500/30 space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Targeted Chemical Sprays
                </span>
                <ul className="space-y-2 pt-1">
                  {analysisResult.treatment.chemical.map((chem, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{chem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommended Products Showcase */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Recommended Products & Bio-Stimulants</span>
              </h3>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="text-xs text-emerald-400 font-bold hover:underline"
              >
                Visit Marketplace →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_PRODUCTS.slice(0, 2).map((prod) => (
                <div key={prod.id} className="p-3 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 flex items-center gap-3">
                  <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-emerald-100 truncate">{prod.name}</h4>
                    <span className="text-xs font-extrabold text-emerald-300">${prod.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(prod)}
                      className="mt-1 px-3 py-1 rounded-lg bg-emerald-500 text-emerald-950 font-bold text-[10px] hover:brightness-110 block"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Nearby Experts */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
            <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>Book Consultation with Plant Pathologist</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_EXPERTS.slice(0, 2).map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={exp.image} alt={exp.name} className="w-12 h-12 rounded-full object-cover border border-emerald-400/40" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-100">{exp.name}</h4>
                      <span className="text-[10px] text-emerald-300/80 block">{exp.specialization}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('consultation')}
                    className="px-3 py-1.5 rounded-xl bg-teal-500 text-teal-950 font-bold text-[10px] shadow-md hover:brightness-110"
                  >
                    Book Slot
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
