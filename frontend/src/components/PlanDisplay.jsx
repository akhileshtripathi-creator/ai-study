import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  BarChart3, 
  Target, 
  Repeat, 
  Award, 
  CheckCheck, 
  ArrowLeft, 
  Printer, 
  Sparkles, 
  Bot, 
  Flame, 
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import TimetableView from './TimetableView';
import SubjectHoursChart from './SubjectHoursChart';
import PriorityTopicsView from './PriorityTopicsView';
import RevisionScheduleView from './RevisionScheduleView';
import PracticeSuggestionsView from './PracticeSuggestionsView';
import TaskTracker from './TaskTracker';

export default function PlanDisplay({ plan, onReset }) {
  const [activeTab, setActiveTab] = useState('all');

  if (!plan) return null;

  const {
    summary = {},
    subjectHours = [],
    dailyTimetable = [],
    priorityTopics = [],
    revisionSchedule = [],
    practiceSuggestions = [],
    studyTasks = [],
    isDemoMode = false,
    notice,
    warning,
    modelUsed
  } = plan;

  const tabs = [
    { id: 'all', label: 'Full Roadmap', icon: Layers },
    { id: 'timetable', label: 'Daily Timetable', icon: Clock, count: dailyTimetable.length },
    { id: 'subjects', label: 'Subject Hours', icon: BarChart3, count: subjectHours.length },
    { id: 'priority', label: 'Priority Topics', icon: Target, count: priorityTopics.length },
    { id: 'revision', label: 'Revision Cycles', icon: Repeat, count: revisionSchedule.length },
    { id: 'practice', label: 'Practice Tactics', icon: Award, count: practiceSuggestions.length },
    { id: 'tasks', label: 'Tasks & Checklist', icon: CheckCheck, count: studyTasks.length, highlight: true },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Demo / Status Notice Banner */}
      {isDemoMode && (
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 text-amber-900 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Bot className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="font-semibold block sm:inline">Notice: Running in Demo Mode. </strong>
              <span>
                To generate live plans with Google Gemini, insert your Gemini API Key into <code className="bg-amber-100/80 px-1.5 py-0.5 rounded text-amber-950 font-mono text-xs">backend/.env</code>.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-200/70 text-amber-900 shrink-0">
            Smart Mock Engine
          </span>
        </div>
      )}

      {warning && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
          <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{warning}</span>
        </div>
      )}

      {/* Main Roadmap Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/50">
                AI Generated Strategy
              </span>
              {modelUsed && (
                <span className="text-xs text-slate-500 font-mono">
                  via {modelUsed}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {summary.title || 'Personalized AI Study Strategy'}
            </h2>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              Print / Save PDF
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              New Study Plan
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-6">
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-semibold text-indigo-700 flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5" /> Exam Date
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 font-mono">
              {summary.examDate || 'Scheduled'}
            </div>
            <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">
              {summary.daysRemaining} days remaining
            </div>
          </div>

          <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4">
            <div className="text-xs font-semibold text-purple-700 flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5" /> Daily Commitment
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 font-mono">
              {summary.dailyHours} hrs / day
            </div>
            <div className="text-[11px] text-purple-600 font-semibold mt-0.5">
              Peak: {summary.preferredTime || 'Optimal'}
            </div>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 mb-1">
              <Flame className="w-3.5 h-3.5" /> Total Hours
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 font-mono">
              {summary.totalStudyHours} hrs
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              Available prep capacity
            </div>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4">
            <div className="text-xs font-semibold text-amber-700 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Readiness Tier
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900">
              {summary.preparationLevel || 'Intermediate'}
            </div>
            <div className="text-[11px] text-amber-600 font-semibold mt-0.5">
              Customized strategy
            </div>
          </div>
        </div>

        {/* Strategy Overview Description */}
        {summary.strategyOverview && (
          <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Executive Strategic Advisory
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {summary.strategyOverview}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Tabs Bar */}
      <div className="border-b border-slate-200 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 min-w-max pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content Rendering */}
      <div className="space-y-12">
        {(activeTab === 'all' || activeTab === 'timetable') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <TimetableView timetable={dailyTimetable} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'subjects') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <SubjectHoursChart subjectHours={subjectHours} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'priority') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <PriorityTopicsView priorityTopics={priorityTopics} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'revision') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <RevisionScheduleView revisionSchedule={revisionSchedule} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'practice') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <PracticeSuggestionsView practiceSuggestions={practiceSuggestions} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'tasks') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <TaskTracker initialTasks={studyTasks} planId={summary.examDate || 'current'} />
          </section>
        )}
      </div>
    </div>
  );
}
