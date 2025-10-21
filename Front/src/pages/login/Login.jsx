import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLoged, setKeepLoged] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: email, password, keepLoged }),
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
        <div className="bg-black-900 page ">
           
            <div className={"container"}>
                <form className={"form"} id="loginForm" onSubmit={handleSubmit}>
                    <img src={logo} alt="Logo" className={"logo"} />
                    <p className="subtitle">Que bom ter você de volta</p>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <div className={"inputGroup"}>
                        <input
                            type="text"
                            id="emailOrCPF"
                            name="email ou CPF"
                            className={"input"}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="E-mail"
                        />
                    </div>
                    <div className={"inputGroup"}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={"input"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Senha"
                        />
                    </div>
                    <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="keepLogedCheckbox"
                                className="checkbox-input"
                                checked={keepLoged}
                                onChange={e => setKeepLoged(e.target.checked)}
                            />
                            <label htmlFor="keepLogedCheckbox" className="checkbox-label"></label>
                            <span className={"span"}>Mantenha-me logado</span>
                        </div>
                    <button type="submit" className={"button"}>Entrar</button>
                    <p className={"loginFooter"}>Esqueceu sua senha? <a href="/esqueceu" className={"loginFooter"}>Clique aqui</a> </p>
                </form>
            </div>
            <div className="bg"></div>
        </div>
    );
};

export default Login;