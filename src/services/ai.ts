import axios from 'axios';
import type { StudyMaterial } from '../types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const processContent = async (text: string, apiKey: string): Promise<Partial<StudyMaterial>> => {
  const prompt = `
    Analise o seguinte conteúdo educacional e gere um material de estudo completo em formato JSON.
    O JSON deve seguir exatamente esta estrutura:
    {
      "title": "Título sugerido",
      "summary": "Resumo detalhado em markdown",
      "topics": ["Tópico 1", "Tópico 2"],
      "questions": [
        {
          "question": "Pergunta",
          "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
          "correctAnswer": "Opção A",
          "explanation": "Explicação detalhada",
          "difficulty": "Médio",
          "type": "Múltipla Escolha"
        }
      ],
      "flashcards": [
        { "front": "Frente", "back": "Verso" }
      ]
    }
    
    Conteúdo: ${text.substring(0, 5000)}
  `;

  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${apiKey}`, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const resultText = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(resultText);
  } catch (error) {
    console.error('Error processing AI content:', error);
    throw new Error('Falha ao processar conteúdo com IA');
  }
};
