# EduAI Pro - Sistema Universal de Geração de Questões com IA

EduAI Pro é um ecossistema educacional avançado que utiliza Inteligência Artificial para transformar qualquer tipo de material (PDF, Imagens, Texto, Links) em uma experiência completa de aprendizado.

## 🚀 Funcionalidades Principais

- **Upload Multiformato**: Suporte para PDF, DOCX, Imagens (OCR), Texto manual e Links.
- **Geração Inteligente**: Cria automaticamente resumos, flashcards, questões de múltipla escolha e discursivas.
- **Personalização Total**: Escolha dificuldade (Básico ao Acadêmico), idioma e estilo de questões (ENEM, Vestibular, Técnico).
- **Modo "Estude Este Material"**: Um fluxo automatizado que prepara um plano de estudo completo a partir de um arquivo.
- **Interface Premium**: Design moderno inspirado em Notion e Quizlet, com animações fluidas e modo escuro.
- **Persistência Local**: Seus materiais e progresso são salvos localmente usando IndexedDB.

## 🛠️ Stack Tecnológica

- **Frontend**: React + TypeScript + Vite
- **Estilização**: Vanilla CSS (Premium Design System)
- **Animações**: Framer Motion
- **Processamento de Documentos**: 
  - PDF.js (PDF)
  - Mammoth.js (DOCX)
  - Tesseract.js (OCR de Imagens)
- **IA**: Gemini API (Simulado na versão atual)
- **Banco de Dados**: IndexedDB (via `idb`)

## 📂 Estrutura do Projeto

- `src/components/`: Componentes modulares de UI.
- `src/services/`: Lógica de IA, Parsing de arquivos e Banco de Dados.
- `src/types.ts`: Definições de tipos do sistema.
- `src/index.css`: Design system global.

## 📝 Como Usar

1. Arraste um arquivo para a área de upload ou cole um texto.
2. Aguarde a IA processar o conteúdo.
3. Navegue entre as abas de Resumo, Questões e Flashcards.
4. Pratique com as questões geradas e revise com os flashcards animados.

---
Desenvolvido com ❤️ para transformar a educação.
