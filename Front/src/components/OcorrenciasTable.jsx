    import { FiMoreVertical } from 'react-icons/fi';


const getStatusProps = (status) => {
    switch (status) {
        case 'aberto':
            return { text: 'Aberto', className: 'bg-green-100 text-green-700' };
        case 'em_andamento':
            return { text: 'Em Andamento', className: 'bg-yellow-100 text-yellow-700' };
        case 'concluido':
            return { text: 'Concluído', className: 'bg-blue-100 text-blue-700' };
        case 'cancelado':
            return { text: 'Cancelado', className: 'bg-red-100 text-red-700' };
        default:
            return { text: status, className: 'bg-gray-100 text-gray-700' };
    }
};

const OcorrenciasTable = ({ data }) => {
    
    if (!data || data.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                Nenhuma ocorrência encontrada.
            </div>
        );
    }

    const formatarData = (dataISO) => {
        if (!dataISO) return 'N/A';
        return new Date(dataISO).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                        const statusProps = getStatusProps(ocorrencia.status);
                        
                        const dataExibicao = ocorrencia.data || ocorrencia.createdAt;

                        return (
                            <tr key={ocorrencia._id} className="hover:bg-gray-50">
                                
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{ocorrencia.responsavel.nome}</div>
                                    <div className="text-sm text-gray-500">{ocorrencia.responsavel.cargo}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-800">{ocorrencia.regiao}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-800">{ocorrencia.tipo}</div>
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

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-gray-400 hover:text-orange-600">
                                        <FiMoreVertical size={18} />
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