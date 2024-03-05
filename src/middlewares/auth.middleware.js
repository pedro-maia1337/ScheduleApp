import jwt from 'jsonwebtoken'
import 'dotenv/config'

const validateLoginFields = (req, res, next) => {
    const errors = []

    const {email, senha} = req.body

    if(!email) errors.push({text: 'Email inválido'})
    if(!senha) errors.push({text: 'Senha inválido'})

    if(errors.length > 0) {
        return res.render('auth/login', { errors })
    }

    next()
}

const checkToken = (req, res, next) => {
    const authHeader = req.headers['autorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        req.flash('error_msg', 'Você precisa estar logado para acessar essa funcionalidade')
        return res.redirect('/')
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        return next()


    } catch (error) {
        req.flash('error_msg', 'Você precisa estar logado para acessar essa funcionalidade')
        res.redirect('/')
    }
}

export {validateLoginFields, checkToken}