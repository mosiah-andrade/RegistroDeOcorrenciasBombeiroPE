import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // 1. Importe os componentes de rota
import Cadastrar from './pages/cadastrar/Cadastrar'; // 2. Importe suas páginas
import Login from './pages/login/Login';

function App() {
  return (
    <div>

      {/* 4. Defina a área onde as páginas serão renderizadas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        {/* <Route path="/sobre" element={<AboutPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;