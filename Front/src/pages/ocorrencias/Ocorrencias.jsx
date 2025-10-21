import './Ocorrencias.css';
import React, { useState, useEffect } from 'react';
import OcorrenciasTable from '../../components/OcorrenciasTable';
import { FiChevronDown, FiPlus, FiUpload } from 'react-icons/fi';

// Componente auxiliar para os botões de filtro
const FilterButton = ({ label, className }) => (
    <button className={`flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors ${className}`}>
        <span>{label}</span>
        <FiChevronDown className="text-gray-400" />
    </button>
);

const PageLink = ({ children, active, onClick, disabled }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-1 rounded-md text-sm font-medium ${active ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {children}
    </button>
);

function Ocorrencias () {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    const ITEMS_PER_PAGE = 7;

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
                { id: '#930', nome: 'Lucas Oliveira', cargo: 'Técnico', timestamp: 'Dom Nov 03 2024 18:40:15', status: 'Aprovado', lotacao: 'Paulista-PE', tipo: 'Salvamento', extra: '+2' },
                { id: '#931', nome: 'Juliana Santos', cargo: 'Coordenadora', timestamp: 'Dom Nov 03 2024 15:22:05', status: 'Pendente', lotacao: 'Recife-PE', tipo: 'Incêndio', extra: '+3' },
                { id: '#932', nome: 'Rafael Pereira', cargo: 'Analista', timestamp: 'Sáb Nov 02 2024 20:10:48', status: 'Aprovado', lotacao: 'Olinda-PE', tipo: 'Resgate', extra: '+1' },
                { id: '#933', nome: 'Gabriela Ferreira', cargo: 'Técnica', timestamp: 'Sáb Nov 02 2024 17:55:12', status: 'Recusado/Atrasado', lotacao: 'Jaboatão-PE', tipo: 'APH', extra: '+5' },
                { id: '#934', nome: 'Fernando Alves', cargo: 'Analista', timestamp: 'Sáb Nov 02 2024 11:30:00', status: 'Aprovado', lotacao: 'Caruaru-PE', tipo: 'Químico', extra: '+2' },
                { id: '#935', nome: 'Camila Monteiro', cargo: 'Analista', timestamp: 'Sex Nov 01 2024 16:45:33', status: 'Pendente', lotacao: 'Recife-PE', tipo: 'Incêndio', extra: '+4' },
                { id: '#936', nome: 'Bruno Barbosa', cargo: 'Especialista', timestamp: 'Sex Nov 01 2024 14:05:21', status: 'Aprovado', lotacao: 'Paulista-PE', tipo: 'Resgate', extra: '+1' },
                { id: '#937', nome: 'Amanda Ribeiro', cargo: 'Analista', timestamp: 'Sex Nov 01 2024 09:18:09', status: 'Recusado/Atrasado', lotacao: 'Olinda-PE', tipo: 'Vazamento', extra: '+3' },
                { id: '#938', nome: 'Ricardo Carvalho', cargo: 'Técnico', timestamp: 'Qui Out 31 2024 23:50:50', status: 'Aprovado', lotacao: 'Jaboatão-PE', tipo: 'Salvamento', extra: '+2' },
                { id: '#939', nome: 'Patrícia Rodrigues', cargo: 'Analista', timestamp: 'Qui Out 31 2024 19:15:00', status: 'Pendente', lotacao: 'Recife-PE', tipo: 'APH', extra: '+4' }
            ];
            setOcorrencias(mockData);
        };
        fetchOcorrencias();
    }, []);
    
   // A lógica de filtro pode ser conectada às abas no futuro se necessário
    const filteredOcorrencias = ocorrencias;

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentOcorrencias = filteredOcorrencias.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredOcorrencias.length / ITEMS_PER_PAGE);

    return (
        <div className="bg-stone-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
           
            {/* Barra de Filtros e Ações */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-5">
                <div className="flex flex-wrap gap-3">
                    <FilterButton label="Período" />
                    <FilterButton label="Tipo" />
                    <FilterButton label="Região" />
                    <FilterButton label="Status" />
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center space-x-2 bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-orange-600 transition-colors">
                        <FiPlus size={18} />
                        <span>Novo</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                        <FiUpload size={16} />
                        <span>Exportar tabela</span>
                    </button>
                </div>
            </div>

            {/* Card Principal da Tabela */}
            <main className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Cabeçalho de Ações da Tabela */}
                <div className="px-6 py-4 flex flex-wrap gap-4 justify-between items-center border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                        <FilterButton label="Responsável" />
                    </div>
                    <div className="flex items-center gap-6 text-xs font-medium text-gray-400">
                        <a href="#" className="hover:text-gray-600">Paginação <FiChevronDown size={14} className="inline"/></a>
                        <a href="#" className="hover:text-gray-600">Status <FiChevronDown size={14} className="inline"/></a>
                        <a href="#" className="hover:text-gray-600">Região <FiChevronDown size={14} className="inline"/></a>
                        <a href="#" className="hover:text-gray-600">Tipo <FiChevronDown size={14} className="inline"/></a>
                        <a href="#" className="hover:text-gray-600">Ações <FiChevronDown size={14} className="inline"/></a>
                    </div>
                </div>

                {/* Tabela de Ocorrências */}
                <OcorrenciasTable data={currentOcorrencias} />

                <div className="px-6 py-3 flex flex-wrap gap-4 justify-between items-center border-t border-gray-200">
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ‹ Anteriores
                    </button>
                    <nav className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PageLink
                                key={index + 1}
                                active={currentPage === index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </PageLink>
                        ))}
                    </nav>
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Próximo ›
                    </button>
                </div>
            </main>
        </div>

    );
}

export default Ocorrencias;