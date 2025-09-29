const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { firstName, lastName, email, CPF, phone, password } = req.body
    if (!username || !password || !firstName ||!lastName || !email || !CPF || !phone) return res.status(400).json({ message: 'Por favor, preencha todos os campos.' })

    try {
        const userExists = await User.findOne({ CPF })
        if (userExists) return res.status(400).json({ message: 'Usuário já existe.' })

        const crip = await bcrypt.hash(password, 10)
        const user = new User({ firstName, lastName, email, CPF, phone, password: crip })
        await user.save()
        res.status(201).json({ message: 'Usuário registrado' })
    } catch (e) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário' })
    }
}

exports.login = async (req, res) => {
    const { CPF, password } = req.body
    if (!CPF || !password) return res.status(400).json({ message: 'Por favor, preencha todos os campos.' })

    try {
        const user = await User.findOne({ CPF })
        if (!user) return res.status(400).json({ message: 'Usuário não encontrado.' })

        const validar = await bcrypt.compare(password, user.password)
        if (!validar) return res.status(400).json({ message: 'Senha incorreta.' })

        const token = jwt.sign(
            { id: user._id, CPF: user.CPF },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.json({ token })
    } catch (e) {
        res.status(500).json({ message: 'Erro ao fazer login' })
    }
}