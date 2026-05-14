import React from 'react';
import { 
  Trophy, 
  Target, 
  Clock, 
  Flame, 
  ArrowUpRight, 
  CheckCircle2,
  Brain,
  History
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudyStore } from '../../stores/useStudyStore';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const { stats, materials } = useStudyStore();

  const performanceData = {
    labels: ['Redes', 'IoT', 'Protocolos', 'Sinais', 'Hardware', 'Software'],
    datasets: [
      {
        label: 'Nível de Domínio',
        data: [85, 70, 90, 65, 55, 80],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: '#8b5cf6',
        borderWidth: 2,
        pointBackgroundColor: '#8b5cf6',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        pointLabels: { color: '#a1a1aa', font: { size: 10 } },
        ticks: { display: false },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-extrabold tracking-tight">Bem-vindo de volta!</h2>
        <p className="text-muted-foreground mt-2">Você progrediu <span className="text-primary font-bold">15%</span> a mais esta semana. Continue assim!</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Trophy, label: 'Experiência Total', value: `${stats.xp} XP`, color: 'text-yellow-500' },
          { icon: Target, label: 'Precisão', value: `${stats.totalQuestionsAnswered ? Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100) : 0}%`, color: 'text-blue-500' },
          { icon: Clock, label: 'Tempo de Estudo', value: `${stats.studyTimeMinutes} min`, color: 'text-green-500' },
          { icon: Flame, label: 'Sequência', value: `${stats.streak} dias`, color: 'text-orange-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="premium-card group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Radar */}
        <div className="lg:col-span-1 premium-card">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="text-primary" size={24} />
            <h3 className="font-bold text-lg">Perfil de Habilidades</h3>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <Radar data={performanceData} options={radarOptions} />
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Melhor Desempenho</span>
              <span className="text-primary font-bold">Protocolos</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Área para Melhorar</span>
              <span className="text-destructive font-bold">Hardware</span>
            </div>
          </div>
        </div>

        {/* Recent Materials & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <History className="text-primary" size={24} />
                <h3 className="font-bold text-lg">Materiais Recentes</h3>
              </div>
              <button className="text-primary text-sm font-bold hover:underline">Ver todos</button>
            </div>
            
            <div className="space-y-4">
              {materials.length > 0 ? materials.slice(0, 3).map((material) => (
                <div key={material.id} className="flex items-center gap-4 p-4 glass rounded-xl group hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{material.title}</h4>
                    <p className="text-xs text-muted-foreground">Último estudo: {new Date(material.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{material.progress}%</p>
                    <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${material.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground italic">Nenhum material processado ainda.</p>
                </div>
              )}
            </div>
          </div>

          <div className="premium-card bg-primary/10 border-primary/20 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Pronto para o próximo desafio?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Suba de nível gerando um novo simulado baseado no seu histórico de erros.
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                Iniciar Simulado Adaptativo
              </button>
            </div>
            <Zap className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-primary/10 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
