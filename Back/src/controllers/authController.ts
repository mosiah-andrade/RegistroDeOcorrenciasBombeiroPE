import { Request, Response } from 'express';
import User, {Role} from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, CPF, phone, password } = req.body;

  if (!firstName || !lastName || !email || !CPF || !phone || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { CPF }] });
    if (userExists) return res.status(400).json({ message: 'Usuário já existente.' });

    const crip = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      CPF,
      phone,
      password: crip,
      role: Role.USER
    });
    await user.save();

    res.status(201).json({ message: 'Usuário registrado' });
  } catch (err: any) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  try {
    const user = await User.findOne({ $or: [{ email: identifier }, { CPF: identifier }] });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta.' });

    const token = jwt.sign({
      id: user._id,
      email: user.email,
      CPF: user.CPF,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role

    }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
  }
};