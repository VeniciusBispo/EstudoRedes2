# EduAI Pro - Enterprise Educational Platform

EduAI Pro é uma plataforma de estudos universal de próxima geração, projetada para transformar qualquer material educacional (PDF, DOCX, Imagens) em um ecossistema de aprendizado interativo com IA.

## 🚀 Arquitetura Enterprise

O projeto foi totalmente refatorado de um HTML monolítico para uma arquitetura moderna e escalável:

- **Frontend**: React 19 + TypeScript + Vite
- **Estilização**: Tailwind CSS 4 + Shadcn/UI + Glassmorphism
- **Estado**: Zustand (Persistente) + React Query
- **Animações**: Framer Motion
- **Visualização**: Chart.js (Laboratório de RF)
- **IA**: Integração modular com Google Gemini 1.5 Pro/Flash
- **Documentos**: PDF.js, Mammoth.js, Tesseract.js (OCR)

## 📂 Estrutura de Pastas

```bash
src/
├── components/ # Componentes atômicos e complexos
├── modules/    # Lógica de domínio (Sinais, IA, Quiz)
├── pages/      # Páginas da aplicação
├── stores/     # Gerenciamento de estado (Zustand)
├── services/   # Integrações externas (API, DB)
└── types/      # Definições TypeScript globais
```

## ✨ Funcionalidades Principais

1. **Laboratório de Sinais RF**: Osciloscópio virtual em tempo real com suporte a AM/FM e ruído.
2. **Dashboard Gamificado**: XP, Níveis, Sequência (Streak) e Radar de Habilidades.
3. **Processamento Universal**: Suporte a múltiplos formatos de arquivo com extração via IA.
4. **Quizzes Adaptativos**: Gerados dinamicamente com base no seu nível de conhecimento.

## 🛡️ Segurança e Escalabilidade

- **Environment Variables**: API Keys não são expostas no código fonte.
- **Offline-First**: Persistência local via Zustand/IndexedDB.
- **PWA**: Instalável e pronto para uso offline.

## 🛠️ Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar ambiente de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

## 📈 Roadmap

- [ ] Backend Serverless (Supabase/Firebase)
- [ ] Sistema de Autenticação (Clerk/Auth.js)
- [ ] Colaboração em Tempo Real
- [ ] Exportação para Anki/Notion
- [ ] Aplicativo Mobile Nativo (React Native)

---
*EduAI Pro - Transformando informação em conhecimento com inteligência.*
