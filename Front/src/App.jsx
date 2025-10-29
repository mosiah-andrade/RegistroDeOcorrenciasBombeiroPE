import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componente de Layout
import MainLayout from './components/MainLayout';

// Páginas
import HomePage from './pages/Home/HomePage';
import NovaOcorrencia from './pages/nova-ocorrencia/NovaOcorrencia';
import Login from './pages/login/Login';
import Cadastrar from './pages/cadastrar/Cadastrar';
import Esqueceu from './pages/esqueceu/Esqueceu';
import Ocorrencias from './pages/ocorrencias/Ocorrencias';
import Funcionarios from './pages/funcionarios/Funcionarios';

import './index.css';

function App() {
  return (
    <Routes>
      {/* Rotas PÚBLICAS (sem Sidebar e Header) */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/esqueceu" element={<Esqueceu />} />

      {/* Rotas PRIVADAS (com Sidebar e Header) */}
      {/* A rota pai "element={<MainLayout />}" aplica o layout para todas as rotas filhas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ocorrencias" element={<Ocorrencias />} />
        <Route path="/nova-ocorrencia" element={<NovaOcorrencia />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        {/* Adicione aqui outras rotas que devem ter o layout principal */}
        {/* Exemplo: <Route path="/perfil" element={<ProfilePage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;