import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Clock, Calendar, CheckCircle } from 'lucide-react';

const LOADING_TIPS = [
  "Analyzing your exam countdown and calculating optimal time blocks...",
  "Applying cognitive load theory to match your peak focus hours...",
  "Sequencing high-yield priority topics and active recall intervals...",
  "Synthesizing spaced repetition milestones and mock practice drills...",
  "Formatting your interactive daily tasks and timetable..."
];

export default function LoadingSkeleton() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-8 sm:p-12 text-center max-w-2xl mx-auto my-8 animate-fadeIn">
      {/* Animated Orb / Brain Icon */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-20 blur-xl animate-pulse" />
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 text-white animate-bounce duration-1000">
          <Brain className="w-10 h-10" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        Gemini AI is Synthesizing Your Master Plan
      </h3>
      
      <p className="text-sm text-indigo-600 font-medium h-6 transition-all duration-300">
        {LOADING_TIPS[tipIndex]}
      </p>

      {/* Progress steps animation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100">
        {[
          { icon: Clock, label: 'Timetable' },
          { icon: Brain, label: 'Priority Topics' },
          { icon: Calendar, label: 'Revision Cycles' },
          { icon: CheckCircle, label: 'Task Tracker' },
        ].map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Icon className="w-5 h-5 text-indigo-500 animate-pulse mb-1.5" />
              <span className="text-xs font-semibold text-slate-700">{step.label}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Optimizing...</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
