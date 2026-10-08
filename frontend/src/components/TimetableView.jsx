import React from 'react';
import { Clock, Coffee, Zap, BookOpen, RotateCcw, Sparkles } from 'lucide-react';

export default function TimetableView({ timetable = [] }) {
  if (!timetable || timetable.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No timetable entries available.
      </div>
    );
  }

  const getTypeBadge = (type = '') => {
    const lower = type.toLowerCase();
    if (lower.includes('break')) {
      return {
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        dotClass: 'bg-emerald-500',
        icon: Coffee,
      };
    }
    if (lower.includes('deep')) {
      return {
        badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/60',
        dotClass: 'bg-purple-500',
        icon: Zap,
      };
    }
    if (lower.includes('practice')) {
      return {
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/60',
        dotClass: 'bg-blue-500',
        icon: BookOpen,
      };
    }
    return {
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/60',
      dotClass: 'bg-amber-500',
      icon: RotateCcw,
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Optimized Daily Routine & Timetable
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured into cognitive deep work cycles, deliberate practice drills, and strategic recovery breaks.
          </p>
        </div>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-100 space-y-6 pt-2">
        {timetable.map((slot, idx) => {
          const typeInfo = getTypeBadge(slot.type);
          const Icon = typeInfo.icon;
          const isBreak = slot.type?.toLowerCase().includes('break');

          return (
            <div key={idx} className="relative group">
              {/* Timeline marker node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isBreak ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Slot card */}
              <div
                className={`rounded-xl border p-4 sm:p-5 transition-all hover:shadow-md ${
                  isBreak
                    ? 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-200'
                    : 'bg-white border-slate-200/80 hover:border-indigo-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-950 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                      {slot.timeSlot}
                    </span>
                    {!isBreak && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {slot.subject}
                      </span>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeInfo.badgeClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${typeInfo.dotClass}`} />
                    {slot.type || 'Study Session'}
                  </span>
                </div>

                <div className="font-semibold text-slate-900 text-sm sm:text-base">
                  {slot.activity}
                </div>

                {slot.notes && (
                  <p className="text-xs text-slate-500 mt-2 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{slot.notes}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
