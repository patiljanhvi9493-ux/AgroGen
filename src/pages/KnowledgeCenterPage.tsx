import React, { useState } from 'react';
import { 
  GraduationCap, 
  ChevronRight, 
  Clock,
  X
} from 'lucide-react';
import { MOCK_ARTICLES } from '../data/mockData';
import type { KnowledgeArticle } from '../data/mockData';

export const KnowledgeCenterPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);

  const categories = ['All', 'Guide', 'Organic', 'Hydroponics', 'Scheme'];

  const filteredArticles = selectedCategory === 'All'
    ? MOCK_ARTICLES
    : MOCK_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Agricultural Academy & Research</span>
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-100">Knowledge Center</h1>
        <p className="text-xs text-emerald-300/70">
          Learn organic bio-pesticide formulation, vertical hydroponics, seasonal farming calendars, and government schemes.
        </p>
      </div>

      {/* Category Tabs */}
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="glass-card rounded-3xl overflow-hidden cursor-pointer group border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                {article.category}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-emerald-400/70">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>{article.readTime}</span>
                  <span>• {article.date}</span>
                </div>
                <h3 className="text-base font-bold text-emerald-100 group-hover:text-emerald-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-emerald-100/70 line-clamp-2">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl glass-panel rounded-3xl border border-emerald-500/40 p-6 space-y-4 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800/80"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {activeArticle.category}
            </span>

            <h2 className="text-2xl font-black text-emerald-100">{activeArticle.title}</h2>
            <div className="flex items-center gap-2 text-xs text-emerald-400/80">
              <span>By {activeArticle.author}</span>
              <span>• {activeArticle.date}</span>
              <span>• {activeArticle.readTime}</span>
            </div>

            <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-56 object-cover rounded-2xl border border-emerald-500/30" />

            <div className="text-xs text-emerald-100/80 leading-relaxed space-y-2">
              <p className="font-semibold text-emerald-200">{activeArticle.summary}</p>
              <p>{activeArticle.content}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
