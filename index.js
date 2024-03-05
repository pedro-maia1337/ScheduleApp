import express from 'express'
const app = express()
import flash from 'connect-flash'
import bodyParser from 'body-parser'
import Handlebars from 'express-handlebars'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import 'dotenv/config'
import connectDatabase from './src/database/database.js'
import { fileURLToPath } from 'url'
import path from 'path'
import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'


app.use(session({
    secret: process.env.SECRETSTRING,
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONURL,
    }),
    resave: false,
    saveUninitialized: false
}))

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')  //variavel global
    res.locals.error_msg = req.flash('error_msg') //variavel global
    res.locals.error = req.flash('error')
    res.locals.user = req.session.user || null
    next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'src', 'views'));

app.engine('handlebars', Handlebars.engine({
    defaultLayout: 'main',
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))

const mainConnection = async () => {
    try {
        await connectDatabase()
    } catch(error) {
        console.log(`Error connecting to MongoDB: ${error}`)
        throw error
    }
}

mainConnection()

app.get("/", (req, res) => {
    res.render("index")
})

app.use("/usuarios", userRoute)
app.use("/auth", authRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('server running'))