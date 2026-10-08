import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, AlertCircle, Bot } from 'lucide-react';

export default function Header({ statusInfo }) {
  const isAiConfigured = statusInfo?.geminiConfigured;

  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200 text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
                PlanGenius <span className="text-indigo-600">AI</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 hidden sm:inline-block">
                Study Planner
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              AI-Powered Personalized Study Timetables & Task Tracker
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Status Badge */}
          <div
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
              isAiConfigured
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                : 'bg-amber-50 text-amber-700 border-amber-200/80'
            }`}
            title={
              isAiConfigured
                ? 'Gemini API key is detected in backend/.env'
                : 'Running in Demo Mode. Add GEMINI_API_KEY in backend/.env for live AI'
            }
          >
            {isAiConfigured ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>Gemini AI Connected</span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 text-amber-600" />
                <span>Demo Mode (Mock AI)</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
