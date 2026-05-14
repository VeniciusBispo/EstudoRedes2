import React from 'react';
import { 
  BookOpen, 
  History, 
  Star, 
  BarChart2, 
  Settings, 
  PlusCircle,
  BrainCircuit
} from 'lucide-react';

interface SidebarProps {
  onNewStudy: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewStudy, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: BrainCircuit, label: 'Inteligência' },
    { id: 'history', icon: History, label: 'Histórico' },
    { id: 'favorites', icon: Star, label: 'Favoritos' },
    { id: 'stats', icon: BarChart2, label: 'Estatísticas' },
  ];

  return (
    <aside className="sidebar glass" style={{
      width: '280px',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      position: 'sticky',
      top: 0
    }}>
      <div className="logo" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '40px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BookOpen size={24} color="white" />
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>EduAI <span className="gradient-text">Pro</span></h2>
      </div>

      <button className="btn-primary" onClick={onNewStudy} style={{ marginBottom: '32px', width: '100%' }}>
        <PlusCircle size={20} />
        Novo Estudo
      </button>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none' }}>
          {menuItems.map((item) => (
            <li key={item.id} style={{ marginBottom: '8px' }}>
              <button
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === item.id ? 'var(--glass)' : 'transparent',
                  color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: activeTab === item.id ? 600 : 500
                }}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '10px',
          border: 'none',
          background: 'transparent',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: '0.95rem'
        }}>
          <Settings size={20} />
          Configurações
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
