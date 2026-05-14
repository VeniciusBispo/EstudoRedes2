import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudyMaterial, UserStats } from '../types';

interface StudyState {
  materials: StudyMaterial[];
  activeMaterial: StudyMaterial | null;
  stats: UserStats;
  addMaterial: (material: StudyMaterial) => void;
  setActiveMaterial: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  addXp: (amount: number) => void;
  incrementQuestions: (correct: boolean) => void;
}

export const useStudyStore = create<StudyState>()(
  persist(
    (set) => ({
      materials: [],
      activeMaterial: null,
      stats: {
        xp: 0,
        level: 1,
        streak: 0,
        totalQuestionsAnswered: 0,
        correctAnswers: 0,
        studyTimeMinutes: 0,
        achievements: [],
      },
      addMaterial: (material) => 
        set((state) => ({ 
          materials: [material, ...state.materials] 
        })),
      setActiveMaterial: (id) =>
        set((state) => ({
          activeMaterial: state.materials.find((m) => m.id === id) || null
        })),
      updateProgress: (id, progress) =>
        set((state) => ({
          materials: state.materials.map((m) =>
            m.id === id ? { ...m, progress } : m
          )
        })),
      addXp: (amount) =>
        set((state) => {
          const newXp = state.stats.xp + amount;
          const newLevel = Math.floor(newXp / 1000) + 1;
          return {
            stats: {
              ...state.stats,
              xp: newXp,
              level: newLevel
            }
          };
        }),
      incrementQuestions: (correct) =>
        set((state) => ({
          stats: {
            ...state.stats,
            totalQuestionsAnswered: state.stats.totalQuestionsAnswered + 1,
            correctAnswers: correct ? state.stats.correctAnswers + 1 : state.stats.correctAnswers
          }
        })),
    }),
    {
      name: 'edu-ai-pro-storage',
    }
  )
);
