import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cadastrar from './pages/cadastrar/Cadastrar';
import Login from './pages/login/Login';
import HomePage from './pages/HomePage'; // Importa a HomePage
import Esqueceu from './pages/esqueceu/Esqueceu';
import './index.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* HomePage na rota principal */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/esqueceu" element={<Esqueceu />} />
      </Routes>
    </div>
  );
}

export default App;