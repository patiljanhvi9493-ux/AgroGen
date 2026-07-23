import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Search, 
  Plus, 
  Clock, 
  HelpCircle 
} from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  time: string;
}

interface ForumPost {
  id: string;
  title: string;
  category: 'General' | 'Pest Control' | 'Organic' | 'Machinery';
  author: string;
  time: string;
  content: string;
  upvotes: number;
  comments: Comment[];
  hasUpvoted?: boolean;
}

export const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'How to manage whitefly infestation in cotton fields organically?',
      category: 'Pest Control',
      author: 'Sukhdev Singh',
      time: '2 hours ago',
      content: 'I am noticing small whiteflies underneath the leaves of my BT cotton crop. I want to avoid chemical sprays this early in the season. Has anyone tried neem oil emulsions or yellow sticky traps? What ratios did you use?',
      upvotes: 18,
      comments: [
        { id: '1a', author: 'Dr. Ramesh Kumar', role: 'Certified Agronomist', content: 'Neem oil formulation is very effective. Use 5ml of cold-pressed neem oil (1500 ppm or higher) per liter of water, add 1-2ml of liquid dish soap to emulsify. Spray early morning or late evening to prevent sunburn on leaves.', time: '1 hour ago' },
        { id: '1b', author: 'Anita Patil', role: 'Farmer', content: 'Yellow sticky traps worked like a charm for me. Hang them just above the crop canopy. They attract and capture adult whiteflies in thousands within days.', time: '45 mins ago' }
      ]
    },
    {
      id: '2',
      title: 'Best vermicompost ratios for clayey soil beds?',
      category: 'Organic',
      author: 'Rajesh Shinde',
      time: '1 day ago',
      content: 'My soil has high clay content and packs tight after watering. I plan to mix in worm castings. Should I also mix in river sand or coco peat to improve aeration, and what are the recommended ratios for tomato transplanting?',
      upvotes: 24,
      comments: [
        { id: '2a', author: 'Amit Dev', role: 'Organic Farm Expert', content: 'For clayey soils, mix 40% local clay soil, 30% vermicompost, and 30% coco peat/sand. The coco peat retains structural air channels, and vermicompost adds essential microbial life.', time: '18 hours ago' }
      ]
    }
  ]);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('General');
  const [newContent, setNewContent] = useState('');
  const [showAskForm, setShowAskForm] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      author: 'You (Farmer Ramesh)',
      time: 'Just now',
      content: newContent,
      upvotes: 0,
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
    setNewTitle('');
    setNewContent('');
    setShowAskForm(false);
  };

  const handleUpvote = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const hasVoted = p.hasUpvoted;
        return {
          ...p,
          upvotes: hasVoted ? p.upvotes - 1 : p.upvotes + 1,
          hasUpvoted: !hasVoted
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text) return;

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: Date.now().toString(),
              author: 'You (Farmer Ramesh)',
              role: 'Farmer',
              content: text,
              time: 'Just now'
            }
          ]
        };
      }
      return p;
    }));

    setCommentInput(prev => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 py-4 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-emerald-400" />
            <span>Farmer Community Discussion Board</span>
          </h1>
          <p className="text-xs text-emerald-300/70 mt-1">
            Exchange advice, share crop troubleshooting updates, and consult with fellow farmers and certified pathologists.
          </p>
        </div>

        <button
          onClick={() => setShowAskForm(prev => !prev)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-black text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Community</span>
        </button>
      </div>

      {/* Write Question Collapse Form */}
      {showAskForm && (
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 animate-fadeInUp">
          <h3 className="text-sm font-bold text-emerald-100 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4.5 h-4.5 text-emerald-400" />
            <span>Post a New Discussion Question</span>
          </h3>

          <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How deep to bury potato tubers during monsoon sowing?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ForumPost['category'])}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                >
                  <option value="General">General farming</option>
                  <option value="Pest Control">Pest Control & Diseases</option>
                  <option value="Organic">Organic & Bio-NPK</option>
                  <option value="Machinery">Farm Machinery & Tools</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-emerald-300 block mb-1">Details / Context</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your soil, crop variety, region, and weather conditions so agronomists can give precise answers..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowAskForm(false)}
                className="px-4 py-2 rounded-xl bg-emerald-900/60 text-emerald-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-black shadow-md hover:brightness-110"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/20">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-400/60" />
          <input
            type="text"
            placeholder="Search discussion topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-emerald-950 border border-emerald-500/30 rounded-xl text-xs text-emerald-100 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Pest Control', 'Organic', 'Machinery'].map(cat => (
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

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isExpanded = expandedPostId === post.id;
          return (
            <div 
              key={post.id}
              className="glass-panel p-5 rounded-3xl border border-emerald-500/20 space-y-4 hover:border-emerald-400/30 transition-all"
            >
              
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {post.category}
                  </span>
                  <span className="text-xs text-emerald-400/80">• Posted by {post.author}</span>
                </div>
                <span className="text-[10px] text-emerald-300/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.time}</span>
                </span>
              </div>

              {/* Title & Body */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-emerald-100">{post.title}</h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-emerald-900/30 text-xs">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleUpvote(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                      post.hasUpvoted 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                        : 'bg-emerald-950/40 border-emerald-500/10 text-emerald-100/70 hover:bg-emerald-900/40'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Upvote ({post.upvotes})</span>
                  </button>

                  <button 
                    onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                      isExpanded 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                        : 'bg-emerald-950/40 border-emerald-500/10 text-emerald-100/70 hover:bg-emerald-900/40'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Answers ({post.comments.length})</span>
                  </button>
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Discussion link copied to clipboard!');
                  }}
                  className="p-1.5 rounded-lg text-emerald-400/80 hover:text-emerald-300"
                  title="Share thread"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Comments Section Collapse */}
              {isExpanded && (
                <div className="space-y-4 pt-4 border-t border-emerald-800/40 animate-fadeInUp">
                  
                  {/* Comments loop */}
                  {post.comments.length > 0 ? (
                    <div className="space-y-3 pl-4 border-l border-emerald-800/50">
                      {post.comments.map((comm) => (
                        <div key={comm.id} className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/10 space-y-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-emerald-200">
                              {comm.author} <span className="font-medium text-emerald-400">({comm.role})</span>
                            </span>
                            <span className="text-emerald-300/40">{comm.time}</span>
                          </div>
                          <p className="text-xs text-emerald-100/85 leading-relaxed">{comm.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-300/50 italic pl-4">No answers yet. Share your experience below!</p>
                  )}

                  {/* Add comment Form */}
                  <div className="flex gap-2 items-center pl-4 pt-1">
                    <input 
                      type="text" 
                      placeholder="Type your agronomical advice or answer here..."
                      value={commentInput[post.id] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCommentInput(prev => ({ ...prev, [post.id]: val }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      className="flex-1 px-3 py-2 bg-emerald-950 border border-emerald-500/30 rounded-xl text-xs text-emerald-100 focus:outline-none"
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      className="px-4 py-2 bg-emerald-500 text-emerald-950 font-bold text-xs rounded-xl shadow hover:brightness-110"
                    >
                      Post
                    </button>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
