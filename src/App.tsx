import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dropzone from './components/Dropzone';
import StudyDashboard from './components/StudyDashboard';
import { StudyMaterial } from './types';
import { processContent } from './services/ai';
import { Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressTracker from './components/ProgressTracker';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentMaterial, setCurrentMaterial] = useState<StudyMaterial | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNewStudy = () => {
    setCurrentMaterial(null);
    setActiveTab('dashboard');
  };

  const handleFilesAccepted = async (files: File[]) => {
    setIsProcessing(true);
    // In a real app, you'd extract text from files here
    // For now, we simulate processing the first file
    const material = await processContent("Conteúdo extraído do arquivo " + files[0].name, files[0].name);
    setCurrentMaterial(material);
    setIsProcessing(false);
  };

  const handleTextSubmit = async (text: string) => {
    setIsProcessing(true);
    const material = await processContent(text, "Estudo Manual");
    setCurrentMaterial(material);
    setIsProcessing(false);
  };

  return (
    <div className="app-container">
      <Sidebar 
        onNewStudy={handleNewStudy} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'stats' ? (
            <ProgressTracker />
          ) : isProcessing ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px'
              }}
            >
              <div style={{ position: 'relative' }}>
                <Loader2 size={64} className="gradient-text" style={{ animation: 'spin 2s linear infinite' }} />
                <Sparkles size={24} style={{ position: 'absolute', top: -10, right: -10, color: 'var(--accent-secondary)' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>IA Processando...</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Interpretando conteúdo, extraindo tópicos e gerando questões...</p>
              </div>
              
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </motion.div>
          ) : currentMaterial ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <StudyDashboard material={currentMaterial} />
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ paddingTop: '60px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '16px' }}>
                  O que vamos <span className="gradient-text">aprender</span> hoje?
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                  Envie qualquer material e transforme-o em um ecossistema completo de estudo com o poder da Inteligência Artificial.
                </p>
              </div>
              
              <Dropzone 
                onFilesAccepted={handleFilesAccepted} 
                onTextSubmit={handleTextSubmit} 
              />

              <div style={{ 
                marginTop: '80px', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '24px',
                opacity: 0.7
              }}>
                {[
                  { title: 'Simulados ENEM', desc: 'Questões no padrão oficial' },
                  { title: 'Flashcards Anki', desc: 'Repetição espaçada' },
                  { title: 'Mapas Mentais', desc: 'Conexões visuais' },
                  { title: 'Resumos Notion', desc: 'Estrutura inteligente' }
                ].map((feat, i) => (
                  <div key={i} className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
                    <h4 style={{ marginBottom: '4px' }}>{feat.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
