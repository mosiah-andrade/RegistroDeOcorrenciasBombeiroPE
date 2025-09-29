const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'Por favor, preencha todos os campos.' })

    try {
        const userExists = await User.findOne({ username })
        if (userExists) return res.status(400).json({ message: 'Usuário já existe.' })

        const crip = await bcrypt.hash(password, 10)
        const user = new User({ username, password: crip })
        await user.save()
        res.status(201).json({ message: 'Usuário registrado' })
    } catch (e) {
        res.status(500).json({ message: 'Erro ao cadastrar usuario' })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'Por favor, preencha todos os campos.' })

    try {
        const User = await User.findOne({ username })
        if (!User) return res.status(400).json({ message: 'Usuário não encontrado.' })

        const validar = await bcrypt.compare(password, User.password)
        if (!validar) return res.status(400).json({ message: 'Senha incorreta.' })

        const token = jwt.sign(
            { id: User._id, username: User.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
    } catch (e) {
        res.status(500).json({ message: 'Erro ao fazer login' })
    }
}