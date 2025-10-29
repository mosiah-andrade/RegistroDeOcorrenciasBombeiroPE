import React from "react";

// Adicionei { isOpen, onClose, children } na definição da função
function OcorrenciaModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleOverlayClick}
            // --- ALTERAÇÃO ---
            // Adicionado `p-4` para dar um respiro no mobile
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300"
        >
            {/* Container do Modal */}
            <div
                // --- ALTERAÇÕES ---
                // 1. `w-full`: Garante que ele respeite o padding do overlay no mobile
                // 2. `max-h-[90vh]`: Limita a altura a 90% da tela
                // 3. `overflow-y-auto`: Adiciona scroll se o conteúdo for maior
                className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão de Fechar (X) */}
                <button
                    onClick={onClose}
                    // --- ALTERAÇÃO ---
                    // Ajustei o z-index para garantir que fique sobre o conteúdo
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-700 shadow-md transition-all hover:bg-gray-300 hover:text-black"
                >
                    &times;
                </button>

                {/* Conteúdo do Modal */}
                <div>{children}</div>
            </div>
        </div>
    );
}

export default OcorrenciaModal;