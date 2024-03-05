const validateContactFields = (req, res, next) => {
    const errors = []

    const {nome, sobrenome, email, telefone} = req.body

    if(!nome) errors.push({text: 'Nome inválido'})
    if(!sobrenome) errors.push({text: 'Sobrenome inválido'})
    if(!email) errors.push({text: 'Email inválido'})
    if(!telefone) errors.push({text: 'Telefone inválido'})

    if(errors.length > 0) {
        const template = req.originalUrl === 'user/editcontact' ? 'user/editcontact' : 'user/register'
        return res.render(template, { errors })
    }

    next()
}

const validateUserFields = async (req, res, next) => {
    const errors = []

    const {nome, email, senha, senha2} = req.body

    if(!nome) errors.push({text: 'Nome inválido'})
    if(!email) errors.push({text: 'Email inválido'})
    if(!senha) errors.push({text: 'Senha inválido'})
    if(senha.length < 4) errors.push({text: 'Senha muito curta'})
    if(senha !== senha2) errors.push({text: 'Senhas não conferem'})

    if(errors.length > 0) {
        return res.render('auth/register', { errors })
    }

    next()
}

export {validateContactFields, validateUserFields}