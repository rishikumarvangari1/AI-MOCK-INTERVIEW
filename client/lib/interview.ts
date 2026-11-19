export type Level = "beginner" | "intermediate" | "advanced";
export type Verdict = "correct" | "partial" | "incorrect";
export type FitKey = "excellent" | "good" | "moderate" | "needs-improvement";
export type TopicStatus = "strong" | "average" | "weak";
export type InterviewStatus = "in_progress" | "completed" | "abandoned";

export type Question = {
  id: number;
  text: string;
  level: Level;
  topic: string;
};

export type QuestionEvaluation = {
  questionId: number;
  score: number;
  maxScore: number;
  verdict: Verdict;
  expectedAnswer: string;
  keyConcepts: string[];
  correctnessAnalysis: string;
  didWell: string;
  improve: string;
  suggestedAnswer: string;
};

export type TopicPerformance = {
  topic: string;
  earned: number;
  max: number;
  percent: number;
  status: TopicStatus;
};

export type RoadmapItem = {
  topic: string;
  priority: 1 | 2 | 3;
  why: string;
  concepts: string[];
  exercises: string[];
  miniProject: string;
  resources: string[];
  duration: string;
};

export type Report = {
  totalScore: number;
  maxScore: number;
  percentage: number;
  fit: { key: FitKey; label: string; description: string };
  correct: number;
  partial: number;
  incorrect: number;
  technicalLevel: string;
  strengths: string[];
  weaknesses: string[];
  overallFeedback: string;
  careerReadiness: string;
  recommendations: string[];
  topics: TopicPerformance[];
  roadmap: RoadmapItem[];
  disclaimer: string;
};

export type InterviewRecord = {
  id: string;
  userId: string;
  domainId: string;
  domainTitle: string;
  status: InterviewStatus;
  createdAt: string;
  completedAt?: string;
  questions: Question[];
  answers: (string | null)[];
  evaluations?: QuestionEvaluation[];
  report?: Report;
};

export type PublicInterview = Omit<InterviewRecord, "userId">;