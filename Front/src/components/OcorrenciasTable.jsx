import React from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'; // Adicionado ícone de edição

const getStatusProps = (status) => {
    // Corrigido 'aberto' para 'Aberto' para corresponder ao backend/enum
    switch (status) {
        case 'Aberto': // Corrigido
            return { text: 'Aberto', className: 'bg-green-100 text-green-700' };
        case 'em_andamento':
            return { text: 'Em Andamento', className: 'bg-yellow-100 text-yellow-700' };
        case 'concluido':
            return { text: 'Concluído', className: 'bg-blue-100 text-blue-700' }; // Mudado para Azul para diferenciar de Aberto
        case 'cancelado':
            return { text: 'Cancelado', className: 'bg-red-100 text-red-700' };
        default:
            return { text: status || 'N/D', className: 'bg-gray-100 text-gray-700' }; // Fallback para status indefinido
    }
};

// Recebe as props onDelete e onEdit
const OcorrenciasTable = ({ data, onDelete, onEdit }) => {

    if (!data || data.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                Nenhuma ocorrência encontrada.
            </div>
        );
    }

    const formatarData = (dataISO) => {
        if (!dataISO) return 'N/A';
        try {
             // Tenta formatar a data que pode vir do formulário (YYYY-MM-DD) ou do banco (ISO)
            const dataObj = new Date(dataISO);
             // Verifica se a data é válida antes de formatar
            if (isNaN(dataObj.getTime())) {
                return 'Data inválida';
            }
            return dataObj.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                // Removido hora/minuto se a data do form não tiver
            });
        } catch (e) {
            console.error("Erro ao formatar data:", dataISO, e);
            return 'Data inválida';
        }
    };


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Responsável
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Região
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((ocorrencia) => {
                        // Usa optional chaining e fallback para segurança
                        const nomeResponsavel = ocorrencia.responsavel?.nome || 'N/D';
                        const cargoResponsavel = ocorrencia.responsavel?.cargo || 'N/D';
                        const statusProps = getStatusProps(ocorrencia.status);

                        // Usa createdAt como fallback se 'data' não existir
                        const dataExibicao = ocorrencia.data || ocorrencia.createdAt;

                        return (
                            <tr key={ocorrencia._id} className="hover:bg-gray-50">

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{nomeResponsavel}</div>
                                    <div className="text-sm text-gray-500">{cargoResponsavel}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-800">{ocorrencia.regiao || 'N/D'}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-800">{ocorrencia.tipo || 'N/D'}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusProps.className}`}
                                    >
                                        {statusProps.text}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {formatarData(dataExibicao)}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    {/* Botão Editar */}
                                    <button
                                        onClick={() => onEdit(ocorrencia)} // Chama onEdit com a ocorrência
                                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full cursor-pointer"
                                        title="Editar Ocorrência"
                                    >
                                         <HiOutlinePencilAlt size={18} className="inline"/> {/* Ícone de edição */}
                                    </button>

                                    {/* Botão Excluir */}
                                    <button
                                        onClick={() => onDelete(ocorrencia._id)} // Chama onDelete com o ID
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full cursor-pointer"
                                        title="Excluir Ocorrência"
                                    >
                                        <HiOutlineTrash size={18} className="inline"/> {/* Ícone de lixeira */}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OcorrenciasTable;