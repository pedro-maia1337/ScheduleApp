import mongoose from "mongoose"
const Schema = mongoose.Schema

const contactSchema = new Schema ({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    }
})

const Contact = mongoose.model("Contact", contactSchema)

export default Contact