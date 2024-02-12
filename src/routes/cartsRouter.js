import { Router } from "express";
import { CartManager } from "../config/CartManager";

const cartsRouter = Router();
const cartManager = new CartManager()

cartRouter.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getCart()
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Internal error when consulting the cart products: ${error}`)
    }
})

cartRouter.post('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid
        const { quantity } = req.body
        const msg = await cartManager.addProductByCart(productId, quantity)
        res.status(200).send(msg)
    } catch (error) {
        res.status(500).send(`Internal error while creating the product: ${error}`)
    }
})

export default cartRouter