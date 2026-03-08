export type ExamType = 'ACC' | 'PCC_MCC';

export type Difficulty = '初級' | '中級' | '上級';

export interface BaseQuestion {
  id: string;
  exam: ExamType;
  domain: string;
  competency: string;
  source_basis: string;
  difficulty: Difficulty;
  rationale: string;
  explanation: string;
  tags: string[];
}

export interface AccQuestion extends BaseQuestion {
  exam: 'ACC';
  stem: string;
  choices: string[];
  correctAnswer: number;
}

export interface PccMccQuestion extends BaseQuestion {
  exam: 'PCC_MCC';
  scenario: string;
  choices: string[];
  bestAnswer: number;
  worstAnswer: number;
  bestRationale: string;
  worstRationale: string;
}

export type Question = AccQuestion | PccMccQuestion;

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  selectedWorstAnswer?: number;
  isCorrect: boolean;
  confidence: 1 | 2 | 3 | 4 | 5;
  responseTimeMs: number;
  answeredAt: string;
}

export interface QuizSession {
  id: string;
  exam: ExamType;
  startedAt: string;
  completedAt?: string;
  answers: QuizAnswer[];
}
