import React, { useState, useEffect, useMemo } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Styles from './Home.module.css';
import OcorrenciasTable from '../../components/OcorrenciasTable';
import FilterDropdown from '../../components/FilterDropdown'; // A importação correta
import { HiPlus, HiOutlineUpload } from 'react-icons/hi';



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
   const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = parseJwt(token);

  const [ocorrencias, setOcorrencias] = useState([]);



  const statusOptions = ['Todos', 'Aprovado', 'Em Análise', 'Rejeitado'];
  const tipoOptions = ['Todos', 'Incêndio', 'Resgate', 'Químico'];
  const regiaoOptions = useMemo(() => {
      // 1. Extrai todas as regiões únicas dos dados
      const regioesUnicas = [
          ...new Set(ocorrencias.map(ocorrencia => ocorrencia.regiao))
      ];

      // 2. Adiciona a opção padrão 'Todas' no início
      return ['Todas', ...regioesUnicas.sort()];
  }, [ocorrencias]); // Recalcula apenas quando 'ocorrencias' mudar
  const periodoOptions = ['Qualquer', 'Hoje', 'Última Semana', 'Último Mês'];

  const apiUrl  = `${import.meta.env.VITE_API_BASE_URL}/api/ocorrencias`;

  useEffect(() => {
    const fetchOcorrencias = async () => {
      try {
        const response = await fetch(apiUrl); 
        if (!response.ok) {
          throw new Error('Erro ao buscar ocorrências');
        }
        const data = await response.json();
        setOcorrencias(data); 
      } catch (error) {
        console.error("Falha ao buscar ocorrências:", error);
      }
    };

    fetchOcorrencias();
  }, []);




  const [filters, setFilters] = useState({
    status: 'Todos',
    tipo: 'Todos',
    regiao: 'Todas',
    periodo: 'Qualquer',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filteredOcorrencias = useMemo(() => {
    return ocorrencias.filter(ocorrencia => {
      const statusMatch = filters.status === 'Todos' || ocorrencia.status === filters.status;
      const tipoMatch = filters.tipo === 'Todos' || ocorrencia.tipo === filters.tipo;
      const regiaoMatch = filters.regiao === 'Todas' || ocorrencia.regiao === filters.regiao;
      
      return statusMatch && tipoMatch && regiaoMatch;
    });
  }, [filters, ocorrencias]); 

  
  const handleNovaOcorrencia = () => {
      navigate('/ocorrencias/nova');
    };

  return (
    <div className={`flex min-h-screen `}>
      {/* 3. SIDEBAR: Componente Sidebar */}
      <Sidebar />
      
      <main className=" p-8 mt-4">
        <div className="grid grid-cols-3 md:grid-cols-3 grid-rows-2 md:grid-rows-2 gap-2 md:gap-20 m-4">
          <div className="col-start-1 row-start-1 row-span-2 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-2 bg-gray-300 rounded-md p-10 " id={Styles.profileBox} >
            <img src="https://img.freepik.com/vetores-premium/icone-do-bombeiro_1134231-1046.jpg" alt="" id={Styles.profile} />
            <h2 className="text-center font-bold text-2xl mt-4">Bem-vindo, {user ? user.nome : 'Visitante'}!</h2>
          </div>

          <div className={`${Styles.box}`}  > 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="red" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
            </svg>
            
            <span style={{ color: 'black' }}> 
              total de ocorrências em aberto: <span className="font-bold text-3xl">5</span>
            </span>
          </div>

          <div className={` ${Styles.box}`} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="green" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span style={{ color: 'black' }}>
              total de ocorrências finalizadas: <span className="font-bold text-3xl">10</span>
            </span>
          </div>

          <div className={` ${Styles.box}`} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="black" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
            <span style={{ color: 'black' }}>
              total de ocorrências em análise: <span className="font-bold text-3xl">5</span>
            </span>
          </div>

          <div className={` ${Styles.box}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="blue">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
            </svg>

            <span style={{ color: 'black' }}>
              total de ocorrências registradas: <span className="font-bold text-3xl">20</span>
            </span>
          </div>

        </div>
        {/* Usando classNamees Tailwind no link para estilizar como o da imagem */}
        {/* <a href="/login" className="text-blue-500 hover:underline mt-4 inline-block"> Página De Login </a> */}

        <div className={`${Styles.tableContainer} mt-8 `}>
          <div className="">
            
            {/* Cabeçalho em uma linha */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Ocorrências</h1>
              <div className="flex flex-row space-x-4">
                <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                  <HiOutlineUpload className="w-5 h-5 mr-2" />
                  Exportar tabela
                </button>
                <button 
                  onClick={handleNovaOcorrencia}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700">
                  <HiPlus className="w-5 h-5 mr-2" />
                  Novo
                </button>
              </div>
            </div>

           {/* Filtros */}
            <div className="grid grid-cols-4 gap-5 mb-6">
              <FilterDropdown 
                label="Status" 
                options={statusOptions} 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              />
              <FilterDropdown 
                label="Tipo" 
                options={tipoOptions} 
                value={filters.tipo}
                onChange={(e) => handleFilterChange('tipo', e.target.value)}
              />
              <FilterDropdown 
                label="Região" 
                options={regiaoOptions} 
                value={filters.regiao}
                onChange={(e) => handleFilterChange('regiao', e.target.value)}
              />
              <FilterDropdown 
                className={`${Styles.dropdown}`}
                label="Período" 
                options={periodoOptions} 
                value={filters.periodo}
                onChange={(e) => handleFilterChange('periodo', e.target.value)}
              />
          </div>
            
            {/* Tabela */}
            <OcorrenciasTable data={filteredOcorrencias} />

          </div>
        </div>

        <footer className="w-full p-4 -800 text-center text-sm ">
          &copy; {new Date().getFullYear()} Sistema de Registro de Ocorrências. Todos os direitos reservados.
        </footer>
      </main>
    </div>
  );
}

export default HomePage;