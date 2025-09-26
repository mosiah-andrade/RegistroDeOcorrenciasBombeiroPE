import React, { useState } from "react";
import styles from "./Cadastrar.module.css";
import { useNavigate } from "react-router-dom";


const Cadastrar = () => {
    const [form, setForm] = useState({
        username: "",
        usernameConfirm: "",
        password: "",
        passwordConfirm: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // Limpa erro ao digitar
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.username !== form.usernameConfirm) {
            setError("Os nomes de usuário não coincidem.");
            return;
        }
        if (form.password !== form.passwordConfirm) {
            setError("As senhas não coincidem.");
            return;
        }
        if (!form.username || !form.password) {
            setError("Preencha todos os campos.");
            return;
        }

        alert("Cadastro realizado com sucesso!");

        // Aqui você pode adicionar lógica para processar os dados do formulário

        // fetch('https://sua-api.com/cadastrar', {
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({
            //     username: form.username,
            //     password: form.password,
            // }),
            // })
            // .then(response => response.json())
            // .then(data => {
            // console.log('Success:', data);
            // })
            // .catch((error) => {
            // console.error('Error:', error);
        // });

        navigate("/"); // Redireciona para a página de login após o cadastro
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} id="cadastrarForm" onSubmit={handleSubmit} method="POST" >
                <h2 className={styles.title}>Cadastrar</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Nome de Usuário</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={styles.input}
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="usernameConfirm" className={styles.label}>Repita o Nome de Usuário</label>
                    <input
                        type="text"
                        id="usernameConfirm"
                        name="usernameConfirm"
                        className={styles.input}
                        value={form.usernameConfirm}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={styles.input}
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="passwordConfirm" className={styles.label}>Repita a Senha</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        className={styles.input}
                        value={form.passwordConfirm}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button type="submit" className={styles.button}>Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastrar;