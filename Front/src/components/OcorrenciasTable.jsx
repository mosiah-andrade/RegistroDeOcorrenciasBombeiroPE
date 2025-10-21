// src/components/OcorrenciasTable.jsx

import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

// Função para obter a classe de estilo do status
const getStatusClasses = (status) => {
    switch (status) {
        case 'Aprovado':
            return 'rounded-full bg-emerald-100 px-5 py-2 text-base font-semibold text-emerald-700 shadow-sm border border-emerald-200 ';
        case 'Pendente':
            return 'bg-yellow-100 px-5 py-2  text-yellow-700 font-semibold  shadow-sm border border-yellow-200 ';
        case 'Recusado/Atrasado':
            return 'bg-red-100 px-5 py-2  text-red-700 font-semibold  shadow-sm border border-red-200 ';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const OcorrenciasTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500 py-8">Nenhuma ocorrência encontrada.</p>;
    }

    return (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ocorrência</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lotação</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        {/* Avatar genérico */}
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                            {item.nome.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{item.nome}</div>
                                        <div className="text-sm text-gray-500">{item.cargo}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.id}</div>
                                <div className="text-sm text-gray-500">{item.timestamp}</div>
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap ">
                                <span className={` px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.lotacao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.tipo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-gray-400 hover:text-orange-600 p-2 rounded-full">
                                    {item.extra} <HiOutlineDotsHorizontal className="inline ml-2"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OcorrenciasTable;