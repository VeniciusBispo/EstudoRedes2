import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Activity, 
  Brain, 
  Upload, 
  Settings, 
  Zap,
  Trophy,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudyStore } from '../../stores/useStudyStore';

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'Materiais', path: '/study' },
  { icon: Activity, label: 'Laboratório', path: '/lab' },
  { icon: Brain, label: 'Simulados', path: '/quiz' },
  { icon: Upload, label: 'Novo Estudo', path: '/upload' },
];

const Sidebar: React.FC = () => {
  const stats = useStudyStore((state) => state.stats);

  return (
    <aside className="w-64 h-screen glass border-r flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Zap className="text-white" size={24} fill="currentColor" />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight">EduAI <span className="text-primary">Pro</span></h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Enterprise EdTech</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
              ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'hover:bg-white/5 text-muted-foreground'}
            `}
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <div className="premium-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-yellow-500" />
              <span className="text-sm font-bold">Nível {stats.level}</span>
            </div>
            <span className="text-xs text-muted-foreground">{stats.xp % 1000} / 1000 XP</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(stats.xp % 1000) / 10}%` }}
              className="h-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            />
          </div>
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-muted-foreground">
            <span>Iniciante</span>
            <span>Expert</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/5 transition-colors text-muted-foreground group">
          <Settings size={20} className="group-hover:rotate-45 transition-transform" />
          <span className="font-medium">Configurações</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
