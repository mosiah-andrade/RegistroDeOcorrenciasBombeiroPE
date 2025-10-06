const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://registro-de-ocorrencias-bombeiro-pe.vercel.app',
        'https://registrodeocorrenciasbombeirope.onrender.com',
    ]
}))

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const ocorrenciasRoutes = require('./routes/ocorrenciaRoutes');
app.use('/api/ocorrencias', ocorrenciasRoutes);