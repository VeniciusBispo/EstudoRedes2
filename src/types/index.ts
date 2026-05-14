export type Difficulty = 'Básico' | 'Intermediário' | 'Avançado';

export type QuestionType = 'Múltipla Escolha' | 'Verdadeiro/Falso' | 'Dissertativa';

export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  type: QuestionType;
  category?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  questions: Question[];
  flashcards: Flashcard[];
  createdAt: number;
  lastStudiedAt?: number;
  progress: number; // 0-100
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  studyTimeMinutes: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number;
}

export interface SignalConfig {
  frequency: number;
  amplitude: number;
  phase: number;
  type: 'sine' | 'square' | 'sawtooth' | 'triangle';
  modulation?: {
    type: 'AM' | 'FM';
    carrierFreq: number;
    index: number;
  };
  noise: number;
}
