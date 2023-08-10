// Models
import { Cart } from '../models/cart.model.js'
import { CustomError } from '../models/error.model.js'

// Services
import { productService } from './product.service.js'

// DAOs
import { DAO_CARTS } from '../dao/carts.database.js'

// Utils
import { validateQuantity } from '../utils/validations.js'
import { CART_MANAGER_ERRORS } from '../utils/errors.messages.js'

/* -------------------------------------------- */

class CartService {
  #dao
  constructor ({ DAO }) {
    this.#dao = DAO
  }

  #toPOJO (value) {
    return JSON.parse(JSON.stringify(value))
  }

  #findIndex (arr, searchedValue) {
    const productIndex = arr.products.findIndex((el) => {
      const parseElement = el.product._id
      const productID = this.#toPOJO(parseElement)
      return productID === searchedValue
    })
    return {
      exist: productIndex !== -1,
      index: productIndex
    }
  }

  async checkCart ({ cartID }) {
    const { cart } = await this.getOne(cartID)
    const productsAvailables = []
    for (const item of cart.products) {
      const { product } = await productService.getOne({ id: item.product.id })
      if (item.quantity > product.stock) continue
      productsAvailables.push({ ...item.product, quantity: item.quantity })
    }
    return { cart, productsAvailables }
  }

  async getMany () {
    try {
      const carts = await this.#dao.getMany()
      return { carts }
    } catch (err) {
      throw new CustomError(CART_MANAGER_ERRORS.CART_NOT_FOUND)
    }
  }

  async getOne ({ id }) {
    try {
      const { cart } = await this.#dao.getOne({ id })
      const totalProducts = cart.products.reduce((acc, el) => acc + el.quantity, 0)
      return { total_products: totalProducts, cart }
    } catch (err) {
      throw new CustomError(CART_MANAGER_ERRORS.CART_NOT_FOUND)
    }
  }

  async createOne ({ email }) {
    try {
      const cartModel = new Cart({ email })
      const newCart = await this.#dao.createOne(cartModel.DTO())
      return { cart: newCart }
    } catch (err) {
      throw new CustomError(CART_MANAGER_ERRORS.CREATE_CARTS)
    }
  }

  async createCartProduct ({ cartID, productID, quantityValue = null }) {
    try {
      const { error } = validateQuantity(quantityValue)
      if (error !== undefined) CustomError.userError(error)

      const { cart } = await this.#dao.getOne({ id: cartID })
      const { product } = await productService.getOne({ id: productID })

      if (cart.cartOwner === product.owner) throw new CustomError(CART_MANAGER_ERRORS.SAME_OWNER)

      const parsedID = this.#toPOJO(product._id)
      const { exist, index } = this.#findIndex(cart, parsedID)

      if (!exist) {
        const details = await this.#dao.createCartProduct({ id: cartID, productID: product._id })
        return { details }
      }
      const newValue = quantityValue ?? ++cart.products[index].quantity

      const updateInfo = {
        id: cartID,
        productID: parsedID,
        quantity: newValue
      }

      const details = await this.#dao.updateCartProduct(updateInfo)
      return { details }
    } catch (err) {
      throw new CustomError(CART_MANAGER_ERRORS.ADD_PRODUCT_TO_CART)
    }
  }

  async deleteManyCartProducts ({ id }) {
    try {
      const cartUpdated = await this.#dao.deleteManyCartProducts({ id })

      return { cart_updated: cartUpdated }
    } catch (err) {
      throw new CustomError(CART_MANAGER_ERRORS.CART_NOT_FOUND)
    }
  }

  async deleteOneCartProduct ({ cartID, productID }) {
    try {
      const { product } = await productService.getOne({ id: productID })
      const parsedID = this.#toPOJO(product._id)

      const { product_removed } = await this.#dao.deleteOneCartProduct({ id: cartID, productID: parsedID })

      return { product_removed }
    } catch (err) {
      throw new CustomError(CART_MANAGER_ERRORS.CART_NOT_FOUND)
    }
  }
}

const cartService = new CartService({ DAO: DAO_CARTS })

export { cartService }
