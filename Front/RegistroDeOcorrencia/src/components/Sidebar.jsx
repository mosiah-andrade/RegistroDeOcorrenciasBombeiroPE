import React, { useState } from 'react';

// Estilos definidos como objetos JavaScript
const styles = {
    // ... (Seus estilos permanecem os mesmos)
    sidebar: (isOpen) => ({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '250px',
      height: '100%',
      backgroundColor: '#2c3e50', // Cor escura
      color: 'white',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', // Transição chave
      transition: 'transform 0.3s ease-in-out',
      zIndex: 1000,
    }),
    sidebarHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      borderBottom: '1px solid #34495e',
      paddingBottom: '10px',
    },
    sidebarTitle: {
        margin: 0,
        fontSize: '20px',
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '30px',
      cursor: 'pointer',
      padding: 0,
      lineHeight: 1,
    },
    sidebarLinks: {
      listStyle: 'none',
      padding: 0,
    },
    linkItem: {
      marginBottom: '15px',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      display: 'block',
      padding: '10px 0',
    },
    toggleBtn: {
      position: 'fixed',
      top: '40px',
      backgroundColor: 'transparent', 
      left: '40px',
      padding: '10px 15px',// Cor de destaque
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      zIndex: 1001,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 999,
    }
};

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const red = '#C62430';
    return (
        <>
            {/* ------------------------------------------------------------------ */}
            {/* O PONTO CHAVE: Renderiza o botão SOMENTE se a sidebar NÃO estiver aberta. */}
            {/* ------------------------------------------------------------------ */}
            {!isOpen && (
                <button style={styles.toggleBtn} onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={red} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                </button>
            )}

            {/* A própria sidebar */}
            <div style={styles.sidebar(isOpen)}>
                <div style={styles.sidebarHeader}>
                    <h3 style={styles.sidebarTitle}>Navegação</h3>

                    {/* Botão de fechar (X) dentro da sidebar. Ele só fica visível quando a sidebar está aberta. */}
                    <button style={styles.closeBtn} onClick={toggleSidebar}>
                        &times;
                    </button>
                </div>

                <ul style={styles.sidebarLinks}>
                    <li style={styles.linkItem}>
                        <a href="#dashboard" style={styles.link}>Dashboard</a>
                    </li>
                    <li style={styles.linkItem}>
                        <a href="#perfil" style={styles.link}>Meu Perfil</a>
                    </li>
                    <li style={styles.linkItem}>
                        <a href="#config" style={styles.link}>Configurações</a>
                    </li>
                    <li style={styles.linkItem}>
                        <a href="#sair" style={styles.link}>Sair</a>
                    </li>
                </ul>
            </div>

            {/* Overlay: aparece quando a sidebar está aberta */}
            {isOpen && <div style={styles.overlay} onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;