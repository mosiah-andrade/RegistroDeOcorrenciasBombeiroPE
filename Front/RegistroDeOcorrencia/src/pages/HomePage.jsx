import React from 'react';

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
    <div>
      <h1>Bem-vindo à Página Inicial!</h1>
      {user ? (
        <>
          <p>Usuário conectado: <b>{user.username}</b></p>
          <p>ID: <b>{user.id}</b></p>
        </>
      ) : (
        <p>Nenhum usuário autenticado.</p>
      )}
    </div>
  );
}

export default HomePage;