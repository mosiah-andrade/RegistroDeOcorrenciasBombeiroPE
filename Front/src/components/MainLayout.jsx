import React from 'react';
import { Outlet } from 'react-router-dom'; // Importe o Outlet
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Fixa */}
      <Sidebar />

      {/* Área Principal (Header + Conteúdo) */}
      <div className="flex flex-col flex-grow">
        
        {/* Header Fixo */}
        <Header />

        {/* Conteúdo Principal com Rolagem */}
        <main className="flex-grow p-6 lg:p-8 overflow-auto">
          {/* O Outlet renderiza a página da rota atual (HomePage, NovaOcorrencia, etc.) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;