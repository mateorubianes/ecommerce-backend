import express from 'express'
import { ProductManager } from './config/ProductManager.js';
import { Product } from './config/Product.js';

const productManager = new ProductManager('./data/products.json');
const PORT = 8000
const app = express()




// res.status(400).send('Enter a valid value for queries');

// res.status(400).send('Enter a valid number for queries');

app.get('/products', async(req, res) => {
    try {
        const {limit} = req.query;
        const intLimit = parseInt(limit)
        const prods = await productManager.getProducts()
        if (!intLimit)
            intLimit = prods.length
        const prodsLimit = prods.slice(0, intLimit)
        res.status(200).send(prodsLimit)
    } catch(e) {
        res.status(500).send('There was an error while getting the products: ' + e);
    }
})

app.get('/products/:id', async(req, res) => {
    try{
        const productId = req.params.id
        res.status(200).send(await productManager.getProductById(productId))
    } catch(e) {
        res.status(500).send('There was an error while getting the product: ', e)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`URL ===> http://localhost:${PORT}`);
})