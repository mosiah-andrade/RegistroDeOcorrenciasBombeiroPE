import React from "react";
import styles from "./Login.module.css"; // A extensão .module.css é crucial

const Login = () => {
    return (
        // Adicionei uma classe ao container principal para centralizar o formulário
        <div className={styles.container}> 
            <form className={styles.form} id="loginForm">
                <h2 className={styles.title}>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Usuário</label>
                    <input type="text" id="username" name="username" className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input type="password" id="password" name="password" className={styles.input} />
                </div>
                <button type="submit" className={styles.button}>Entrar</button>
                <a href="/cadastrar" >Sing in</a>
            </form>

        </div>
    );
};

export default Login;