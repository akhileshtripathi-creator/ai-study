import React from 'react';
import { AlertCircle, RefreshCw, Key } from 'lucide-react';

export default function ErrorAlert({ error, onRetry }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto my-8 shadow-sm text-left">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 shrink-0 mt-0.5">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-rose-900 mb-1">
            Unable to Generate Study Plan
          </h3>
          <p className="text-sm text-rose-700 leading-relaxed mb-4">
            {error || 'An unexpected error occurred while communicating with the study planner API.'}
          </p>

          <div className="bg-white/80 rounded-xl p-3.5 border border-rose-200 text-xs text-rose-800 space-y-1 mb-5">
            <div className="font-semibold text-rose-900 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              Quick Troubleshooting:
            </div>
            <div>• Ensure the backend Express server is running on port 5000 (`npm run dev` in backend folder).</div>
            <div>• If using your own Gemini key, verify that your GEMINI_API_KEY is active in `backend/.env`.</div>
            <div>• Check your network connection.</div>
          </div>

          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
