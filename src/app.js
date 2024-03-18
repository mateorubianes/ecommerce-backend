//Imports
import express from 'express'
import mongoose from 'mongoose'
import indexRouter from './routes/indexRouter.js'
import { __dirname } from './path.js'

//Configs
const app = express()
const PORT = 8080

//Database connection
mongoose.connect('mongodb+srv://materub2003:<password>@coderhouse.hxi7mp1.mongodb.net/?retryWrites=true&w=majority&appName=coderhouse')
.then(() => console.log('DB connected'))
.catch(e => console.log(e))


//Middlewares
app.use(express.json())
app.use('/static', express.static(__dirname + 'public'))

//Routes
app.use('/', indexRouter)

//Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} - - - - URL: http://localhost:${PORT}`)
})