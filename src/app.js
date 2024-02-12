//Importaciones
import express from 'express'
import productsRouter from './routes/productsRouter.js'
import { __dirname } from './path.js'

//COnfiguraciones
const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use('/static', express.static(__dirname + 'public'))

//Routes
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

//Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} - - - - URL: http://localhost:${PORT}`)
})