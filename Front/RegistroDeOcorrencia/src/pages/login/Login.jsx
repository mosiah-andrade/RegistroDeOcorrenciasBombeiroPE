import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/logo.svg";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "/";
            } else {
                setError(data.message || "Erro ao fazer login");
            }
        } catch {
            setError("Erro de conexão com o servidor");
        }
    };

    return (
        <div className={styles.container}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <h1>CBMPE</h1>
            <h2>Insira suas informações de cadastro</h2>
            <form className={styles.form} id="loginForm" onSubmit={handleSubmit}>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Usuário</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={styles.input}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={styles.input}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.button}>Entrar</button>
                <p>Esqueceu sua senha? <a href="#">Clique aqui</a> </p>
            </form>
               <p>Não possui uma conta? <a href="/cadastrar">Clique aqui</a></p>
        </div>
    );
};

export default Login;