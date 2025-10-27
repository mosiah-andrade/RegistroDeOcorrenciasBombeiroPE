import { AiFillMessage } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import { IoIosVideocam } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";
import { FaExternalLinkAlt } from "react-icons/fa";
import { LuCalendarSync } from "react-icons/lu";

function PerfilContainer() {
  return (
   <div className="perfil-container ml-4">
           <h3>MATRÍCULA: 515648</h3>
           <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" alt="" />
           <p className='nome'>Felipe de Melo</p>
           <span className='cargo'>Bombeiro</span>
           <div
             className="icons d-flex flex-row justify-content-center mt-3"
             style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}
           >
             <AiFillMessage size={50} className='icon' style={{ color:'#E58865' }} />
             <IoIosCall size={50} className='icon' style={{ color:'#E58865' }} />
               <IoIosVideocam size={50} className='icon' style={{ color:'#E58865' }} />
               <TbMailFilled size={50} className='icon' style={{ color:'#E58865' }} />
           </div>
           <div className="line"></div>
           <div className="info " >
               <div>
                   <h4>Região</h4>
                   <p>Recife</p>
               </div>
               <div>
                   <h4>Total de Ocorrências</h4>
                   <p>25</p>
               </div>
           </div>
           <div className="info2 " >
               <section className='r-info d-flex flex-row justify-content-center' >
                   <div className='icon-ex'>
                       <FaExternalLinkAlt size={20}  style={{ color:'#E58865' }} />
                   </div>
                   <div className='icon-ex'>
                       <LuCalendarSync size={20}  style={{ color:'#E58865' }} />
                   </div>
               </section>
               <section className='l-info'>
                   <div>
                       <h4>Ocorrências</h4>
                       <p>45</p>
                   </div>
                   <div>
                       <h4>Aberta</h4>
                       <p>2</p>
                   </div>
               </section>
           </div>
   
         </div>
  );
}

export default PerfilContainer;