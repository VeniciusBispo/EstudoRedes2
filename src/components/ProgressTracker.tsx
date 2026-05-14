import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, BookOpen, CheckCircle } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const stats = [
    { label: 'Questões Respondidas', value: '124', icon: Target, color: '#8b5cf6' },
    { label: 'Tempo de Estudo', value: '12h 30m', icon: Clock, color: '#3b82f6' },
    { label: 'Materiais Processados', value: '18', icon: BookOpen, color: '#d946ef' },
    { label: 'Taxa de Acerto', value: '85%', icon: CheckCircle, color: '#10b981' },
  ];

  return (
    <div className="progress-tracker animate-fade">
      <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Suas <span className="gradient-text">Estatísticas</span></h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="premium-card"
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: `${stat.color}15`,
              color: stat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <stat.icon size={28} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="premium-card" style={{ marginTop: '40px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Gráfico de evolução semanal (Em breve)</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
