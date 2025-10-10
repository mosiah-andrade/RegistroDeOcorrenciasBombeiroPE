import React from 'react';
import nino from '../assets/nino.png'

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo NINO */}
      <div>
        <h1 className="logo">
            <img src={nino} alt="" />
        </h1>
      </div>

      {/* Search and User Actions */}
      <div className="flex items-center space-x-4">
        
      </div>
    </header>
  );
};

export default Header;