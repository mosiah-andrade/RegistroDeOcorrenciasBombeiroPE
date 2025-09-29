import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("https://psychic-meme-v6j69rx6xr62666w-5000.app.github.dev/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Salve o token se quiser autenticação persistente
                localStorage.setItem("token", data.token);
                // Redirecione ou mostre sucesso
                window.location.href = "/"; // ou use navigate do react-router
            } else {
                setError(data.message || "Erro ao fazer login");
            }
        } catch {
            setError("Erro de conexão com o servidor");
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} id="loginForm" onSubmit={handleSubmit}>
                <h2 className={styles.title}>Login</h2>
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
                <a href="/cadastrar">Sing in</a>
            </form>
        </div>
    );
};

export default Login;