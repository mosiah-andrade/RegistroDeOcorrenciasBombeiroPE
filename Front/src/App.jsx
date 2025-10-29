import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componente de Layout
import MainLayout from './components/MainLayout';

// Páginas
import Login from './pages/login/Login';
import Cadastrar from './pages/cadastrar/Cadastrar';
// import Esqueceu from './pages/esqueceu/Esqueceu';
import Ocorrencias from './pages/ocorrencias/Ocorrencias';
// import Perfil from './pages/perfil/Perfil';

import PWAReloader from './components/PWAReloader'; 

import './index.css';

function App() {
  return (
    <>
      <Routes>
        {/* Rotas PÚBLICAS (sem Sidebar e Header) */}
        
        {/* ALTERAÇÃO AQUI: A rota raiz "/" agora é a página de Login */}
        <Route path="/" element={<Login />} />
        
        <Route path="/cadastrar" element={<Cadastrar />} />
        {/* <Route path="/esqueceu" element={<Esqueceu />} /> */}

        {/* Rotas PRIVADAS (com Sidebar e Header) */}
        <Route element={<MainLayout />}>
        
          <Route path="/ocorrencias" element={<Ocorrencias />} />
          
          {/* <Route path="/perfil" element={<Perfil />} /> */}
          {/* <Route path="/funcionarios" element={<Funcionarios />} /> */}
        </Route>
      </Routes>
      
      <PWAReloader />
    </>
  );
}

export default App;