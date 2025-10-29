import React from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

const getStatusProps = (status) => {
    switch (status) {
        case 'Aberto':
            return { text: 'Aberto', className: 'bg-green-100 text-green-700' };
        case 'em_andamento':
            return { text: 'Em Andamento', className: 'bg-yellow-100 text-yellow-700' };
        case 'concluido':
            return { text: 'Concluído', className: 'bg-blue-100 text-blue-700' };
        case 'cancelado':
            return { text: 'Cancelado', className: 'bg-red-100 text-red-700' };
        default:
            return { text: status || 'N/D', className: 'bg-gray-100 text-gray-700' };
    }
};

const formatarData = (dataISO) => {
    if (!dataISO) return 'N/A';
    try {
        const dataObj = new Date(dataISO);
        if (isNaN(dataObj.getTime())) {
            return 'Data inválida';
        }
        return dataObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC'
        });
    } catch (e) {
        console.error("Erro ao formatar data:", dataISO, e);
        return 'Data inválida';
    }
};


const OcorrenciasTable = ({ data, onDelete, onEdit }) => {

    if (!data || data.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                Nenhuma ocorrência encontrada.
            </div>
        );
    }

    return (
        <>
            <div className="md:hidden">
                {data.map((ocorrencia) => {
                    const statusProps = getStatusProps(ocorrencia.status);
                    const dataExibicao = ocorrencia.data || ocorrencia.createdAt;
                    const nomeResponsavel = ocorrencia.responsavel?.nome || 'N/D';
                    const cargoResponsavel = ocorrencia.responsavel?.cargo || 'N/D';

                    return (
                        <div key={ocorrencia._id} className="p-4 border-b border-gray-200 bg-white">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-gray-900">{ocorrencia.tipo || 'N/D'}</span>
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusProps.className}`}
                                >
                                    {statusProps.text}
                                </span>
                            </div>

                            <div className="text-sm text-gray-600 mb-1">
                                <strong>Responsável:</strong> {nomeResponsavel} ({cargoResponsavel})
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                                <strong>Região:</strong> {ocorrencia.regiao || 'N/D'}
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <span className="text-sm text-gray-500">{formatarData(dataExibicao)}</span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => onEdit(ocorrencia)}
                                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full cursor-pointer"
                                        title="Editar Ocorrência"
                                    >
                                        <HiOutlinePencilAlt size={18} className="inline" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(ocorrencia._id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full cursor-pointer"
                                        title="Excluir Ocorrência"
                                    >
                                        <HiOutlineTrash size={18} className="inline" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="overflow-x-auto hidden md:block">
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
                            const nomeResponsavel = ocorrencia.responsavel?.nome || 'N/D';
                            const cargoResponsavel = ocorrencia.responsavel?.cargo || 'N/D';
                            const statusProps = getStatusProps(ocorrencia.status);
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
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatarData(dataExibicao)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => onEdit(ocorrencia)}
                                            className="text-blue-500 hover:text-blue-700 p-2 rounded-full cursor-pointer"
                                            title="Editar Ocorrência"
                                        >
                                            <HiOutlinePencilAlt size={18} className="inline" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(ocorrencia._id)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded-full cursor-pointer"
                                            Ai
                                        >
                                            <HiOutlineTrash size={18} className="inline" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default OcorrenciasTable;