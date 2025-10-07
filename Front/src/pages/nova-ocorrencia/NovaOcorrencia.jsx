import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NovaOcorrencia.module.css';

const NovaOcorrencia = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nomeResponsavel: '',
        cargoResponsavel: 'Analista',
        regiao: '',
        tipo: 'Incêndio',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { nomeResponsavel, cargoResponsavel, regiao, tipo } = formData;

        if (!nomeResponsavel) {
            setError('O nome do responsável é obrigatório.');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ocorrencias`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    responsavel: {
                        nome: nomeResponsavel,
                        cargo: cargoResponsavel
                    },
                    regiao,
                    tipo
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar ocorrência.');
            }

            alert('Ocorrência criada com sucesso!');
            navigate('/'); // Redireciona para a página inicial

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Nova Ocorrência</h2>
                {error && <p className={styles.error}>{error}</p>}
                
                <div className={styles.inputGroup}>
                    <label htmlFor="nomeResponsavel">Nome do Responsável</label>
                    <input
                        type="text"
                        id="nomeResponsavel"
                        name="nomeResponsavel"
                        value={formData.nomeResponsavel}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="cargoResponsavel">Cargo do Responsável</label>
                    <select
                        id="cargoResponsavel"
                        name="cargoResponsavel"
                        value={formData.cargoResponsavel}
                        onChange={handleChange}
                    >
                        <option value="Analista">Analista</option>
                        <option value="Chefe">Chefe</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="regiao">Região</label>
                    {/* <input
                        id="regiao"
                        name="regiao"
                        value={formData.regiao}
                        onChange={handleChange}
                    >
                        <option value="Recife-PE">Recife-PE</option>
                        <option value="São Paulo-SP">São Paulo-SP</option>
                        <option value="Belo Horizonte-MG">Belo Horizonte-MG</option>
                    </input> */}

                    <input type="text" 
                        id="regiao"
                        name="regiao"
                        value={formData.regiao}
                        onChange={handleChange} />
                </div>
                
                <div className={styles.inputGroup}>
                    <label htmlFor="tipo">Tipo</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                    >
                        <option value="Incêndio">Incêndio</option>
                        <option value="Resgate">Resgate</option>
                        <option value="Químico">Químico</option>
                    </select>
                </div>

                <div className={styles.buttonGroup}>
                    <button type="button" onClick={() => navigate(-1)} className={styles.cancelButton}>Cancelar</button>
                    <button type="submit" className={styles.submitButton}>Criar Ocorrência</button>
                </div>
            </form>
        </div>
    );
};

export default NovaOcorrencia;