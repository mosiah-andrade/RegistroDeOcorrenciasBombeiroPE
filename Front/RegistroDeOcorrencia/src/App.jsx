import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cadastrar from './pages/cadastrar/Cadastrar';
import Login from './pages/login/Login';
import HomePage from './pages/Home/HomePage'; // Importa a HomePage
import Esqueceu from './pages/esqueceu/Esqueceu';
import NovaOcorrencia from './pages/nova-ocorrencia/NovaOcorrencia';
import './index.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/esqueceu" element={<Esqueceu />} />
        <Route path="/ocorrencias/nova" element={<NovaOcorrencia />} />
      </Routes>
    </div>
  );
}

export default App;