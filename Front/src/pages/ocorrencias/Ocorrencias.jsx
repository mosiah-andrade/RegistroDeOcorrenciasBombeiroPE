import './Ocorrencias.css';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OcorrenciasTable from '../../components/OcorrenciasTable';
import { FiChevronDown, FiPlus, FiUpload } from 'react-icons/fi';
import OcorrenciaModal from '../../components/ocorrenciaModal';



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

function Ocorrencias() {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOcorrenciaOpen, setIsOcorrenciaOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Começa como true
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;


    const openOcorrenciaModal = () => {
        setIsOcorrenciaOpen(true);
    }
    const closeOcorrenciaModal = () => {
        setIsOcorrenciaOpen(false);
    }
    
    const ITEMS_PER_PAGE = 7;


// 2. CHAME A FUNÇÃO DENTRO DO USEEFFECT
useEffect(() => {
    fetchOcorrencias();
}, [fetchOcorrencias]); // O useEffect vai rodar quando a função for definida
    
   // A lógica de filtro pode ser conectada às abas no futuro se necessário
    
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
    
    const filteredOcorrencias = ocorrencias;
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentOcorrencias = filteredOcorrencias.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOcorrencias.length / ITEMS_PER_PAGE);

    const [formData, setFormData] = useState({
        responsavel: { nome: '', cargo: '' },
        regiao: '',
        tipo: '',
        data: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // <-- ESSENCIAL: Evita o reload da página

        console.log('Dados a serem enviados:', formData);
        try {
        // 2. AÇÃO REAL: Envio dos dados para a API/Backend (Node.js/Express)
        const response = await fetch(`${apiUrl}/api/ocorrencias`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Ocorrência salva com sucesso!');
            closeOcorrenciaModal(); 
            fetchOcorrencias();
        } else {
            const errorData = await response.json();
            alert(`Erro ao salvar: ${errorData.message || 'Erro desconhecido'}`);
        }
        } catch (error) {
        console.error('Erro de rede:', error);
        alert('Houve um erro de conexão.');
        }
    };

    // ADICIONE ESTE BLOCO ANTES DO RETURN:
    if (isLoading) {
        return (
            <div className="bg-stone-50 min-h-screen p-8 flex justify-center items-center">
                <p className="text-lg text-gray-600">Carregando ocorrências...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-stone-50 min-h-screen p-8 flex justify-center items-center">
                <p className="text-lg text-red-600">Erro: {error}</p>
            </div>
        );
    }

    const handleDelete = async (ocorrenciaId) => {
        // Confirmação antes de excluir
        if (!window.confirm(`Tem certeza que deseja excluir a ocorrência ID: ${ocorrenciaId}?`)) {
            return; // Cancela se o usuário clicar em "Cancelar"
        }

        try {
            const response = await fetch(`${apiUrl}/api/ocorrencias/${ocorrenciaId}`, {
                method: 'DELETE',
                headers: {
                    // Se sua API exigir autenticação, adicione o header Authorization aqui
                    // 'Authorization': `Bearer ${seuToken}`,
                    'Content-Type': 'application/json', // Embora DELETE não precise de corpo, é boa prática
                },
            });

            if (response.ok) {
                alert('Ocorrência excluída com sucesso!');
                // Atualiza a lista de ocorrências no frontend
                // Opção 1: Rebuscar todos os dados (mais simples)
                fetchOcorrencias();

                // Opção 2: Remover o item do estado local (mais performático se a lista for grande)
                // setOcorrencias(prevOcorrencias =>
                //     prevOcorrencias.filter(ocorrencia => ocorrencia._id !== ocorrenciaId)
                // );

                // Ajusta a página atual se a última ocorrência da página foi excluída
                if (currentOcorrencias.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }

            } else {
                // Tenta pegar uma mensagem de erro da API
                const errorData = await response.json().catch(() => ({})); // Pega JSON ou objeto vazio
                alert(`Erro ao excluir ocorrência: ${errorData.message || response.statusText || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error('Erro de rede ao excluir:', error);
            alert('Houve um erro de conexão ao tentar excluir.');
        }
    };

    return (
        <div className="bg-stone-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            
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
                        <option value="aberto">Aberto</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                    </FilterSelect>
                </div>
                <div className="flex gap-3">
                    <button onClick={openOcorrenciaModal} className="flex items-center space-x-2 bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-orange-600 transition-colors cursor-pointer">
                        <FiPlus size={18} />
                        <span>Novo</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                        <FiUpload size={16} />
                        <span>Exportar tabela</span>
                    </button>
                </div>
            </div>

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

                {/* Tabela de Ocorrências */}
                <OcorrenciasTable data={currentOcorrencias} onDelete={handleDelete}/>
                {loading && (
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
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Próximo ›
                            </button>
                        </div>
                    </>
                )}
            </main>
            <OcorrenciaModal isOpen={isOcorrenciaOpen} onClose={closeOcorrenciaModal}>
        
                {/* Este é o 'children' que será injetado no modal */}
                <div className="space-y-6">
                    <form onSubmit={handleSubmit} className=" flex flex-col">
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
                        <button 
                            type="submit" 
                            className=" w-100 rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600 "
                            
                        >
                            Registrar Ocorrencia
                        </button>
                    </form>
                    
                </div>
                
            </OcorrenciaModal>
        </div>
    );
}

export default Ocorrencias;