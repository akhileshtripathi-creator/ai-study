import React from 'react';
import { Award, Target, BookOpen, Layers, CheckSquare } from 'lucide-react';

export default function PracticeSuggestionsView({ practiceSuggestions = [] }) {
  if (!practiceSuggestions || practiceSuggestions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No practice suggestions available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Evidence-Based Practice Strategies & Exam Tactics
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          High-performance cognitive methodologies to maximize retention, problem-solving agility, and test speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {practiceSuggestions.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200/60">
                  {item.category || 'Technique'}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-2">
                {item.technique}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Scientific Method</span>
              <span className="text-indigo-600 font-semibold flex items-center gap-1">
                Active Learning <Target className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
