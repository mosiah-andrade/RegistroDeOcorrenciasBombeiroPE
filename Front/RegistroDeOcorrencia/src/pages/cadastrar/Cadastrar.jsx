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
        setForm({ ...form, [e.target.name]: e.target.value })
        setError("")
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

        // Integração com o back-end Node.js/MongoDB
        fetch("https://psychic-meme-v6j69rx6xr62666w-5000.app.github.dev/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
            }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    // Cadastro realizado com sucesso
                    alert("Cadastro realizado com sucesso!");
                    navigate("/"); // Redireciona para login
                } else {
                    setError(data.message || "Erro ao cadastrar usuário");
                }
            })
            .catch(() => {
                setError("Erro de conexão com o servidor");
            });
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