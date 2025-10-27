
import { CiTextAlignCenter } from "react-icons/ci";
import "./FuncionariosTabela.css";

const data = [
  {
    id: 1,
   img: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    name: "João Silva",
    email: "joão@gmail.com",
    matricula: "12345",
    funcao: "Bombeiro",
    turno: "Diurno",
    acoes: "2",
    total: "5",
  },
  {
    id: 2, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    name: "Maria Souza",
    email: "Maria@email.com",
    matricula: "67890",
    funcao: "Sargento",
    turno: "Noturno",
    acoes: "1",
    total: "3",
  },
    {
    id: 3, img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    name: "Carlos Pereira",
    email: "carlos@email.com",
    matricula: "54321",
    funcao: "Tenente",
    turno: "Diurno",
    acoes: "0",
    total: "2",
  },
  {
    id: 4, img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    name: "Ana Lima",
    email: "ana@email.com",
    matricula: "98765",
    funcao: "Capitã",
    turno: "Noturno",
    acoes: "3",
    total: "6", 
  }
];



function FuncionariosTabela() {

    
  return (
    <div className="funcionarios-tabela">
      <div className="labels">
        <button className="buttonFilter active">Todos</button>
        <button className="buttonFilter">Ocorrências Abertas</button>
        <button className="buttonFilter">Ocorrências Totais</button>
      </div>
      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Função</th>
            <th>Turno</th>
            <th>Ações Abertas</th>
            <th>Total de Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((funcionario) => (
            <tr key={funcionario.id}>
              <td className="nome">
                {funcionario.img && (
                  <img
                    src={funcionario.img}
                    alt={funcionario.name}
                    className="employee-image"
                  />
                )}
                <div className="nomeinfo">
                    <p className="employee-name">
                        {funcionario.name}
                    </p>
                    <span className="spanfuncionario">
                        {funcionario.email}
                    </span>
                </div>
              </td>
              <td className="spanfuncionario">{funcionario.matricula}</td>
              <td className="spanfuncionario">{funcionario.funcao}</td>
              <td className="spanfuncionario">{funcionario.turno}</td>
              <td className="spanfuncionario">{funcionario.acoes}</td>
              <td className="spanfuncionario">{funcionario.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="tfoot-cell">
              Total de Funcionários: {data.length}
            </td>
            <td>
                anterior
            </td>
            <td>
                <div>
                    1 2 3 ... 10
                </div>

            </td>
            <td>
                proximo
            </td>
          </tr>
        </tfoot>
      </table>

      </div>
  );
}

export default FuncionariosTabela;