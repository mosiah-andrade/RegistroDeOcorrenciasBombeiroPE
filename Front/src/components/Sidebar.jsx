import React, { useState } from 'react';

// Importe apenas UMA versão de cada ícone
import logo from '../assets/nino-logo.png';
import homeIcon from '../assets/home-icon.png';
import checklistIcon from '../assets/file-icon.png'; // Usando os nomes da sua imagem
import shieldIcon from '../assets/certificate-icon.png'; // Supondo que você tenha este
import settingsIcon from '../assets/settings-icon.png';
import profileIcon from '../assets/profile-icon.png';

const NavItem = ({ icon, text, active, onClick }) => (
  <li className="relative group">
    <a
      href="#"
      onClick={onClick}
      className={`
        flex items-center justify-center h-16 w-16 mx-auto rounded-lg
        transition-all duration-300
        ${
          active
            ? 'bg-gradient-to-l from-orange-300 to-transparent' // Fundo ativo
            : '' // Fundo padrão
        }
      `}
    >
      {/* A mágica acontece aqui no className da imagem */}
      <img
        src={icon}
        alt={text}
        className={`
          w-7 h-7 object-contain transition-all duration-300
          ${
            active
              ? 'filter drop-shadow-[0_1px_3px_rgba(249,115,22,0.7)]' // EFEITO DE BRILHO LARANJA
              : '' // Sem efeito
          }
        `}
      />
    </a>
    <div className={`
      absolute left-full ml-4 px-3 py-2 text-sm font-medium text-white bg-gray-800 
      rounded-md shadow-lg whitespace-nowrap opacity-0 pointer-events-none
      transform transition-all duration-200 scale-95 group-hover:opacity-100 group-hover:scale-100
    `}>
      {text}
    </div>
  </li>
);

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Início');

  const navItems = [
    { name: 'Início', icon: homeIcon },
    { name: 'Ocorrências', icon: checklistIcon },
    { name: 'Segurança', icon: shieldIcon },
  ];

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-5 shadow-sm">
      <div className="mb-8">
        <img src={logo} alt="NINO Logo" className="w-12 h-12 object-contain" />
      </div>

      <nav className="flex-grow">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              icon={item.icon}
              text={item.name}
              active={activeItem === item.name}
              onClick={() => setActiveItem(item.name)}
            />
          ))}
        </ul>
      </nav>

      <div className="mt-auto space-y-3">
        <NavItem
          icon={settingsIcon}
          text="Configurações"
          active={activeItem === 'Configurações'}
          onClick={() => setActiveItem('Configurações')}
        />
        <NavItem
          icon={profileIcon}
          text="Meu Perfil"
          active={activeItem === 'Perfil'}
          onClick={() => setActiveItem('Perfil')}
        />
      </div>
    </aside>
  );
};

export default Sidebar;