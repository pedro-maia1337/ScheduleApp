import Contact from "../models/Contact.model.js"


const showRegisterContactForm = (req, res) => {
    res.render('user/register')
}


const registerContact = async (req, res) => {
    const {nome, sobrenome, email, telefone} = req.body

    try {
        const newContact = {nome, sobrenome, email, telefone}

        await new Contact(newContact).save()

        req.flash('success_msg', 'Contato criado com sucesso')
        return res.redirect("/usuarios")

    } catch (error) {
        req.flash('error_msg', 'Houve um erro ao criar o contato')
    }
}

const showContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.render('user/home', { contacts })

    } catch(error) {
        req.flash('error_msg', 'Houve um erro ao procurar os contatos')
        res.redirect('/usuarios')
    }
}

const showEditForm = async (req,res) => {
    try {
        const contact = await Contact.findOne({ _id: req.params.id }).lean()
        res.render('user/editcontact', { contact })
    } catch(error) {
        req.flash('error_msg', 'Houve um erro ao encontrar esse vídeo')
        res.redirect('/usuarios')
    } 
}

const editForm = async (req, res) => {
    const {nome, sobrenome, email, telefone} = req.body

    try {
        const contact = await Contact.findOne({ _id: req.body.id})

        if(!contact) {
            req.flash('error_msg', 'Não foi possível encontrar esse vídeo')
            return res.redirect('/usuarios')
        }

        contact.nome = nome
        contact.sobrenome = sobrenome
        contact.email = email
        contact.telefone = telefone

        req.flash("success_msg", 'Contato editado com sucesso')
        await contact.save()
        return res.redirect("/usuarios")

    } catch(error){
        req.flash('error_msg', 'Houve um erro ao salvar na edição do contato')
    }
}


const deleteContact = async (req, res) => {
    try {
        await Contact.deleteOne({_id: req.params.id})
        req.flash('success_msg', 'Contato deletado com sucesso')
        return res.redirect('/usuarios')
    } catch (error) {
        req.flash('error_msg', 'houve um erro ao apagar o contato')
        return res.redirect('/usuarios')
    }
   
}

export {registerContact, showContacts, showEditForm, editForm, deleteContact, showRegisterContactForm}

