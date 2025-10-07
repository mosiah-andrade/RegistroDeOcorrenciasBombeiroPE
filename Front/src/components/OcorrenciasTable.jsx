import React from 'react';
import StatusBadge from './StatusBadge';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineDotsVertical } from 'react-icons/hi';
import { FaRegUserCircle } from "react-icons/fa";


const OcorrenciasTable = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow" style={{ marginTop: '20px' }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" className="rounded" />
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ocorrência</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Região</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((ocorrencia) => (
            <tr key={ocorrencia._id} className="hover:bg-gray-50">
              <td className="p-4">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="p-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-20 w-20" style={{width:'auto', height:'auto'}}>
                     <FaRegUserCircle className="h-20 w-20 rounded-full text-gray-400" style={{width:'30px', height:'30px', marginRight: '20px'}}/>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{ocorrencia.responsavel.nome}</div>
                    <div className="text-sm text-gray-500">{ocorrencia.responsavel.cargo}</div>
                  </div>
                </div>
              </td>
              <td className="p-4 whitespace-nowrap">
                <div className="text-sm font-bold text-gray-900">#{ocorrencia._id}</div>
                <div className="text-sm text-gray-500">{ocorrencia.data}</div>
              </td>
              <td className="p-4 whitespace-nowrap">
                <StatusBadge status={ocorrencia.status} />
              </td>
              <td className="p-4 whitespace-nowrap text-sm text-gray-500">{ocorrencia.regiao}</td>
              <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                 <span className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 text-xs">{ocorrencia.tipo}</span>
                 {ocorrencia.extra > 0 && 
                    <span className="ml-2 px-2 py-1 bg-gray-200 rounded-md text-gray-700 text-xs">+{ocorrencia.extra}</span>
                 }
              </td>
              <td className="p-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <HiOutlineTrash size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <HiOutlinePencil size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <HiOutlineDotsVertical size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OcorrenciasTable;