import express from 'express';
import { generateStudyPlan, isGeminiKeyConfigured } from '../services/geminiService.js';

const router = express.Router();

/**
 * GET /api/planner/status
 * Returns system readiness and whether GEMINI_API_KEY is configured
 */
router.get('/status', (req, res) => {
  const hasKey = isGeminiKeyConfigured();
  res.json({
    status: 'ok',
    geminiConfigured: hasKey,
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    message: hasKey
      ? 'Gemini API is ready for live generation.'
      : 'Gemini API key is not configured. Running in Demo / Smart-Mock mode.'
  });
});

/**
 * POST /api/planner/generate
 * Generates personalized study plan
 */
router.post('/generate', async (req, res) => {
  try {
    const {
      subjects,
      examDate,
      dailyHours,
      preferredTime,
      preparationLevel,
      importantTopics
    } = req.body;

    // Validate inputs
    const subjectList = Array.isArray(subjects)
      ? subjects.filter(s => typeof s === 'string' && s.trim().length > 0)
      : (typeof subjects === 'string' ? subjects.split(',').map(s => s.trim()).filter(Boolean) : []);

    if (!subjectList || subjectList.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please enter at least one subject.'
      });
    }

    if (!examDate) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your exam date.'
      });
    }

    const hours = Number(dailyHours);
    if (isNaN(hours) || hours <= 0 || hours > 24) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid number of daily study hours between 1 and 24.'
      });
    }

    const plan = await generateStudyPlan({
      subjects: subjectList,
      examDate,
      dailyHours: hours,
      preferredTime: preferredTime || 'Morning',
      preparationLevel: preparationLevel || 'Intermediate',
      importantTopics: importantTopics || ''
    });

    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('[PlannerRoute] Error generating plan:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while generating study plan.'
    });
  }
});

export default router;
