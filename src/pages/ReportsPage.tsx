import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Mail, 
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_DISEASES } from '../data/mockData';
import type { DiseaseInfo } from '../data/mockData';
import { generateReportPDF } from '../services/aiEngine';


export const ReportsPage: React.FC = () => {
  const { reports, user } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const allReports: DiseaseInfo[] = reports.length > 0 ? reports : Object.values(MOCK_DISEASES);

  const filteredReports = filterCategory === 'All' 
    ? allReports 
    : allReports.filter((r) => r.category === filterCategory);

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
            <span>My Disease Reports & Diagnostic History</span>
          </h1>
          <p className="text-xs text-emerald-300/70 mt-1">
            Access and download verified AI diagnostic records for all your crop scans.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Fungal', 'Bacterial', 'Viral', 'Pest', 'Nutrient'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === cat
                ? 'bg-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/20'
                : 'bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/50'
            }`}
          >
            {cat} Reports
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4 max-w-5xl mx-auto">
        {filteredReports.map((report, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-3xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {report.category}
                </span>
                <span className="text-[10px] text-emerald-400/70">Scan ID: #AG-2026-{idx + 101}</span>
              </div>
              <h3 className="text-lg font-bold text-emerald-100">{report.name}</h3>
              <p className="text-xs text-emerald-300/70">
                Crop: {report.crop} • Severity: <strong className="text-amber-300">{report.severity}</strong> • Health Index: {report.healthScore}/100
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => generateReportPDF(report, user.name)}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Report</span>
              </button>

              <button
                onClick={() => alert(`Report #AG-2026-${idx + 101} sent to ${user.email}`)}
                className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-800/60 text-xs flex items-center gap-1.5"
                title="Email Report"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Email</span>
              </button>

              <button
                onClick={() => window.print()}
                className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-800/60 text-xs flex items-center gap-1.5"
                title="Print Report"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
