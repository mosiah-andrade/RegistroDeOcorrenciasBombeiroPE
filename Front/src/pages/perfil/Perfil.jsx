import style from './Perfil.module.css';
import React from 'react';

const Perfil = () => {
  return (
    <section className={`${style.perfilPage} container-fluid  gap-4`}>
      <div className={`${style.perfilContainer} flex flex-col items-center gap-4 bg-white  rounded `}>
        <div className={`${style.imgContainer} `}>
          <img src="" alt="perfil" className={`${style.imgPerfil} `} title='perfil' name='perfil' />
        </div>
        <h1 className={`${style.perfilName}`}>Fulaninho</h1>

        <div className={`${style.links}  `}>
          <a href="#" className={`${style.link} ${style.activeLink} p-4`}>Alterações</a>
          <a href="#" className={`${style.link} p-4`}>Adicionar Conta</a>
          <a href="#" className={`${style.link} p-4`}>Sair da Conta</a>
        </div>
      </div>
      <div className={`${style.atividadeContainer} container h-100 bg-white p-4 rounded`}>
        <div className={`  d-flex justify-content-between align-items-center mb-4`}>
          
        </div>
      </div>
    </section>
    
  );
}
export default Perfil;