// Arquivo: RegistroDeOcorrenciasBombeiroPE/Front/src/pages/ocorrencias/Ocorrencias.jsx

import './Ocorrencias.css';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OcorrenciasTable from '../../components/OcorrenciasTable';
import { FiChevronDown, FiPlus, FiUpload } from 'react-icons/fi';
import OcorrenciaModal from '../../components/ocorrenciaModal';

// --- COMPONENTES AUXILIARES ---
const FilterSelect = ({ label, name, value, onChange, children }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="text-xs font-medium text-gray-500 mb-1">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="flex items-center justify-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
        >
            {children}
        </select>
    </div>
);

const PageLink = ({ children, active, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
            active ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {children}
    </button>
);

// --- COMPONENTE PRINCIPAL (COM ALTERAÇÕES) ---
function Ocorrencias() {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOcorrenciaOpen, setIsOcorrenciaOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // NOVO ESTADO: Armazena a ocorrência que está sendo editada
    const [ocorrenciaEditada, setOcorrenciaEditada] = useState(null);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const ITEMS_PER_PAGE = 7;
    
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        tipo: '',
        regiao: '',
        status: '',
        responsavelNome: ''
    });

    const [filtroOpcoes, setFiltroOpcoes] = useState({
        regioes: [],
        responsaveis: [],
        tipos: []
    });

    // Estado do formulário do modal (usado tanto para criar quanto para editar)
    // ATUALIZADO: Adicionado 'status'
    const [formData, setFormData] = useState({
        responsavel: { nome: '', cargo: '' },
        regiao: '',
        tipo: '',
        data: '',
        status: 'Aberto' // Status padrão para novas ocorrências
    });

    // --- LÓGICA DE DADOS ---
    useEffect(() => {
        const fetchOpcoes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ocorrencias/opcoes-filtro`);
                if (!response.ok) throw new Error('Falha ao buscar opções de filtro.');
                const data = await response.json();
                setFiltroOpcoes(data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchOpcoes();
    }, []);

    const fetchOcorrencias = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        if (filters.tipo) params.append('tipo', filters.tipo);
        if (filters.regiao) params.append('regiao', filters.regiao);
        if (filters.status) params.append('status', filters.status);
        if (filters.responsavelNome) params.append('responsavelNome', filters.responsavelNome);
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ocorrencias?${params.toString()}`);
            if (!response.ok) throw new Error('Falha ao buscar dados das ocorrências.');
            const data = await response.json();
            setOcorrencias(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchOcorrencias();
    }, [fetchOcorrencias]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
        setCurrentPage(1); 
    };

    // --- LÓGICA DO MODAL (ATUALIZADA) ---

    // Reseta o formulário para o estado inicial de "criação"
    const resetForm = () => {
        setFormData({
            responsavel: { nome: '', cargo: '' },
            regiao: '',
            tipo: '',
            data: '',
            status: 'Aberto' // Garante que o status volte ao padrão
        });
        setOcorrenciaEditada(null);
    };

    // Abre o modal para CRIAR uma nova ocorrência
    const handleOpenCreateModal = () => {
        resetForm();
        setIsOcorrenciaOpen(true);
    };

    // Abre o modal para EDITAR uma ocorrência existente
    const handleOpenEditModal = (ocorrencia) => {
        // Formata a data para o formato YYYY-MM-DD (necessário para o input type="date")
        const dataFormatada = (ocorrencia.data || ocorrencia.createdAt) 
            ? new Date(ocorrencia.data || ocorrencia.createdAt).toISOString().split('T')[0] 
            : '';

        setOcorrenciaEditada(ocorrencia);
        setFormData({
            responsavel: {
                nome: ocorrencia.responsavel?.nome || '',
                cargo: ocorrencia.responsavel?.cargo || ''
            },
            regiao: ocorrencia.regiao || '',
            tipo: ocorrencia.tipo || '',
            data: dataFormatada,
            status: ocorrencia.status || 'Aberto' // Preenche o status vindo da ocorrência
        });
        setIsOcorrenciaOpen(true);
    };

    // Fecha o modal e limpa os estados de edição
    const closeOcorrenciaModal = () => {
        setIsOcorrenciaOpen(false);
        resetForm(); // Limpa o formulário e o estado de edição ao fechar
    };

    // Função unificada para Salvar (Criação ou Atualização)
    const handleSaveOcorrencia = async (e) => {
        e.preventDefault();

        // Se 'ocorrenciaEditada' não for null, estamos no modo de edição
        if (ocorrenciaEditada) {
            // LÓGICA DE ATUALIZAÇÃO (PUT)
            const id = ocorrenciaEditada._id;
            try {
                const response = await fetch(`${apiUrl}/api/ocorrencias/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Ocorrência atualizada com sucesso!');
                    closeOcorrenciaModal();
                    fetchOcorrencias(); // Atualiza a lista
                } else {
                    const errorData = await response.json();
                    alert(`Erro ao atualizar: ${errorData.message || 'Erro desconhecido'}`);
                }
            } catch (error) {
                console.error('Erro de rede (PUT):', error);
                alert('Houve um erro de conexão ao atualizar.');
            }
        } else {
            // LÓGICA DE CRIAÇÃO (POST) - (A que já existia)
            try {
                const response = await fetch(`${apiUrl}/api/ocorrencias`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Ocorrência salva com sucesso!');
                    closeOcorrenciaModal();
                    fetchOcorrencias(); // Atualiza a lista
                } else {
                    const errorData = await response.json();
                    alert(`Erro ao salvar: ${errorData.message || 'Erro desconhecido'}`);
                }
            } catch (error) {
                console.error('Erro de rede (POST):', error);
                alert('Houve um erro de conexão.');
            }
        }
    };


    // --- LÓGICA DE EXCLUSÃO (sem alteração) ---
    const handleDelete = async (ocorrenciaId) => {
        if (!window.confirm(`Tem certeza que deseja excluir a ocorrência ID: ${ocorrenciaId}?`)) {
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/api/ocorrencias/${ocorrenciaId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Ocorrência excluída com sucesso!');
                fetchOcorrencias();
                if (currentOcorrencias.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert(`Erro ao excluir ocorrência: ${errorData.message || response.statusText || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error('Erro de rede ao excluir:', error);
            alert('Houve um erro de conexão ao tentar excluir.');
        }
    };

    // --- Paginação (sem alteração) ---
    const filteredOcorrencias = ocorrencias;
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentOcorrencias = filteredOcorrencias.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOcorrencias.length / ITEMS_PER_PAGE);

    if (error) {
        return (
            <div className="bg-stone-50 min-h-screen p-8 flex justify-center items-center">
                <p className="text-lg text-red-600">Erro: {error}</p>
            </div>
        );
    }
    
    // --- RENDERIZAÇÃO (JSX ATUALIZADO) ---
    return (
        <div className="bg-stone-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            
            {/* Filtros */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-5">
                <div className="flex flex-wrap gap-3">
                    <FilterSelect label="Responsável" name="responsavelNome" value={filters.responsavelNome} onChange={handleFilterChange}>
                        <option value="">Todos os Responsáveis</option>
                        {filtroOpcoes.responsaveis.map(nome => (
                            <option key={nome} value={nome}>{nome}</option>
                        ))}
                    </FilterSelect>
                    <FilterSelect label="Tipo" name="tipo" value={filters.tipo} onChange={handleFilterChange}>
                        <option value="">Todos os Tipos</option>
                        {filtroOpcoes.tipos.map(tipo => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </FilterSelect>
                    <FilterSelect label="Região" name="regiao" value={filters.regiao} onChange={handleFilterChange}>
                        <option value="">Todas as Regiões</option>
                         {filtroOpcoes.regioes.map(regiao => (
                            <option key={regiao} value={regiao}>{regiao}</option>
                        ))}
                    </FilterSelect>
                    <FilterSelect label="Status" name="status" value={filters.status} onChange={handleFilterChange}>
                        <option value="">Todos os Status</option>
                        {/* Corrigido o valor de 'aberto' para 'Aberto' */}
                        <option value="Aberto">Aberto</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                    </FilterSelect>
                </div>
                <div className="flex gap-3">
                    {/* ATUALIZADO: onClick chama handleOpenCreateModal */}
                    <button onClick={handleOpenCreateModal} className="flex items-center space-x-2 bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-orange-600 transition-colors cursor-pointer">
                        <FiPlus size={18} />
                        <span>Novo</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                        <FiUpload size={16} />
                        <span>Exportar tabela</span>
                    </button>
                </div>
            </div>

            {/* Tabela Principal */}
            <main className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 flex flex-wrap gap-4 justify-between items-center border-b border-gray-200">
                     <div className="flex items-center gap-4">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                         <span className="text-sm font-medium text-gray-600">
                            {filteredOcorrencias.length} ocorrências
                         </span>
                    </div>
                    <div className="flex items-center gap-6 text-xs font-medium text-gray-400">
                        <a href="#" className="hover:text-gray-600">
                            Paginação <FiChevronDown size={14} className="inline" />
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Status <FiChevronDown size={14} className="inline" />
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Região <FiChevronDown size={14} className="inline" />
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Tipo <FiChevronDown size={14} className="inline" />
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Ações <FiChevronDown size={14} className="inline" />
                        </a>
                    </div>
                </div>

                {!isLoading && (
                    <div className="p-6 text-center text-gray-500">
                        Carregando ocorrências...
                    </div>
                )}

                {error && (
                    <div className="p-6 text-center text-red-600">
                        <strong>Erro:</strong> {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* ATUALIZADO: Passando a função 'handleOpenEditModal' para a prop 'onEdit' */}
                        <OcorrenciasTable 
                            data={currentOcorrencias} 
                            onDelete={handleDelete} 
                            onEdit={handleOpenEditModal} // Passa a função de abrir o modal de edição
                        />

                        {/* Paginação (sem alteração) */}
                        <div className="px-6 py-3 flex flex-wrap gap-4 justify-between items-center border-t border-gray-200">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1 || totalPages === 0}
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
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Próximo ›
                            </button>
                        </div>
                    </>
                )}
            </main>

            {/* MODAL (ATUALIZADO) */}
            <OcorrenciaModal isOpen={isOcorrenciaOpen} onClose={closeOcorrenciaModal}>
                
                <div className="space-y-6">
                    {/* ATUALIZADO: Título dinâmico e onSubmit usa handleSaveOcorrencia */}
                    <h2 className="text-2xl font-bold text-gray-800">
                        {ocorrenciaEditada ? 'Editar Ocorrência' : 'Registrar Nova Ocorrência'}
                    </h2>
                    
                    <form onSubmit={handleSaveOcorrencia} className=" flex flex-col">
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="responsavelNome">
                                Nome do Responsável
                            </label>
                            <input
                                type="text"
                                id="responsavelNome"
                                className="w-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.responsavel.nome}
                                onChange={(e) => setFormData({ ...formData, responsavel: { ...formData.responsavel, nome: e.target.value } })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="responsavelCargo">
                                Cargo do Responsável
                            </label>
                            <input
                                type="text"
                                id="responsavelCargo"
                                className="w-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.responsavel.cargo}
                                onChange={(e) => setFormData({ ...formData, responsavel: { ...formData.responsavel, cargo: e.target.value } })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="regiao">
                                Região
                            </label>
                            <input
                                type="text"
                                id="regiao"
                                className="w-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.regiao}
                                onChange={(e) => setFormData({ ...formData, regiao: e.target.value })}
                                required
                            />
                        </div>
                        
                        {/* Tipo de Ocorrência */}
                        <div className="mb-4">  
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="tipo">
                                Tipo de Ocorrência
                            </label>
                            <select
                                id="tipo"
                                className="w-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.tipo}
                                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                required
                            >
                                <option value="">Selecione um tipo</option>
                                <option value="Incêndio">Incêndio</option>
                                <option value="Resgate">Resgate</option>
                                <option value="Químico">Químico</option>
                                <option value="Salvamento">Salvamento</option>
                                <option value="APH">APH</option>
                            </select>
                        </div>
                        
                        {/* Data */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="data">
                                Data da Ocorrência
                            </label>
                            <input
                                type="date"
                                id="data"
                                className="w-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.data}
                                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                            />
                        </div>

                        {/* CAMPO DE STATUS (Atualizado) */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
                                Status
                            </label>
                            <select
                                id="status"
                                className="w-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                required
                            >
                                <option value="Aberto">Aberto</option>
                                <option value="em_andamento">Em Andamento</option>
                                <option value="concluido">Concluído</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                        
                        {/* ATUALIZADO: Texto dinâmico do botão */}
                        <button 
                            type="submit" 
                            className=" w-100 rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600 "
                        >
                            {ocorrenciaEditada ? 'Atualizar Ocorrência' : 'Registrar Ocorrência'}
                        </button>
                    </form>
                </div>
            </OcorrenciaModal>
        </div>
    );
}

export default Ocorrencias;