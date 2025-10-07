import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/logo.svg";

const Login = () => {
    const [emailOrCPF, setEmailOrCPF] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: emailOrCPF, password }),
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
        <div className="bg-black-900 " style={{ backgroundImage: `url(https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className={styles.container}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <h1>CBMPE</h1>
                <h2>Insira suas informações de cadastro</h2>
                <form className={styles.form} id="loginForm" onSubmit={handleSubmit}>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <div className={styles.inputGroup}>
                        <label htmlFor="emailOrCPF" className={styles.label}>Email ou CPF</label>
                        <input
                            type="text"
                            id="emailOrCPF"
                            name="email ou CPF"
                            className={styles.input}
                            value={emailOrCPF}
                            onChange={e => setEmailOrCPF(e.target.value)}
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
                    <p>Esqueceu sua senha? <a href="/esqueceu">Clique aqui</a> </p>
                </form>
                <p>Não possui uma conta? <a href="/cadastrar">Crie agora!</a></p>
            </div>
        </div>
    );
};

export default Login;