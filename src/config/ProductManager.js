import {promises as fs} from 'fs';
import crypto from 'crypto';

export class ProductManager {

    constructor(path){
        this.path = path;
    }
    
    async getProducts(){
        try{ 
            return JSON.parse(await fs.readFile(this.path,'utf-8'));
        } catch(e) {
            return console.error('There was an error when finding the products:', e)
        }
    }

    async getProductById(id){
        try{
            const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
            return products.find(product => product.id === id);
        } catch(e) {
            return console.error('There was an error when finding the product:', e)
        }
    }

    async addProduct(newProduct) {
        try{
            if(newProduct.title && newProduct.description && newProduct.price && newProduct.stock && newProduct.code) {
                const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
                if(!products.find(prod => prod.code === newProduct.code)){
                    newProduct.id = crypto.randomBytes(10).toString('hex')
                    products.push(newProduct);
                    await fs.writeFile(this.path, JSON.stringify(products))
                    return 'Product was created successfully'
                } else{
                    return 'The product already exists'
                }
            } else {
                return 'Please enter all products properties'
            }
        } catch(e) {
            return console.error('There was an error when adding the product:', e)
        }
    }

    async updateProduct(id, newProduct) { 
        try{
            const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
            const index = products.findIndex(prod => prod.id === id);
            if(index != 1) {
                console.log(index);
                products[index].stock = newProduct.stock
                products[index].price = newProduct.price
                products[index].title = newProduct.title
                products[index].thumbnail = newProduct.thumbnail
                products[index].description = newProduct.description
                products[index].code = newProduct.code
                await fs.writeFile(this.path, JSON.stringify(products))
                return 'Product updated successfully'
            } else {
                return 'Product does not exists'
            }
        } catch(e) {
            return console.error('there was an error while updating the product:', e)
        }
        
    }

    async deleteProduct(id) {
        try {
            const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
            const index = products.findIndex(prod => prod.id === id);
            if(index != -1) {
                const filteredProducts = products.filter(prod => prod.id != id)
                await fs.writeFile(this.path, JSON.stringify(filteredProducts))
                return 'Product was deleted successfully'
            } else {
                return 'The product does not exists'
            }
        } catch(e) {
            return console.error('there was an error while deleting the product:', e)
        }
    }

}
