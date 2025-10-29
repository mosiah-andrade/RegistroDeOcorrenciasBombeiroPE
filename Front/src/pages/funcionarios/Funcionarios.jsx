
import { CiSearch } from "react-icons/ci";
import styles from "./Funcionarios.module.css";

import PerfilContainer from '../../components/PerfilContainer';
import FuncionatiosTabela from '../../components/FuncionariosTabela';

function Funcionarios() {
return (
    <div className="main-container p-4 d-flex flex-row">
      <form  className={`${styles.pesquisafuncionarios} mb-4 flex items-center`}>
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