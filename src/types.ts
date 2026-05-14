export type QuestionType = 'multiple' | 'discursive' | 'boolean' | 'technical' | 'enem';
export type Difficulty = 'basic' | 'intermediate' | 'advanced' | 'technical' | 'academic' | 'concurso' | 'enem' | 'certification';

export type Question = {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  topic?: string;
}

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  topic?: string;
  difficulty: Difficulty;
}

export type StudyMaterial = {
  id: string;
  title: string;
  content: string;
  summary: string;
  topics: string[];
  questions: Question[];
  flashcards: Flashcard[];
  createdAt: number;
}

export type UserStats = {
  totalQuestions: number;
  correctAnswers: number;
  studyTime: number;
  materialsProcessed: number;
}
