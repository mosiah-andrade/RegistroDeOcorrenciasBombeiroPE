import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import ocorrenciaRoutes from './routes/ocorrenciaRoutes';

dotenv.config();

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

const MONGO = process.env.MONGO_URI || '';
mongoose.connect(MONGO, { })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.use('/api', authRoutes);
app.use('/api/ocorrencias', ocorrenciaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


