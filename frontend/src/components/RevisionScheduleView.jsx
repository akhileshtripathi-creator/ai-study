import React from 'react';
import { Calendar, Repeat, CheckCircle, Lightbulb, ArrowRight } from 'lucide-react';

export default function RevisionScheduleView({ revisionSchedule = [] }) {
  if (!revisionSchedule || revisionSchedule.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No revision schedule available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Repeat className="w-5 h-5 text-indigo-600" />
          Scientifically Calibrated Spaced Revision System
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Combat the Ebbinghaus forgetting curve with systematically scheduled memory retrieval intervals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {revisionSchedule.map((phase, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                {phase.phase}
              </h4>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 mb-3">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">Retrieval Method:</span>
                <span>{phase.method}</span>
              </div>

              <div className="flex items-center justify-between px-1 text-slate-500 font-medium">
                <span>Frequency / Cadence:</span>
                <span className="text-indigo-600 font-semibold">{phase.frequency}</span>
              </div>
            </div>

            {phase.tips && (
              <div className="text-xs text-slate-600 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/60 flex items-start gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{phase.tips}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
