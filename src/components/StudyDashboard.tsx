import SignalLab from './SignalLab';
import { 
  FileText, 
  Activity, 
  HelpCircle, 
  Layers, 
  Lightbulb,
  ChevronRight,
  Brain,
  ArrowRight
} from 'lucide-react';
import type { StudyMaterial } from '../types';

import Flashcard from './Flashcard';

interface StudyDashboardProps {
  material: StudyMaterial;
}

const StudyDashboard: React.FC<StudyDashboardProps> = ({ material }) => {
  const [activeTab, setActiveTab] = useState<'teoria' | 'lab' | 'questoes' | 'flashcards'>('teoria');

  const tabs = [
    { id: 'teoria', icon: FileText, label: 'Teoria Interativa' },
    { id: 'lab', icon: Activity, label: 'Lab. de Sinais' },
    { id: 'questoes', icon: HelpCircle, label: 'Banco de Questões' },
    { id: 'flashcards', icon: Layers, label: 'Flashcards' },
  ];

  return (
    <div className="study-dashboard">
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-primary)', marginBottom: '8px' }}>
          <Brain size={24} />
          <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Material Analisado por IA</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>{material.title}</h1>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {material.topics.map((topic, i) => (
            <span key={i} className="glass" style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              #{topic}
            </span>
          ))}
        </div>
      </header>

      <nav className="glass" style={{ 
        display: 'flex', 
        padding: '6px', 
        borderRadius: '16px', 
        marginBottom: '32px',
        maxWidth: 'fit-content',
        overflowX: 'auto'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'teoria' && (
            <div className="summary-content">
              <div className="premium-card" style={{ marginBottom: '32px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Lightbulb className="gradient-text" />
                  Visão Geral do Conteúdo
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  {material.summary}
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div className="premium-card">
                  <h4 style={{ marginBottom: '16px', color: 'var(--accent-tertiary)', borderBottom: '1px solid var(--glass-border)', pb: '8px' }}>Tópicos Principais</h4>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {material.topics.map((topic, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--glass)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-tertiary)' }}></div>
                          <span style={{ fontSize: '0.9rem' }}>{topic}</span>
                        </div>
                        <ArrowRight size={14} color="var(--text-secondary)" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="premium-card">
                  <h4 style={{ marginBottom: '16px', color: 'var(--accent-secondary)', borderBottom: '1px solid var(--glass-border)', pb: '8px' }}>Conceitos Chave</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Os elementos identificados como fundamentais para a compreensão deste material incluem a análise de sinais, fluxo de dados e arquiteturas de interconexão.
                  </p>
                  <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span className="glass" style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem' }}>Analógico</span>
                    <span className="glass" style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem' }}>Digital</span>
                    <span className="glass" style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem' }}>Full-Duplex</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lab' && (
            <SignalLab />
          )}

          {activeTab === 'questoes' && (
            <div className="questions-grid" style={{ display: 'grid', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Total de {material.questions.length} questões geradas</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Simulado ENEM</button>
                  <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Técnico</button>
                </div>
              </div>
              {material.questions.map((q) => (
                <div key={q.id} className="premium-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      fontSize: '0.7rem', 
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--accent-primary)',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      {q.difficulty}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{q.type}</span>
                  </div>
                  <h3 style={{ marginBottom: '20px', lineHeight: '1.5' }}>{q.question}</h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {q.options?.map((opt, idx) => (
                      <button 
                        key={idx}
                        className="glass"
                        style={{
                          textAlign: 'left',
                          padding: '16px',
                          borderRadius: '12px',
                          border: '1px solid var(--glass-border)',
                          cursor: 'pointer',
                          transition: 'var(--transition-smooth)',
                          color: 'var(--text-primary)'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
                      >
                        <span style={{ fontWeight: 700, marginRight: '12px', color: 'var(--accent-primary)' }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
               {material.flashcards.map(card => (
                 <Flashcard key={card.id} front={card.front} back={card.back} />
               ))}
            </div>
          )}


          {activeTab === 'mindmap' && (
            <div className="premium-card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ textAlign: 'center' }}>
                <MapIcon size={48} style={{ marginBottom: '16px' }} />
                <p>Visualização de Mapa Mental em construção...</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StudyDashboard;
