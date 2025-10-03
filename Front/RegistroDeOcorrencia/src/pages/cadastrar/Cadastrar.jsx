import React, { useState } from "react";
import styles from "./Cadastrar.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Cadastrar = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        numeroTelefone: "",
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

        
        if (form.password !== form.passwordConfirm) {
            setError("As senhas não coincidem.");
            return;
        }
        if (!form.email || !form.password) {
            setError("Preencha todos os campos.");
            return;
        }

        fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                numeroTelefone: form.numeroTelefone,
                password: form.password,
            }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                    navigate("/");
                } else {
                    setError(data.message || "Erro ao cadastrar usuário");
                }
            })
            .catch(() => {
                setError("Erro de conexão com o servidor");
            });
    };

    return (
        <div className="bg-black-900 " style={{ backgroundImage: `url(https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` , backgroundSize: 'cover', backgroundPosition: 'center', }}>
            <div className={styles.container}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <h2>Insira suas informações</h2>
                <form className={styles.form} id="cadastrarForm" onSubmit={handleSubmit} method="POST" >
                    <div className={styles.inputGroup}>
                        <label htmlFor="firstName" className={styles.label}>Primeiro Nome <span>*</span></label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className={styles.input}
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="lastName" className={styles.label}>Sobrenome <span>*</span></label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className={styles.input}
                            value={form.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email <span>*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.input}
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="numeroTelefone" className={styles.label}>Número de Telefone <span>*</span></label>
                        <input
                            type="text"
                            id="numeroTelefone"
                            name="numeroTelefone"
                            className={styles.input}
                            value={form.numeroTelefone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Senha <span>*</span></label>
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
                        <label htmlFor="passwordConfirm" className={styles.label}>Confirme a Senha <span>*</span></label>
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
                <p>Deseja voltar ao login? <a href="/login">Clique aqui</a></p>
            </div>
        </div>
    );
};

export default Cadastrar;