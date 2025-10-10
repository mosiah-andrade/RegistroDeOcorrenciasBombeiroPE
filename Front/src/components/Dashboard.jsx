import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Principal</h2>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <p className="text-gray-700">
          Bem-vindo ao painel de controle. Aqui você encontrará as principais informações e poderá gerenciar as ocorrências. 
          Use a barra lateral para navegar entre as seções.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;