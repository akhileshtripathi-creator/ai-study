/**
 * Generates a realistic mock study plan matching the user's inputs
 * Used when GEMINI_API_KEY is not configured or in demo/offline mode.
 */
export function generateMockPlan(input) {
  const {
    subjects = ['Mathematics', 'Physics', 'Chemistry'],
    examDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dailyHours = 4,
    preferredTime = 'Morning',
    preparationLevel = 'Intermediate',
    importantTopics = ''
  } = input;

  // Calculate days remaining
  const today = new Date();
  const exam = new Date(examDate);
  const diffTime = Math.max(0, exam.getTime() - today.getTime());
  const daysRemaining = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const totalHours = daysRemaining * Number(dailyHours);

  const subjectList = Array.isArray(subjects) 
    ? subjects 
    : String(subjects).split(',').map(s => s.trim()).filter(Boolean);

  const safeSubjects = subjectList.length > 0 ? subjectList : ['Core Subject 1', 'Core Subject 2'];

  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#6366F1'];

  // Calculate subject hours distribution
  const subjectHours = safeSubjects.map((sub, idx) => {
    const rawPct = Math.round(100 / safeSubjects.length);
    const subHours = Math.round((totalHours * (rawPct / 100)));
    return {
      subject: sub,
      hoursPerWeek: Math.max(1, Math.round((Number(dailyHours) * 7) / safeSubjects.length)),
      totalHours: subHours,
      percentage: rawPct,
      color: colors[idx % colors.length],
      rationale: idx === 0 
        ? 'High weighting and foundational concepts require consistent daily practice.' 
        : 'Dedicated time allocated for concept mastering, problem drills, and revision.'
    };
  });

  // Time slot generator based on preferred study time
  const getTimeSlots = (preferred, hours) => {
    const h = Number(hours);
    if (preferred === 'Morning') {
      return [
        { timeSlot: '07:00 AM - 08:30 AM', subject: safeSubjects[0] || 'Subject 1', activity: 'High-cognitive deep study & core theory', type: 'Deep Work', notes: 'Peak morning mental clarity. No distractions.' },
        { timeSlot: '08:30 AM - 09:00 AM', subject: 'Break', activity: 'Nutritious breakfast & hydration', type: 'Break', notes: 'Step away from screen & study desk.' },
        { timeSlot: '09:00 AM - 10:30 AM', subject: safeSubjects[1] || safeSubjects[0], activity: 'Formula derivation and practice problem drills', type: 'Practice', notes: 'Focus on active recall and non-formula-sheet solving.' },
        { timeSlot: '10:30 AM - 11:00 AM', subject: 'Break', activity: 'Rest & physical movement', type: 'Break', notes: 'Stretch and relax eyes.' },
        ...(h > 3 ? [{ timeSlot: '11:00 AM - 12:00 PM', subject: safeSubjects[2] || safeSubjects[0], activity: 'Speed review & error analysis notebook', type: 'Revision', notes: 'Review mistakes made during the morning drills.' }] : [])
      ];
    } else if (preferred === 'Evening') {
      return [
        { timeSlot: '04:00 PM - 05:30 PM', subject: safeSubjects[0], activity: 'Focused problem solving & difficult concepts', type: 'Deep Work', notes: 'Tackle the hardest topics first.' },
        { timeSlot: '05:30 PM - 06:00 PM', subject: 'Break', activity: 'Evening walk & tea break', type: 'Break', notes: 'Recharge mental energy.' },
        { timeSlot: '06:00 PM - 07:30 PM', subject: safeSubjects[1] || safeSubjects[0], activity: 'Topic synthesis, mind mapping & practice questions', type: 'Practice', notes: 'Active problem solving.' },
        { timeSlot: '07:30 PM - 08:30 PM', subject: 'Break', activity: 'Dinner & rest', type: 'Break', notes: 'Unwind before review session.' },
        ...(h > 3 ? [{ timeSlot: '08:30 PM - 09:30 PM', subject: safeSubjects[2] || safeSubjects[0], activity: 'Flashcard review & quick recall self-test', type: 'Revision', notes: 'Spaced repetition before winding down.' }] : [])
      ];
    } else if (preferred === 'Night') {
      return [
        { timeSlot: '08:00 PM - 09:30 PM', subject: safeSubjects[0], activity: 'Core theory & intense textbook problem solving', type: 'Deep Work', notes: 'Quiet environment, phone in Do Not Disturb.' },
        { timeSlot: '09:30 PM - 09:45 PM', subject: 'Break', activity: 'Hydration and stretching', type: 'Break', notes: 'Breathe and relax muscles.' },
        { timeSlot: '09:45 PM - 11:15 PM', subject: safeSubjects[1] || safeSubjects[0], activity: 'Mock exam questions & active recall testing', type: 'Practice', notes: 'Closed-book practice problems.' },
        ...(h > 3 ? [{ timeSlot: '11:30 PM - 12:30 AM', subject: safeSubjects[2] || safeSubjects[0], activity: 'Summary sheets & memory reinforcement', type: 'Revision', notes: 'Consolidate today’s learnings before sleep.' }] : [])
      ];
    } else {
      // Flexible / Afternoon
      return [
        { timeSlot: '02:00 PM - 03:30 PM', subject: safeSubjects[0], activity: 'Deep study on key principles', type: 'Deep Work', notes: 'Focus block with Pomodoro timer.' },
        { timeSlot: '03:30 PM - 04:00 PM', subject: 'Break', activity: 'Coffee / tea break', type: 'Break', notes: 'Physical movement.' },
        { timeSlot: '04:00 PM - 05:30 PM', subject: safeSubjects[1] || safeSubjects[0], activity: 'Applied exercises & past paper question sets', type: 'Practice', notes: 'Work through chapter-end exercises.' },
        ...(h > 3 ? [{ timeSlot: '06:00 PM - 07:00 PM', subject: safeSubjects[2] || safeSubjects[0], activity: 'Concept consolidation & flashcard drills', type: 'Revision', notes: 'Test yourself on today’s topics.' }] : [])
      ];
    }
  };

  // Priority topics parsing or generating
  const rawTopics = importantTopics 
    ? importantTopics.split(/[,;\n]+/).map(t => t.trim()).filter(Boolean)
    : [];

  const priorityTopics = (rawTopics.length > 0 ? rawTopics : [
    'Core Fundamentals & Key Theorems',
    'High-Weightage Application Problems',
    'Historical Frequently Tested Questions',
    'Formula Derivations & Edge Cases'
  ]).map((topic, i) => ({
    subject: safeSubjects[i % safeSubjects.length],
    topic: topic,
    priority: i === 0 ? 'High' : (i % 2 === 1 ? 'High' : 'Medium'),
    estimatedHours: Math.max(3, Math.round(totalHours / (rawTopics.length || 4))),
    keyConcepts: [
      'Foundational definitions and core equations',
      'Step-by-step problem solving methodology',
      'Common pitfalls and trick questions'
    ],
    examRelevance: i === 0 
      ? 'Crucial high-yield area; consistently forms 20-30% of exam questions.'
      : 'Core conceptual pillar frequently evaluated in multi-part exam problems.'
  }));

  // Revision Schedule
  const revisionSchedule = [
    {
      phase: 'Phase 1: Immediate Recall (Day 1 - 2)',
      method: 'Blurting technique & 1-page summary sheet',
      frequency: '15-20 minutes after completing each topic',
      tips: 'Write down everything remembered without consulting notes, then fill gaps with red ink.'
    },
    {
      phase: 'Phase 2: Spaced Testing (Days 7 & 14)',
      method: 'Closed-book flashcards & timed sub-topic tests',
      frequency: '2 sessions per week (45 mins each)',
      tips: 'Target high-difficulty questions and rework any questions flagged in your error log.'
    },
    {
      phase: 'Phase 3: Cumulative Synthesis (Final 2 Weeks)',
      method: 'Interleaved past papers under strict exam conditions',
      frequency: 'Every 2 days (full exam block)',
      tips: 'Simulate exact exam timing, seating, and zero formula sheets to build test stamina.'
    },
    {
      phase: 'Phase 4: Pre-Exam Taper (Last 48 Hours)',
      method: 'High-level formula sheet review & light concept scanning',
      frequency: '2-3 hours light review, early sleep',
      tips: 'Do not attempt new difficult topics. Focus on mindset, rest, and confidence.'
    }
  ];

  // Practice Suggestions
  const practiceSuggestions = [
    {
      category: 'Active Recall',
      technique: 'The Feynman Explanation Technique',
      description: 'Teach each difficult topic out loud to an imaginary beginner without notes. If you stumble, immediately revisit that exact section.'
    },
    {
      category: 'Exam Simulation',
      technique: 'Strictly Timed Past Exam Papers',
      description: 'Attempt at least 3 full-length past papers with a stopwatch. Analyze every incorrect answer in a dedicated Error Log.'
    },
    {
      category: 'Interleaved Drills',
      technique: 'Mixed Problem Sets',
      description: 'Rather than solving 20 identical problems from one chapter, mix 4 problems each from 5 different chapters to train problem-recognition skills.'
    },
    {
      category: 'Memory Anchor',
      technique: 'Two-Column Summary Cheatsheets',
      description: 'Create concise 1-page summary sheets containing only high-risk formulas, edge cases, and unit conversions.'
    }
  ];

  // Actionable Study Tasks with completion tracking
  const studyTasks = [
    {
      id: 'task-1',
      day: 'Day 1',
      subject: safeSubjects[0],
      task: `Establish baseline diagnostic test for ${safeSubjects[0]}`,
      estimatedTime: '1.5 hrs',
      priority: 'High',
      completed: false
    },
    {
      id: 'task-2',
      day: 'Day 1',
      subject: safeSubjects[1] || safeSubjects[0],
      task: 'Organize syllabus checklist and mark known vs unknown topics',
      estimatedTime: '1 hr',
      priority: 'Medium',
      completed: false
    },
    {
      id: 'task-3',
      day: 'Day 2',
      subject: safeSubjects[0],
      task: `Master first priority topic: ${priorityTopics[0]?.topic || 'Core Theory'}`,
      estimatedTime: '2 hrs',
      priority: 'High',
      completed: false
    },
    {
      id: 'task-4',
      day: 'Day 2',
      subject: safeSubjects[1] || safeSubjects[0],
      task: 'Solve 15 foundational exercises and record mistakes in Error Log',
      estimatedTime: '2 hrs',
      priority: 'High',
      completed: false
    },
    {
      id: 'task-5',
      day: 'Day 3',
      subject: safeSubjects[safeSubjects.length > 2 ? 2 : 0],
      task: 'Create formula cheat-sheet and 1-page visual mind map',
      estimatedTime: '1.5 hrs',
      priority: 'Medium',
      completed: false
    },
    {
      id: 'task-6',
      day: 'Day 4',
      subject: safeSubjects[0],
      task: 'Active recall flashcard drill on weak areas from Day 1-2',
      estimatedTime: '1 hr',
      priority: 'Medium',
      completed: false
    },
    {
      id: 'task-7',
      day: 'Day 5',
      subject: safeSubjects[1] || safeSubjects[0],
      task: 'Timed 45-minute past question set under exam conditions',
      estimatedTime: '1.5 hrs',
      priority: 'High',
      completed: false
    },
    {
      id: 'task-8',
      day: 'Day 7',
      subject: 'All Subjects',
      task: 'Weekly review & retrospective: adjust schedule based on progress',
      estimatedTime: '1.5 hrs',
      priority: 'High',
      completed: false
    }
  ];

  return {
    isDemoMode: true,
    summary: {
      title: `${daysRemaining}-Day Personalized Master Study Roadmap`,
      examDate,
      daysRemaining,
      dailyHours: Number(dailyHours),
      totalStudyHours: totalHours,
      preparationLevel,
      preferredTime,
      strategyOverview: `This tailored strategy is calibrated for your ${preparationLevel} level across ${safeSubjects.length} subjects. With ${daysRemaining} days left (${dailyHours} hrs/day = ${totalHours} total hours), the plan balances high-yield concept absorption in your peak ${preferredTime} window with systematic spaced revision and deliberate practice.`
    },
    subjectHours,
    dailyTimetable: getTimeSlots(preferredTime, dailyHours),
    priorityTopics,
    revisionSchedule,
    practiceSuggestions,
    studyTasks
  };
}
