import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Activity, Info } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SignalLab: React.FC = () => {
  const [frequency, setFrequency] = useState(2);
  const [amplitude, setAmplitude] = useState(50);

  const labels = Array.from({ length: 100 }, (_, i) => (i / 100).toFixed(2));
  const data = {
    labels,
    datasets: [
      {
        label: 'Sinal Analógico Senoidal',
        data: labels.map(t => amplitude * Math.sin(2 * Math.PI * frequency * parseFloat(t))),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 200 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `Amplitude: ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Tempo (segundos)', color: '#a1a1aa' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#71717a' },
      },
      y: {
        min: -100,
        max: 100,
        title: { display: true, text: 'Amplitude', color: '#a1a1aa' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#71717a' },
      },
    },
  };

  return (
    <div className="signal-lab animate-fade">
      <div className="premium-card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Activity className="gradient-text" />
              Laboratório de Sinais
            </h3>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Frequência (Hz): <span style={{ color: 'var(--accent-tertiary)', fontWeight: 700, fontSize: '1.1rem' }}>{frequency}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={frequency} 
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-tertiary)' }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Amplitude: <span style={{ color: 'var(--accent-secondary)', fontWeight: 700, fontSize: '1.1rem' }}>{amplitude}</span>
              </label>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={amplitude} 
                onChange={(e) => setAmplitude(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-secondary)' }}
              />
            </div>

            <div className="glass" style={{ padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-secondary)' }}>
                <Info size={16} />
                <span style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Regra de Ouro</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Frequência <strong>Alta</strong> = Comprimento de Onda <strong>Menor</strong>.<br />
                Frequência <strong>Baixa</strong> = Comprimento de Onda <strong>Maior</strong>.
              </p>
            </div>
          </div>

          <div style={{ flex: 2, minWidth: '300px', height: '400px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '16px' }}>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalLab;
