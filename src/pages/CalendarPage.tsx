import React, { useState } from 'react';
import { 
  Calendar as CalIcon, 
  Plus, 
  CheckSquare, 
  Square, 
  Trash2, 
  Clock, 
  Tag 
} from 'lucide-react';

interface CalendarTask {
  id: string;
  title: string;
  cropTarget: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

export const CalendarPage: React.FC = () => {
  const [tasks, setTasks] = useState<CalendarTask[]>([
    { id: '1', title: 'Apply Copper Fungicide spray', cropTarget: 'Tomato', date: '2026-07-24', priority: 'High', completed: false },
    { id: '2', title: 'Nitrogen (Urea) top-dressing', cropTarget: 'Wheat', date: '2026-07-25', priority: 'Medium', completed: false },
    { id: '3', title: 'Clean drip irrigation emitters', cropTarget: 'All Crops', date: '2026-07-28', priority: 'Low', completed: true },
    { id: '4', title: 'Monitor for aphid infestation', cropTarget: 'Cotton', date: '2026-07-30', priority: 'High', completed: false }
  ]);

  const [title, setTitle] = useState('');
  const [cropTarget, setCropTarget] = useState('Tomato');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<CalendarTask['priority']>('Medium');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCrop, setFilterCrop] = useState('All');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTask: CalendarTask = {
      id: Date.now().toString(),
      title,
      cropTarget,
      date,
      priority,
      completed: false
    };

    setTasks(prev => [...prev, newTask]);
    setTitle('');
    setShowAddForm(false);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks
    .filter(t => filterCrop === 'All' || t.cropTarget === filterCrop)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const priorityColors = {
    Low: 'border-emerald-500/20 text-emerald-300 bg-emerald-500/10',
    Medium: 'border-amber-500/20 text-amber-300 bg-amber-500/10',
    High: 'border-rose-500/20 text-rose-300 bg-rose-500/10'
  };

  return (
    <div className="space-y-8 py-4 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
            <CalIcon className="w-8 h-8 text-emerald-400" />
            <span>Crop Calendar & Task Reminders</span>
          </h1>
          <p className="text-xs text-emerald-300/70 mt-1">
            Organize seasonal farm chores, sowing, fertilizing schedules, disease inspections, and harvesting milestones.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(prev => !prev)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-black text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task Event</span>
        </button>
      </div>

      {/* Add Task Collapse Form */}
      {showAddForm && (
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 animate-fadeInUp">
          <h3 className="text-sm font-bold text-emerald-100 mb-3 flex items-center gap-2">
            <CalIcon className="w-4.5 h-4.5 text-emerald-400" />
            <span>Schedule a New Farm Task</span>
          </h3>

          <form onSubmit={handleAddTask} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Task Description / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flush drip water filters, harvest tomatoes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-emerald-300 block mb-1">Target Crop</label>
                  <select
                    value={cropTarget}
                    onChange={(e) => setCropTarget(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice (Paddy)</option>
                    <option value="Cotton">Cotton</option>
                    <option value="All Crops">All Crops</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-emerald-300 block mb-1">Task Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-emerald-300 block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as CalendarTask['priority'])}
                    className="w-full px-2 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl bg-emerald-900/60 text-emerald-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-black shadow-md hover:brightness-110"
              >
                Schedule Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Summary Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/20">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-300/80 font-bold">Filter by Crop:</span>
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none text-xs"
          >
            <option value="All">All Crops</option>
            <option value="Tomato">Tomato Only</option>
            <option value="Wheat">Wheat Only</option>
            <option value="Rice">Rice Only</option>
            <option value="Cotton">Cotton Only</option>
          </select>
        </div>

        <span className="text-xs font-semibold text-emerald-300/70">
          Pending chores: {tasks.filter(t => !t.completed).length} tasks
        </span>
      </div>

      {/* Checklist Grid */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-emerald-300/40 italic">
            No scheduled chores found for this category. All clear!
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div 
                key={task.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  task.completed 
                    ? 'bg-emerald-950/20 border-emerald-500/10 opacity-60' 
                    : 'bg-emerald-900/10 border-emerald-500/20 hover:border-emerald-400/40'
                }`}
              >
                
                {/* Checkbox + Title */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <button 
                    onClick={() => handleToggleComplete(task.id)}
                    className="text-emerald-400 hover:text-emerald-300 shrink-0"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                    ) : (
                      <Square className="w-5 h-5 text-emerald-500/50" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <span className={`text-xs font-bold block truncate ${
                      task.completed ? 'line-through text-emerald-300/40' : 'text-emerald-100'
                    }`}>
                      {task.title}
                    </span>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[9px] text-emerald-400/70">
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        {task.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Tag className="w-3 h-3 text-emerald-400" />
                        {task.cropTarget}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Priority Badge + Delete */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${
                    priorityColors[task.priority]
                  }`}>
                    {task.priority}
                  </span>

                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 rounded-lg bg-emerald-950/40 text-emerald-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
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
  );
};
