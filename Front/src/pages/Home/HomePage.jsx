// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import OcorrenciasTable from '../../components/OcorrenciasTable'; // Ajuste o caminho se necessário
import portaFogo from '../../assets/portaFogo.png';
import bombeiroMenino from '../../assets/bombeiroMenino.png';
import doisBombeiros from '../../assets/doisBombeiro.png';
import escada from '../../assets/escada.png';
import roupa from '../../assets/roupa.png';
import sinal from '../../assets/sinal.png';
import axe from '../../assets/axe.png';
import mangueira from '../../assets/mangueira.png';
import styles from './Home.module.css';

// --- Componente Auxiliar para os Cartões de Estatísticas ---
// (Pode ser movido para seu próprio arquivo se preferir: StatCard.jsx)
const StatCard = ({ value, label, imageUrl }) => (
    <div className={` rounded-xl border border-gray-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-300 ${styles.statCard} mb-10`}>
        <div>
            <p className={`text-4xl lg:text-5xl font-bold ${styles.numberfloting}`}>{value}</p>
            <p className={`text-sm mt-1 ${styles.label}`}>{label}</p>
        </div>
        <div className="flex-shrink-0">
             <img src={imageUrl} alt={label} className="object-contain" />
        </div>
    </div>
);


// --- Componente Principal da Página ---
function HomePage() {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [activeTab, setActiveTab] = useState('Data');

    // Dados para os cartões de estatísticas (com URLs de imagens funcionais)
    const statsData = [
        { value: 52, label: 'Ocorrências nas 24h', imageUrl: portaFogo },
        { value: 13, label: 'Cidades afetadas', imageUrl: bombeiroMenino },
        { value: 84, label: 'Ligações recebidas', imageUrl: doisBombeiros },
        { value: 9, label: 'Tipos de ocorrência', imageUrl: escada },
        { value: 62, label: 'Bombeiros envolvidos', imageUrl: roupa },
        { value: 71, label: 'Ocorrências aprovadas', imageUrl: sinal },
        { value: 36, label: 'Ocorrências em análise', imageUrl: axe },
        { value: 5, label: 'Ocorrências pendentes', imageUrl: mangueira },
    ];
    
    // Simulação de busca de dados da API
    useEffect(() => {
        const fetchOcorrencias = () => {
            // No seu projeto, você faria a chamada fetch real aqui.
            // Para este exemplo, usamos dados mocados.
            const mockData = [
                { id: '#926', nome: 'Carlos Andrade', cargo: 'Analista', timestamp: 'Seg Nov 04 2024 11:25:56', status: 'Aprovado', lotacao: 'Recife-PE', tipo: 'Incêndio', extra: '+4' },
                { id: '#927', nome: 'Beatriz Lima', cargo: 'Analista', timestamp: 'Seg Nov 04 2024 10:15:10', status: 'Pendente', lotacao: 'Olinda-PE', tipo: 'Resgate', extra: '+2' },
                { id: '#928', nome: 'Mariana Costa', cargo: 'Analista', timestamp: 'Seg Nov 04 2024 09:55:32', status: 'Recusado/Atrasado', lotacao: 'Jaboatão-PE', tipo: 'Incêndio', extra: '+1' },
                { id: '#929', nome: 'Felipe Souza', cargo: 'Analista', timestamp: 'Dom Nov 03 2024 22:30:00', status: 'Recusado/Atrasado', lotacao: 'Recife-PE', tipo: 'Químico', extra: '+3' },
            ];
            setOcorrencias(mockData);
        };
        fetchOcorrencias();
    }, []);

    // A lógica de filtro pode ser conectada às abas no futuro se necessário
    const filteredOcorrencias = ocorrencias;

    return (
        <div className="flex min-h-screen bg-[#F7F7F7]">

            <main className="flex-grow p-8 lg:p-8">
                {/* Grade de Estatísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsData.map((stat, index) => (
                        <StatCard key={index} value={stat.value} label={stat.label} imageUrl={stat.imageUrl} />
                    ))}
                </div>

                {/* Container da Tabela */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    {/* Abas de Filtro/Navegação */}
                    <div className="flex items-center border-b border-gray-200 mb-4">
                        {['Data', 'Tipo de ocorrência', 'Lotação', 'Situação'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-4 text-sm font-medium transition-colors duration-300 ${activeTab === tab
                                        ? 'border-b-2 border-orange-500 text-orange-600'
                                        : 'text-gray-500 hover:text-orange-500 border-b-2 border-transparent'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <OcorrenciasTable data={filteredOcorrencias} />
                </div>
            </main>
        </div>
    );
}

export default HomePage;