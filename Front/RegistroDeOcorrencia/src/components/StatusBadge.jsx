import React from 'react';

// Um objeto para mapear cada status aos seus estilos correspondentes
const statusStyles = {
  Aprovado: {
    badge: "bg-green-100 text-green-800",
    dot: "bg-green-500",
  },
  'Em Análise': {
    badge: "bg-yellow-100 text-yellow-800",
    dot: "bg-yellow-500",
  },
  Rejeitado: {
    badge: "bg-red-100 text-red-800",
    dot: "bg-red-500",
  },
  // Um estilo padrão para qualquer status não mapeado
  default: {
    badge: "bg-gray-100 text-gray-800",
    dot: "bg-gray-500",
  },
};

const StatusBadge = ({ status }) => {
  // Pega os estilos do objeto. Se o status não for encontrado, usa o 'default'.
  const styles = statusStyles[status] || statusStyles.default;
  const baseStyle = "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full";

  return (
    <span className={`${baseStyle} ${styles.badge}`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${styles.dot} self-center`}></span>
      {status}
    </span>
  );
};

export default StatusBadge;