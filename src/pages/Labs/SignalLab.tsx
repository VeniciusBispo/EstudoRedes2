import React, { useState, useMemo } from 'react';
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
import { 
  Activity, 
  Settings2, 
  Waves, 
  Zap, 
  Radio, 
  Info,
  Maximize2
} from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [noise, setNoise] = useState(0);
  const [waveType, setWaveType] = useState<'sine' | 'square' | 'sawtooth' | 'triangle'>('sine');
  const [modulation, setModulation] = useState<'none' | 'AM' | 'FM'>('none');

  const generateWavePoints = () => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const t = i / 100;
      let y = 0;
      
      const freq = modulation === 'FM' ? frequency + 2 * Math.sin(2 * Math.PI * 1 * t) : frequency;
      const amp = modulation === 'AM' ? amplitude * (1 + 0.5 * Math.sin(2 * Math.PI * 1 * t)) : amplitude;

      switch (waveType) {
        case 'sine':
          y = amp * Math.sin(2 * Math.PI * freq * t);
          break;
        case 'square':
          y = Math.sin(2 * Math.PI * freq * t) >= 0 ? amp : -amp;
          break;
        case 'sawtooth':
          y = 2 * amp * (t * freq - Math.floor(0.5 + t * freq));
          break;
        case 'triangle':
          y = amp * (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * freq * t));
          break;
      }
      
      // Add noise
      if (noise > 0) {
        y += (Math.random() - 0.5) * noise * 20;
      }
      
      points.push(y);
    }
    return points;
  };

  const chartData = useMemo(() => {
    const points = generateWavePoints();
    return {
      labels: Array.from({ length: 100 }, (_, i) => (i / 100).toFixed(2)),
      datasets: [
        {
          label: 'Sinal em Tempo Real',
          data: points,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          tension: waveType === 'sine' ? 0.4 : 0,
        },
      ],
    };
  }, [frequency, amplitude, noise, waveType, modulation]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 100 },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#71717a', font: { size: 10 } },
      },
      y: {
        min: -150,
        max: 150,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#71717a', font: { size: 10 } },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="text-primary" />
            Laboratório de Sinais RF
          </h2>
          <p className="text-muted-foreground mt-1">Simulação avançada de ondas eletromagnéticas e modulação.</p>
        </div>
        <div className="flex gap-2">
          <button className="glass px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors">
            <Radio size={16} /> Espectrograma
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Maximize2 size={16} /> Tela Cheia
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="premium-card space-y-8">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Settings2 size={18} className="text-primary" />
              <h3 className="font-bold">Parâmetros de Onda</h3>
            </div>

            {/* Wave Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tipo de Onda</label>
              <div className="grid grid-cols-2 gap-2">
                {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setWaveType(type as any)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      waveType === type ? 'bg-primary text-white' : 'glass hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Frequência</label>
                <span className="text-primary font-bold">{frequency} Hz</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Amplitude */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Amplitude</label>
                <span className="text-primary font-bold">{amplitude} V</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={amplitude}
                onChange={(e) => setAmplitude(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Noise */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Ruído (AWGN)</label>
                <span className="text-destructive font-bold">{noise}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={noise}
                onChange={(e) => setNoise(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-destructive"
              />
            </div>

            <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex gap-3">
              <Info className="text-primary shrink-0" size={18} />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong>Modulação FM:</strong> Altera a frequência instantânea do sinal com base em uma onda portadora de 1Hz.
              </p>
            </div>
          </div>
        </div>

        {/* Visualizer Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="premium-card flex-1 h-[500px] relative overflow-hidden">
            <div className="absolute top-4 left-6 z-10">
              <div className="flex gap-2">
                <span className="px-2 py-1 glass text-[10px] font-bold text-green-500 rounded flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
                </span>
                <span className="px-2 py-1 glass text-[10px] font-bold text-primary rounded">OSCILOSCÓPIO</span>
              </div>
            </div>
            <Line data={chartData} options={options} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="premium-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                  <Waves size={20} />
                </div>
                <h4 className="font-bold text-sm">Largura de Banda</h4>
              </div>
              <p className="text-2xl font-bold tracking-tighter">{(frequency * 1.5).toFixed(2)} MHz</p>
              <p className="text-[10px] text-muted-foreground mt-1">Estimativa de ocupação espectral</p>
            </div>
            <div className="premium-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                  <Zap size={20} />
                </div>
                <h4 className="font-bold text-sm">SNR Estimado</h4>
              </div>
              <p className="text-2xl font-bold tracking-tighter">{noise === 0 ? '∞' : (20 - noise * 2).toFixed(1)} dB</p>
              <p className="text-[10px] text-muted-foreground mt-1">Relação sinal-ruído calculada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalLab;
