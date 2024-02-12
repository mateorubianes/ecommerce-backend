import { promises as fs } from 'fs'

export class CartManager {
    constructor(path) {
        this.products = path
    }

    async getCart() {
        const cart = JSON.parse(await fs.readFile(this.products, 'utf-8'))
        return cart
    }

    async addProductByCart(productId, quantityParam) {
        const cart = JSON.parse(await fs.readFile(this.products, 'utf-8'))

        const index = cart.findIndex(product => product.id == productId)

        if (index != -1) {
            cart[index].quantity += quantityParam
        } else {
            const prod = { id: productId, quantity: quantityParam }
            cart.push(prod)
        }
        await fs.writeFile(this.products, JSON.stringify(cart))
        return "Producto was added successfully"
    }

}