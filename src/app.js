//Imports
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import messageModel from './models/messages.js'
import indexRouter from './routes/indexRouter.js'
import { Server } from 'socket.io'
import { __dirname } from './path.js'
import environment from './config/environment.js'
//Configs
const app = express()
const PORT = environment.port
const io = new Server(server)

//Database connection
mongoose.connect(environment.mongoDbUrl)
.then(() => console.log('DB connected'))
.catch(e => console.log(e))


//Middlewares
app.use(express.json())
app.use('/static', express.static(__dirname + 'public'))

//Routes
app.use('/', indexRouter)

//Cookies
app.use(session({
    secret: "coderSecret",
    resave: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://franciscopugh01:coderhouse@cluster0.uggkmbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 60 * 60
    }),
    saveUninitialized: true
}))
app.use(cookieParser("claveSecreta"))
app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una cookie :)', { maxAge: 3000000, signed: true }).send("Cookie creada")
})

app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send("Cookie eliminada")
    //res.cookie('CookieCokie', '', { expires: new Date(0) })
})

//Socket io
io.on('connection', (socket) => {
    console.log("Conexion con Socket.io")

    socket.on('mensaje', async (mensaje) => {
        try {
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        } catch (e) {
            io.emit('mensajeLogs', e)
        }

    })

})

//Login
app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (email == "admin@admin.com" && password == "1234") {
        req.session.email = email
        req.session.password = password


    }
    console.log(req.session)
    res.send("Login")
})

//Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} - - - - URL: http://localhost:${PORT}`)
})