import { ProductManager } from './mocks/ProductManager.js'
import colors from 'colors'

/* eslint space-before-function-paren: 0 */
const pm = new ProductManager('./src/storage/products.json')

pm.reset()

const p1 = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 1
}

const p2 = {
  title: 'producto prueba 2',
  description: 'Este es un producto prueba 2',
  price: 300,
  thumbnail: 'Sin imagen',
  code: 'abc456',
  stock: 2
}

const updateExample = { title: '123', price: 'abc' }

console.log(colors.green('------ getProducts -----'))

console.log(await pm.getProducts())

console.log(colors.blue('------ addProduct -----'))

console.log(await pm.addProduct(p1))
// console.log(await pm.addProduct(p1))

console.log(await pm.addProduct(p2))

// console.log(colors.red('------ getProducts -----'))

// console.log(await pm.getProducts())

// console.log(colors.cyan('------ getProductById -----'))

const products = await pm.getProducts()
// const p5 = await pm.getProductById(products[0].id)
// console.log(p5)

console.log(colors.red('------ updateProduct -----'))

// console.log(await pm.updateProduct(products[0].id, updateExample))

console.log('------ deleteProduct -----')

console.log(await pm.deleteProduct(2))
