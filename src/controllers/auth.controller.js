import User from '../models/User.model.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const showRegisterForm = (req, res) => {
    res.render('auth/register')
}


const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const userExist = await User.findOne({email: email})
        
        if(userExist){
            req.flash('error_msg', 'Já existe um usuário criado com esse email')
            return res.redirect('/auth/criar/conta')
        }
        
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)
        
        const newUser = {nome, email, senha}
        newUser.senha = passwordHash

        await new User(newUser).save()
        req.flash('success_msg', 'Usuário criado com sucesso')
        return res.redirect('/')

    } catch (error) {
        req.flash('error_msg', 'Houve um erro ao criar usuario, tente novamente') 
    }
}

const showRegisterLogin = (req, res) => {
    res.render('auth/login')
}

const login = async (req, res) => {
    const {email, senha} = req.body

    const user = await User.findOne({email: email})

    if(!user){
        req.flash('error_msg', 'Não foi possível encontrar esse usuário')
        return res.redirect('/auth/login')
    }

    const checkPassword = await bcrypt.compare(senha, user.senha)

    if(!checkPassword){
        req.flash('error_msg', 'Senha inválida')
        return res.redirect('/auth/login')
    }

    try {
        
        const secret = process.env.SECRET

        const token = jwt.sign({id: user._id}, secret, {expiresIn: 3600})

        req.flash('success_msg', 'Login realizado com sucesso')
        return res.redirect('/usuarios')


    } catch (error) {
        req.flash('error_msg', 'Houve um erro interno')
        res.redirect('/')
    }
}

export {showRegisterForm, registerUser, showRegisterLogin, login}