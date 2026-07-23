import React, { useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Plus, 
  Trash2, 
  PieChart, 
  PieChart as ChartIcon 
} from 'lucide-react';

interface ExpenseItem {
  id: string;
  category: 'Seeds' | 'Fertilizers' | 'Pesticides' | 'Labor' | 'Equipment' | 'Other';
  amount: number;
  date: string;
  description: string;
}

export const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', category: 'Seeds', amount: 450, date: '2026-07-10', description: 'Hybrid Tomato seeds' },
    { id: '2', category: 'Fertilizers', amount: 800, date: '2026-07-12', description: 'Bio-NPK & Nitrogen booster' },
    { id: '3', category: 'Labor', amount: 1200, date: '2026-07-18', description: 'Weeding and pruning workers' },
    { id: '4', category: 'Pesticides', amount: 350, date: '2026-07-20', description: 'Neem oil spray bio-insecticide' }
  ]);

  const [category, setCategory] = useState<ExpenseItem['category']>('Seeds');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(5000);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      category,
      amount: parseFloat(amount),
      date,
      description: description || `${category} purchase`
    };

    setExpenses(prev => [newItem, ...prev]);
    setAmount('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = budget - totalSpent;
  const budgetPercentage = Math.min((totalSpent / budget) * 100, 100);

  // Group by category for charts
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const categories: ExpenseItem['category'][] = ['Seeds', 'Fertilizers', 'Pesticides', 'Labor', 'Equipment', 'Other'];
  
  const colors = {
    Seeds: '#10b981',      // emerald-500
    Fertilizers: '#3b82f6', // blue-500
    Pesticides: '#f59e0b',  // amber-500
    Labor: '#ec4899',       // pink-500
    Equipment: '#8b5cf6',   // violet-500
    Other: '#6b7280'        // gray-500
  };

  return (
    <div className="space-y-8 py-4 pb-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
          <ChartIcon className="w-8 h-8 text-emerald-400" />
          <span>Farm Expense Tracker & Budget Analytics</span>
        </h1>
        <p className="text-xs text-emerald-300/70 mt-1">
          Monitor your agricultural investments, log expenses, and analyze seasonal budget distributions.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Seasonal Budget Limit</span>
            <span className="text-2xl font-black text-emerald-100">${budget.toFixed(2)}</span>
            <div className="mt-2">
              <input 
                type="range" 
                min="1000" 
                max="20000" 
                step="500" 
                value={budget} 
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
          <DollarSign className="w-10 h-10 text-emerald-500 opacity-60 shrink-0" />
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">Total Spent to Date</span>
            <span className="text-2xl font-black text-emerald-100">${totalSpent.toFixed(2)}</span>
            <span className="text-[10px] text-emerald-400/80 block mt-1">
              {budgetPercentage.toFixed(1)}% of seasonal budget
            </span>
          </div>
          <TrendingUp className="w-10 h-10 text-rose-400 opacity-60 shrink-0" />
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Remaining Balance</span>
            <span className={`text-2xl font-black ${remainingBudget < 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-100'}`}>
              ${remainingBudget.toFixed(2)}
            </span>
            <span className="text-[10px] text-emerald-400/80 block mt-1">
              {remainingBudget < 0 ? 'Budget Exceeded!' : 'Within seasonal parameters'}
            </span>
          </div>
          <TrendingDown className="w-10 h-10 text-cyan-400 opacity-60 shrink-0" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Input Form and Chart */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Add Expense Form */}
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 space-y-4">
            <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Log Farm Expense</span>
            </h3>
            
            <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Expense Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseItem['category'])}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Amount ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Notes / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Organic NPK fertilizer"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-bold shadow-md hover:brightness-110"
              >
                Add Transaction
              </button>
            </form>
          </div>

          {/* Custom SVG Distribution Chart */}
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 space-y-4">
            <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>Investment Distribution</span>
            </h3>

            {totalSpent === 0 ? (
              <p className="text-xs text-emerald-300/50 text-center py-6">No transactions logged yet.</p>
            ) : (
              <div className="space-y-4">
                {/* SVG Bar Chart representing shares */}
                <div className="space-y-2.5 pt-2">
                  {categories.map(cat => {
                    const amt = categoryTotals[cat] || 0;
                    const percent = totalSpent > 0 ? (amt / totalSpent) * 100 : 0;
                    if (amt === 0) return null;

                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-emerald-200">{cat}</span>
                          <span className="text-emerald-300/70">${amt.toFixed(2)} ({percent.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-emerald-950 overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500" 
                            style={{ 
                              width: `${percent}%`,
                              backgroundColor: colors[cat]
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right: Transactions Log */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Transaction Ledger</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {expenses.length} Entries
              </span>
            </div>

            {expenses.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 py-12">
                <p className="text-xs font-bold text-emerald-300/70">No transactions recorded yet.</p>
                <p className="text-[10px] text-emerald-300/50">Log costs in the panel to begin budget analytics.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto max-h-[500px] space-y-2.5 pr-1">
                {expenses.map((exp) => (
                  <div 
                    key={exp.id} 
                    className="p-3.5 rounded-2xl bg-emerald-900/10 border border-emerald-500/10 hover:border-emerald-500/30 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Indicator circle matching color */}
                      <span 
                        className="w-3 h-3 rounded-full shrink-0" 
                        style={{ backgroundColor: colors[exp.category] }} 
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-emerald-100 truncate">{exp.description}</h4>
                        <span className="text-[9px] text-emerald-300/60 block mt-0.5">
                          Category: <strong className="text-emerald-300">{exp.category}</strong> • Date: {exp.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-black text-emerald-200">
                        -${exp.amount.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => handleDelete(exp.id)}
                        className="p-1.5 rounded-lg bg-emerald-950/40 text-emerald-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
