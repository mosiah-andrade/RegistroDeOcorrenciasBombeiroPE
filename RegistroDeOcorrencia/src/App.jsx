import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // 1. Importe os componentes de rota
import HomePage from './pages/HomePage'; // 2. Importe suas páginas
// import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div>
      {/* 3. Crie a navegação */}
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            {/* <Link to="/sobre">Sobre</Link> */}
          </li>
        </ul>
      </nav>

      <hr />

      {/* 4. Defina a área onde as páginas serão renderizadas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/sobre" element={<AboutPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;