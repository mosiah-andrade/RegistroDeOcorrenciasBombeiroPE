
import { CiSearch } from "react-icons/ci";
import "./Funcionarios.css";

import PerfilContainer from '../../components/PerfilContainer';
import FuncionatiosTabela from '../../components/FuncionariosTabela';

function Funcionarios() {
return (
    <div className="main-container p-4 d-flex flex-row">
      <form  className=''>
        <input type="search" name="" id="" placeholder='Pesquisar' className='w-90'/>
        
        <button type="submit" className="ml-2 px-4 py-2 rounded-md ">
          <CiSearch size={30} />
        </button>
      </form>
      <FuncionatiosTabela />
      <PerfilContainer />
    </div>
  );
}

export default Funcionarios;