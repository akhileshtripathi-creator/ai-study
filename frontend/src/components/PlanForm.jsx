import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  Calendar, 
  Clock, 
  Sparkles, 
  Sun, 
  Sunset, 
  Moon, 
  Compass, 
  BookOpen, 
  Flame, 
  GraduationCap, 
  HelpCircle,
  Wand2
} from 'lucide-react';

const SUGGESTED_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English Literature',
  'History',
  'Economics'
];

const PREFERRED_TIMES = [
  { id: 'Morning', label: 'Morning', desc: '6 AM - 12 PM (High Focus)', icon: Sun },
  { id: 'Afternoon', label: 'Afternoon', desc: '12 PM - 5 PM (Consistent)', icon: Compass },
  { id: 'Evening', label: 'Evening', desc: '5 PM - 9 PM (Post-Work/School)', icon: Sunset },
  { id: 'Night', label: 'Night Owl', desc: '9 PM - 2 AM (Quiet Focus)', icon: Moon },
  { id: 'Flexible', label: 'Flexible / Split', desc: 'Distributed throughout day', icon: Clock },
];

const PREP_LEVELS = [
  { id: 'Beginner', label: 'Beginner', desc: 'Starting from scratch / basic theory needed' },
  { id: 'Intermediate', label: 'Intermediate', desc: 'Know fundamental concepts, need deep practice' },
  { id: 'Advanced', label: 'Advanced', desc: 'Strong grasp, aiming for top score & speed' },
  { id: 'Revision', label: 'Final Revision', desc: 'Exam is imminent, focusing on mocks & errors' },
];

export default function PlanForm({ onSubmit, isLoading }) {
  // Tomorrow's date as default min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  // Default target date: 30 days from now
  const defaultExamDate = new Date();
  defaultExamDate.setDate(defaultExamDate.getDate() + 30);
  const defaultDateStr = defaultExamDate.toISOString().split('T')[0];

  const [subjects, setSubjects] = useState(['Mathematics', 'Physics', 'Computer Science']);
  const [subjectInput, setSubjectInput] = useState('');
  const [examDate, setExamDate] = useState(defaultDateStr);
  const [dailyHours, setDailyHours] = useState(5);
  const [preferredTime, setPreferredTime] = useState('Morning');
  const [preparationLevel, setPreparationLevel] = useState('Intermediate');
  const [importantTopics, setImportantTopics] = useState(
    'Calculus, Differential Equations, Classical Mechanics, Data Structures & Algorithms'
  );
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate days remaining preview
  const daysLeft = Math.max(
    1,
    Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  );

  const handleAddSubject = (subjectName) => {
    const trimmed = (subjectName || subjectInput).trim();
    if (!trimmed) return;
    if (subjects.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMsg(`"${trimmed}" is already added.`);
      return;
    }
    setSubjects([...subjects, trimmed]);
    setSubjectInput('');
    setErrorMsg('');
  };

  const handleRemoveSubject = (indexToRemove) => {
    if (subjects.length <= 1) {
      setErrorMsg('You must have at least one subject in your study plan.');
      return;
    }
    setSubjects(subjects.filter((_, idx) => idx !== indexToRemove));
    setErrorMsg('');
  };

  const handleFillSample = () => {
    setSubjects(['Calculus & Linear Algebra', 'Modern Physics', 'Operating Systems']);
    const target = new Date();
    target.setDate(target.getDate() + 25);
    setExamDate(target.toISOString().split('T')[0]);
    setDailyHours(6);
    setPreferredTime('Morning');
    setPreparationLevel('Intermediate');
    setImportantTopics('Integration Techniques, Matrix Eigenvalues, Newton\'s Laws, Memory Management, CPU Scheduling');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subjects.length === 0) {
      setErrorMsg('Please add at least one subject.');
      return;
    }
    if (!examDate) {
      setErrorMsg('Please select an exam date.');
      return;
    }
    setErrorMsg('');
    onSubmit({
      subjects,
      examDate,
      dailyHours: Number(dailyHours),
      preferredTime,
      preparationLevel,
      importantTopics
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            Build Your AI Study Strategy
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Provide your study parameters and let Gemini AI engineer your personalized timetable, revision roadmap, and task checklist.
          </p>
        </div>

        <button
          type="button"
          onClick={handleFillSample}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors self-start sm:self-auto border border-indigo-200/60"
        >
          <Wand2 className="w-3.5 h-3.5" />
          Load Sample Data
        </button>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center justify-between animate-fadeIn">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg('')} className="text-rose-500 hover:text-rose-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* 1. Subjects Section */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            1. Enter Subjects <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Add the subjects or courses you are preparing for.
          </p>

          {/* Active Subject Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {subjects.map((sub, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                {sub}
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(idx)}
                  className="p-0.5 rounded-full hover:bg-indigo-200/70 text-indigo-600 hover:text-indigo-900 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Input field + Add button */}
          <div className="flex gap-2">
            <input
              type="text"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSubject();
                }
              }}
              placeholder="e.g. Mathematics, Organic Chemistry, World History..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => handleAddSubject()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="mt-2.5 flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
            <span className="font-medium text-slate-600">Quick add:</span>
            {SUGGESTED_SUBJECTS.filter(s => !subjects.includes(s)).slice(0, 5).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleAddSubject(s)}
                className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

        {/* 2 & 3: Exam Date & Daily Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exam Date */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-900">
                2. Exam Date <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/50">
                {daysLeft} days to go
              </span>
            </div>
            <div className="relative">
              <input
                type="date"
                min={minDateStr}
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all cursor-pointer"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              The AI will schedule revision cycles leading up to this date.
            </p>
          </div>

          {/* Available Study Hours Per Day */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-900">
                3. Daily Study Hours <span className="text-rose-500">*</span>
              </label>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                {dailyHours} hrs / day
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="14"
              step="1"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
            />

            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>1 hr</span>
              <div className="flex gap-1.5">
                {[2, 4, 6, 8].map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setDailyHours(h)}
                    className={`px-2 py-0.5 rounded text-xs transition-colors ${
                      dailyHours === h 
                        ? 'bg-indigo-600 text-white font-medium' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {h}h
                  </button>
                ))}
              </div>
              <span>14 hrs</span>
            </div>
          </div>
        </div>

        {/* 4. Preferred Study Time */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            4. Preferred Study Time
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Gemini will place your deepest, hardest cognitive tasks during your peak productivity hours.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PREFERRED_TIMES.map((time) => {
              const Icon = time.icon;
              const isSelected = preferredTime === time.id;
              return (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => setPreferredTime(time.id)}
                  className={`flex flex-col items-center text-center p-3.5 rounded-xl border transition-all text-sm ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium ring-2 ring-indigo-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="font-semibold">{time.label}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 leading-tight">{time.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Current Preparation Level */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            5. Current Preparation Level
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Sets the balance between foundational concept learning and high-intensity problem solving.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PREP_LEVELS.map((lvl) => {
              const isSelected = preparationLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setPreparationLevel(lvl.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900 mb-1">{lvl.label}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{lvl.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Important Topics */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            6. Important Topics / Weak Areas
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Enter high-yield topics, specific chapters, or problem areas you must prioritize.
          </p>
          <textarea
            rows="3"
            value={importantTopics}
            onChange={(e) => setImportantTopics(e.target.value)}
            placeholder="e.g. Calculus (Integration, Limits), Thermodynamics, Optics, Dynamic Programming, Database Indexing..."
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-base text-white shadow-lg transition-all flex items-center justify-center gap-2.5 ${
              isLoading
                ? 'bg-indigo-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-300/60 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Your AI Study Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Personalized Study Plan with Gemini AI</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">
            Generates custom timetable, subject hours, priority topics, revision calendar & interactive task tracker.
          </p>
        </div>
      </form>
    </div>
  );
}
