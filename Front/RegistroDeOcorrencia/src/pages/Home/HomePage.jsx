import React from 'react';
import Sidebar from '../../components/Sidebar';


function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function HomePage() {
  const token = localStorage.getItem('token');
  const user = parseJwt(token);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* 3. SIDEBAR: Componente Sidebar */}
      <Sidebar />
      
       {/* 4. CONTEÚDO PRINCIPAL: Ocupa o espaço restante (`flex-1`) */}
      <main className="flex-1 p-8 mt-4">
        <h1 className="text-3xl font-bold mb-4 ">Bem-vindo à Página Inicial!</h1>
        {user ? (
          <>
            <p className="text-gray-400">Usuário conectado: <b>{user.username}</b></p>
            <p className="text-gray-400">ID: <b>{user.id}</b></p>
          </>
        ) : (
          <p className="text-gray-400">Nenhum usuário autenticado.</p>
        )}
        {/* Usando classes Tailwind no link para estilizar como o da imagem */}
        <a href="/login" className="text-blue-500 hover:underline mt-4 inline-block"> Página De Login </a>
      </main>
    </div>
  );
}

export default HomePage;