import React from 'react';
import { Target, AlertTriangle, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function PriorityTopicsView({ priorityTopics = [] }) {
  if (!priorityTopics || priorityTopics.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No priority topics found.
      </div>
    );
  }

  const getPriorityBadge = (priority = 'Medium') => {
    const p = priority.toLowerCase();
    if (p.includes('high')) {
      return {
        label: 'High Priority',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
        dotClass: 'bg-rose-500',
      };
    }
    if (p.includes('low')) {
      return {
        label: 'Low Priority',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        dotClass: 'bg-slate-400',
      };
    }
    return {
      label: 'Medium Priority',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      dotClass: 'bg-amber-500',
    };
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          High-Yield Priority Topics & Exam Weightage
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Focus your energy on concepts with the highest return on investment according to historical patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {priorityTopics.map((item, idx) => {
          const badge = getPriorityBadge(item.priority);

          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {item.subject}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.badgeClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                    {badge.label}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-base mb-1.5">{item.topic}</h4>

                {item.estimatedHours && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Estimated Mastery Time: <strong>{item.estimatedHours} hours</strong></span>
                  </div>
                )}

                {/* Key Concepts */}
                {item.keyConcepts && item.keyConcepts.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Key Concepts to Master:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.keyConcepts.map((concept, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Exam Relevance */}
              {item.examRelevance && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100/60 flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Exam Relevance: </strong>
                    {item.examRelevance}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
