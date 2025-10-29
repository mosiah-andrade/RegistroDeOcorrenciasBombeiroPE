// import React, { useState } from "react";
// import styles from "./Esqueceu.module.css";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";

// const Cadastrar = () => {
//     const [form, setForm] = useState({
//         numeroTelefone: "",
//         password: "",
//     });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//         setError("")
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // 1. **Validação**: Pelo menos um campo (email ou telefone) deve ser preenchido
//         if (!form.email && !form.numeroTelefone) {
//             setError("Preencha o e-mail OU o número de telefone.");
//             return;
//         }

//         // 2. **Determinar os dados a enviar**: Envia apenas um dos dois.
//         const payload = {
//             email: form.email || undefined, // Se vazio, não envia
//             numeroTelefone: form.numeroTelefone || undefined, // Se vazio, não envia
//         };

//         // 3. **API e Envio**: Mudar o endpoint para /api/forgot-password (ou o que o seu backend usa)
//         fetch("http://localhost:5000/api/forgot-password", { // << MUDANÇA DE URL
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload), // << MUDANÇA DE DADOS ENVIADOS
//         })
//         .then(async (response) => {
//             // Não é necessário verificar response.ok, pois por segurança, 
//             // a resposta deve ser a mesma para usuário existente ou não.
            
//             // 4. **Sucesso/Feedback**: Mostrar mensagem de sucesso e navegar, 
//             // indicando que o processo de recuperação foi iniciado.
//             alert("Se o e-mail/número estiver cadastrado, você receberá um link de recuperação.");
//             navigate("/"); // Redireciona para a tela de login
//         })
//         .catch(() => {
//             // Mantém o tratamento de erro de conexão
//             setError("Erro de conexão com o servidor");
//         });
//     };

//     return (
//          <div className="bg-black-900 " style={{ backgroundImage: `url(https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` , backgroundSize: 'cover', backgroundPosition: 'center'}}>
//             <div className={styles.container}>
//                 <img src={logo} alt="Logo" className={styles.logo} />
//                 <h2>Esqueceu a Senha?</h2>
//                 <p className="plogin">Recupere a senha pelo e-mail ou número</p>
//                 <form className={styles.form} id="cadastrarForm" onSubmit={handleSubmit} method="POST" >
//                     <div className={styles.inputGroup}>
//                         <label htmlFor="email" className={styles.label}>Email <span className={"span"}>*</span></label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             className={styles.input}
//                             value={form.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <p className="plogin">Ou</p>
//                     <div className={styles.inputGroup}>
//                         <label htmlFor="numeroTelefone" className={styles.label}>Número de Telefone <span className={"span"}>*</span></label>
//                         <input
//                             type="text"
//                             id="numeroTelefone"
//                             name="numeroTelefone"
//                             className={styles.input}
//                             value={form.numeroTelefone}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     {error && <div className={styles.error}>{error}</div>}
//                     <section className={styles.buttonBox} >
//                         <button type="submit" className={styles.button}>Enviar</button>
//                         <button type="button" className={styles.buttonCancelar} onClick={() => navigate(-1)}>Cancelar</button>
//                     </section>
//                 </form>
//                 <p className="plogin">Não possui uma conta? <a href="/cadastrar">Crie agora!</a></p>
//             </div>
//         </div>
//     );
// };

// export default Cadastrar;