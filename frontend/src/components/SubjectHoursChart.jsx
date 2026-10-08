import React from 'react';
import { BarChart3, Clock, PieChart, Sparkles } from 'lucide-react';

export default function SubjectHoursChart({ subjectHours = [] }) {
  if (!subjectHours || subjectHours.length === 0) {
    return null;
  }

  const totalCalculatedHours = subjectHours.reduce((acc, curr) => acc + (curr.totalHours || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Subject-Wise Study Hours Allocation
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Balanced time split according to syllabus complexity, weightage, and target exam readiness.
        </p>
      </div>

      {/* Aggregate Distribution Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2.5">
          <span>Overall Time Distribution</span>
          <span>{totalCalculatedHours > 0 ? `${totalCalculatedHours} Total Planned Hours` : '100% Allocation'}</span>
        </div>

        {/* Multi-segment progress bar */}
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          {subjectHours.map((sh, idx) => (
            <div
              key={idx}
              style={{
                width: `${sh.percentage || (100 / subjectHours.length)}%`,
                backgroundColor: sh.color || '#6366F1'
              }}
              className="h-full transition-all hover:opacity-90 relative group"
              title={`${sh.subject}: ${sh.percentage}% (${sh.totalHours || 0} hrs)`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3.5">
          {subjectHours.map((sh, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: sh.color || '#6366F1' }}
              />
              <span className="font-medium text-slate-800">{sh.subject}</span>
              <span className="text-slate-400">({sh.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectHours.map((sh, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 bottom-0 w-1.5"
              style={{ backgroundColor: sh.color || '#6366F1' }}
            />

            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-base">{sh.subject}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3" />
                    {sh.hoursPerWeek} hrs/week
                  </span>
                  <span>•</span>
                  <span>{sh.totalHours} total hours</span>
                </div>
              </div>

              <span
                className="text-sm font-extrabold px-2.5 py-1 rounded-lg text-white shrink-0"
                style={{ backgroundColor: sh.color || '#6366F1' }}
              >
                {sh.percentage}%
              </span>
            </div>

            {sh.rationale && (
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-1.5 mt-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{sh.rationale}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
