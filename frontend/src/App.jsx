import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PlanForm from './components/PlanForm';
import PlanDisplay from './components/PlanDisplay';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorAlert from './components/ErrorAlert';
import { getPlannerStatus, generateStudyPlanApi } from './api/client';
import { Sparkles, Brain, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [statusInfo, setStatusInfo] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  // Check backend and Gemini status on mount
  useEffect(() => {
    async function checkStatus() {
      const status = await getPlannerStatus();
      setStatusInfo(status);
    }
    checkStatus();
  }, []);

  const handleGeneratePlan = async (formData) => {
    setIsLoading(true);
    setError(null);
    setLastSubmittedData(formData);

    try {
      const plan = await generateStudyPlanApi(formData);
      setCurrentPlan(plan);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error generating plan:', err);
      setError(err.message || 'Failed to generate study plan. Please verify the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastSubmittedData) {
      handleGeneratePlan(lastSubmittedData);
    } else {
      setError(null);
    }
  };

  const handleReset = () => {
    setCurrentPlan(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <Header statusInfo={statusInfo} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section (only when not showing plan) */}
        {!currentPlan && !isLoading && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Next-Gen Cognitive Learning Architect
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
              Personalized Study Plans Engineered with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Gemini AI</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Stop guessing what to study. Transform your subjects, exam countdown, and energy windows into an optimal timetable with spaced revision and daily task tracking.
            </p>

            {/* Feature highlights pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Adaptive Timetables
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Spaced Revision Cycles
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Interactive Task Checklist
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                Secure Backend Architecture
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorAlert error={error} onRetry={handleRetry} />
        )}

        {/* Form View */}
        {!currentPlan && !isLoading && (
          <div className="max-w-4xl mx-auto">
            <PlanForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
          </div>
        )}

        {/* Result Plan View */}
        {currentPlan && !isLoading && (
          <PlanDisplay plan={currentPlan} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">PlanGenius AI</span>
            <span>• Full-Stack AI Study Planner</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Powered by Google Gemini API</span>
            <span>•</span>
            <span>Express.js Backend + React & Vite Frontend</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
