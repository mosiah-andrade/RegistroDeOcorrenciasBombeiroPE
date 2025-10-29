import React from "react";

function OcorrenciaModal({ isOpen, onClose, children}) { {
    if (!isOpen) return null;
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div
        onClick={handleOverlayClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300"
        >
            {/* Container do Modal */}
            <div
                className="relative max-w-lg rounded-lg bg-white p-6 shadow-xl"
                // Impede que o clique dentro do modal feche o modal
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Botão de Fechar (X) */}
                <button
                onClick={onClose}
                className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-700 shadow-md transition-all hover:bg-gray-300 hover:text-black"
                >
                &times;
                </button>

                {/* Conteúdo do Modal */}
                <div>{children}</div>
            </div>
        </div>
    )

  }
}
export default OcorrenciaModal;