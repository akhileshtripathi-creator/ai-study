import { GoogleGenAI } from '@google/genai';
import { generateMockPlan } from '../utils/mockPlan.js';

/**
 * Checks if the configured Gemini API key is valid / non-placeholder
 */
export function isGeminiKeyConfigured() {
  const key = process.env.GEMINI_API_KEY;
  return Boolean(key && key.trim() !== '' && !key.includes('your_gemini_api_key_here'));
}

/**
 * Generates an AI study plan using Google Gemini API
 * Falls back gracefully to intelligent mock roadmap if key is missing or invalid.
 */
export async function generateStudyPlan(userData) {
  const {
    subjects = [],
    examDate,
    dailyHours = 4,
    preferredTime = 'Morning',
    preparationLevel = 'Intermediate',
    importantTopics = ''
  } = userData;

  // If no Gemini key is provided, use the smart mock generator
  if (!isGeminiKeyConfigured()) {
    console.log('[GeminiService] GEMINI_API_KEY not configured or placeholder detected. Returning comprehensive smart demo plan.');
    const mock = generateMockPlan(userData);
    return {
      ...mock,
      isDemoMode: true,
      notice: 'Running in Demo Mode: GEMINI_API_KEY is not configured in backend/.env. To use live Gemini AI generation, add your key from Google AI Studio.'
    };
  }

  const apiKey = process.env.GEMINI_API_KEY.trim();
  const primaryModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const fallbackModels = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash-lite'];

  const subjectNames = Array.isArray(subjects) ? subjects.join(', ') : subjects;

  const prompt = `
You are an elite academic advisor and cognitive learning strategist.
Create a comprehensive, highly realistic, and actionable study plan based on the following student details:

- Subjects: ${subjectNames}
- Exam Date: ${examDate}
- Available Daily Study Hours: ${dailyHours} hours/day
- Preferred Study Time: ${preferredTime} (optimize the timetable around this peak energy window)
- Current Preparation Level: ${preparationLevel}
- Important / Weak Topics to Prioritize: ${importantTopics || 'Focus on high-weightage core syllabus topics'}

You MUST return ONLY a valid JSON object (no markdown code blocks, no preamble, no backticks).
The JSON MUST follow this exact schema:

{
  "summary": {
    "title": "String - Descriptive motivating title for this plan",
    "examDate": "${examDate}",
    "daysRemaining": Number,
    "dailyHours": ${dailyHours},
    "totalStudyHours": Number,
    "preparationLevel": "${preparationLevel}",
    "preferredTime": "${preferredTime}",
    "strategyOverview": "String - 2 to 3 paragraphs of concrete strategic advice tailored to the student's preparation level and available time."
  },
  "subjectHours": [
    {
      "subject": "String - Subject name",
      "hoursPerWeek": Number,
      "totalHours": Number,
      "percentage": Number,
      "color": "String - Hex color code (e.g., #3B82F6, #8B5CF6, #10B981, #F59E0B, #EC4899)",
      "rationale": "String - Specific reason for this time allocation"
    }
  ],
  "dailyTimetable": [
    {
      "timeSlot": "String - e.g. 07:00 AM - 08:30 AM",
      "subject": "String - Subject name or 'Break'",
      "activity": "String - Specific study action / goal",
      "type": "String - One of: 'Deep Work', 'Practice', 'Revision', 'Break'",
      "notes": "String - Actionable execution tip"
    }
  ],
  "priorityTopics": [
    {
      "subject": "String - Subject name",
      "topic": "String - Topic name",
      "priority": "String - 'High', 'Medium', or 'Low'",
      "estimatedHours": Number,
      "keyConcepts": ["String - concept 1", "String - concept 2", "String - concept 3"],
      "examRelevance": "String - Why this topic is critical for scoring high"
    }
  ],
  "revisionSchedule": [
    {
      "phase": "String - e.g. Phase 1: 24-Hour Active Recall",
      "method": "String - Technique (e.g. Blurting, Flashcards, Error Log review)",
      "frequency": "String - e.g. 20 minutes daily",
      "tips": "String - Practical advice"
    }
  ],
  "practiceSuggestions": [
    {
      "category": "String - e.g. Active Recall, Past Papers, Interleaving, Mock Exams",
      "technique": "String - Specific method name",
      "description": "String - Step-by-step guidance on how to practice effectively"
    }
  ],
  "studyTasks": [
    {
      "id": "String - e.g. task-1, task-2",
      "day": "String - e.g. Day 1, Day 2",
      "subject": "String - Subject name",
      "task": "String - Concrete actionable task with clear completion criteria",
      "estimatedTime": "String - e.g. 1.5 hrs",
      "priority": "String - 'High', 'Medium', or 'Low'",
      "completed": false
    }
  ]
}
`.trim();

  const ai = new GoogleGenAI({ apiKey });

  const modelsToTry = [primaryModel, ...fallbackModels.filter(m => m !== primaryModel)];
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      console.log(`[GeminiService] Attempting generation with model: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        }
      });

      if (!response || !response.text) {
        throw new Error('Gemini API returned an empty response.');
      }

      let parsedData;
      try {
        parsedData = JSON.parse(response.text);
      } catch (parseErr) {
        // In case of markdown formatting or minor wrap
        const cleanedText = response.text
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/\s*```$/, '')
          .trim();
        parsedData = JSON.parse(cleanedText);
      }

      return {
        ...parsedData,
        isDemoMode: false,
        modelUsed: model
      };
    } catch (err) {
      console.warn(`[GeminiService] Model ${model} failed:`, err.message || err);
      lastError = err;
    }
  }

  // If all models failed, check why and return fallback with informative error message
  console.error('[GeminiService] All Gemini model attempts failed:', lastError);
  console.warn('[GeminiService] Falling back to intelligent roadmap generator.');

  const fallback = generateMockPlan(userData);
  return {
    ...fallback,
    isDemoMode: true,
    warning: `Gemini API call encountered an error: ${lastError?.message || 'Unknown error'}. Showing intelligent offline study plan.`,
    apiError: lastError?.message || 'API request failed'
  };
}
