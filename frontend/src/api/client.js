const API_BASE = '/api/planner';

/**
 * Fetch backend status and Gemini configuration state
 */
export async function getPlannerStatus() {
  try {
    const res = await fetch(`${API_BASE}/status`);
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch planner status:', err);
    return {
      status: 'offline',
      geminiConfigured: false,
      message: 'Backend server is connecting...'
    };
  }
}

/**
 * Send user study details to backend to generate personalized plan
 */
export async function generateStudyPlanApi(payload) {
  try {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || `Server error (HTTP ${res.status})`);
    }

    return data.data;
  } catch (err) {
    console.error('API Error generating study plan:', err);
    throw err;
  }
}
