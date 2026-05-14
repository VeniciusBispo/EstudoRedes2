import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import SignalLab from '../pages/Labs/SignalLab';

// Placeholder for missing pages to avoid build errors
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground">Em construção pela arquitetura EduAI Pro.</p>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lab" element={<SignalLab />} />
        <Route path="/study" element={<Placeholder title="Materiais de Estudo" />} />
        <Route path="/quiz" element={<Placeholder title="Simulados & IA" />} />
        <Route path="/upload" element={<Placeholder title="Processamento de Arquivos" />} />
        <Route path="/settings" element={<Placeholder title="Configurações" />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
