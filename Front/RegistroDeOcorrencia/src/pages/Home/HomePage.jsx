import React from 'react';
import Sidebar from '../../components/Sidebar';
import Styles from './Home.module.css';


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
      <main className="flex-1 p-8 mt-4 max-w-md">
        <div class="grid grid-cols-3 md:grid-cols-3 grid-rows-3 md:grid-rows-3 gap-2 md:gap-20 m-4">
          <div class="col-start-1 row-start-1 row-span-2 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10 " id={Styles.profileBox} >
            <img src="https://img.freepik.com/vetores-premium/icone-do-bombeiro_1134231-1046.jpg" alt="" id={Styles.profile} />
            <h2 class="text-center font-bold text-2xl mt-4">Bem-vindo, {user ? user.nome : 'Visitante'}!</h2>
          </div>
          <div class="col-start-2 row-start-1 md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10 border-2 border-solid border-black p-4" className={Styles.box} >1</div>
          <div class="col-start-2 row-start-2 md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10 border-2 border-solid border-black p-4" className={Styles.box}>2</div>
          <div class="col-start-3 row-start-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10 border-2 border-solid border-black p-4" className={Styles.box}>3</div>
          <div class="col-start-3 row-start-1 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 bg-gray-300 rounded-md p-10 border-2 border-solid border-black p-4" className={Styles.box}>4</div>
      
        </div>
        {/* Usando classes Tailwind no link para estilizar como o da imagem */}
        {/* <a href="/login" className="text-blue-500 hover:underline mt-4 inline-block"> Página De Login </a> */}
      </main>
    </div>
  );
}

export default HomePage;