import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Filter, 
  Award, 
  CheckCheck, 
  Clock, 
  Sparkles,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TaskTracker({ initialTasks = [], planId = 'default' }) {
  const storageKey = `study_planner_tasks_${planId}`;

  // Load tasks from localStorage or use initialTasks
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load tasks from localStorage', e);
    }
    return initialTasks.map((t, idx) => ({
      ...t,
      id: t.id || `task-${idx}`,
      completed: Boolean(t.completed)
    }));
  });

  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sync to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Failed to save tasks to localStorage', e);
    }
  }, [tasks, storageKey]);

  // Completion calculation
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleTask = (taskId) => {
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) {
            // Little audio/visual celebratory micro-haptic or check
            const willBeAllComplete = prev.filter(item => item.id !== taskId && !item.completed).length === 0;
            if (willBeAllComplete) {
              try {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              } catch (e) {}
            }
          }
          return { ...t, completed: nextState };
        }
        return t;
      });
      return updated;
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: `task-custom-${Date.now()}`,
      day: 'Current',
      subject: newTaskSubject.trim() || 'General',
      task: newTaskText.trim(),
      estimatedTime: '1 hr',
      priority: 'Medium',
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText('');
    setNewTaskSubject('');
    setShowAddModal(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Tracker Header & Progress */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCheck className="w-5 h-5 text-indigo-600" />
              Actionable Study Task Checklist
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Mark tasks as you complete them. Your daily progress is stored and tracked automatically.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors border border-indigo-200/60 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Custom Task
          </button>
        </div>

        {/* Add Task Form Inline */}
        {showAddModal && (
          <form onSubmit={handleAddTask} className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 animate-fadeIn">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Create New Study Task</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2.5">
              <input
                type="text"
                placeholder="Subject (e.g. Mathematics)"
                value={newTaskSubject}
                onChange={(e) => setNewTaskSubject(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              />
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="sm:col-span-2 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Save Task
              </button>
            </div>
          </form>
        )}

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-700 flex items-center gap-1.5">
              <span>Goal Completion Progress</span>
              {percentComplete === 100 && (
                <span className="text-emerald-600 inline-flex items-center gap-1 text-[11px] font-extrabold">
                  <PartyPopper className="w-3.5 h-3.5" /> All Done!
                </span>
              )}
            </span>
            <span className="text-indigo-600">{completedCount} of {totalCount} completed ({percentComplete}%)</span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-500 ${
                percentComplete === 100
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600'
              }`}
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pending ({totalCount - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-200/80 text-slate-400 text-xs">
            No tasks found matching current filter.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`group flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
                task.completed
                  ? 'bg-slate-50/70 border-slate-200/70 opacity-80'
                  : 'bg-white border-slate-200/80 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                  className={`transition-colors shrink-0 ${
                    task.completed ? 'text-emerald-600' : 'text-slate-300 group-hover:text-indigo-500'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {task.day && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                        {task.day}
                      </span>
                    )}
                    {task.subject && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {task.subject}
                      </span>
                    )}
                    {task.priority && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        task.priority.toLowerCase() === 'high' 
                          ? 'bg-rose-50 text-rose-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {task.priority}
                      </span>
                    )}
                    {task.estimatedTime && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.estimatedTime}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm transition-all ${
                      task.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-800 font-medium'
                    }`}
                  >
                    {task.task}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-all shrink-0"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
