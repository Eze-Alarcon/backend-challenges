/* eslint-disable no-prototype-builtins */
import mongoose from 'mongoose'
import { cartModel } from '../schemas/cart.schema.js'

class DB_CART_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #parseResponse (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getLastID () {
    const data = await this.#model
      .find()
      .sort({ id: 'desc' })
      .limit(1)
      .lean()

    // Si no tiene la propiedad es porque no existe ningun carrito
    if (data.length === 0 || !data[0].hasOwnProperty('id')) { return 1 }

    return Number(data[0].id) + 1
  }

  async getCarts () {
    const response = await this.#model.find({}, { _id: 0, products: { _id: 0 } }).lean()
    return response
  }

  async findCartByID ({ id }) {
    const response = await this.#model
      .find(
        { id },
        { _id: 0, products: { _id: 0 } })
      .populate(
        {
          path: 'products.product',
          select: '-stock'
        })
      .lean()

    if (response.length === 0) throw new Error()

    // me trae un array, de esta forma obtengo el valor que busco
    return response[0]
  }

  async createCart (item) {
    console.log(item)
    const response = await this.#model.create(item)
    const data = this.#parseResponse(response)
    return data
  }

  async addProductToCart ({ id, productID }) {
    await this.#model.updateOne(
      { id },
      {
        $push:
        {
          products:
          {
            product: new mongoose.Types.ObjectId(productID),
            quantity: 1
          }
        }
      }
    )
    return {
      productAdded: true,
      productModified: false,
      quantityValue: 1
    }
  }

  async updateCartProductQuantity ({ cartID, productID, quantity }) {
    const data = await this.#model.updateOne(
      { cartID, 'products.product': productID },
      { $set: { 'products.$[elem].quantity': quantity } },
      { arrayFilters: [{ 'elem.product': productID }] }
    )
    const dataWasModified = data.modifiedCount > 0

    return {
      productAdded: false,
      productModified: dataWasModified,
      quantityValue: quantity
    }
  }

  async deleteAllCartProducts ({ id }) {
    const response = await this.#model.updateOne(
      { id },
      { $set: { products: [] } }
    )
    return response
  }

  async deleteCartProduct ({ id, productID }) {
    const data = await this.#model.updateOne(
      { id },
      { $pull: { products: { product: productID } } }
    )
    const dataWasModified = data.modifiedCount > 0
    return {
      productRemoved: dataWasModified
    }
  }
}

const DB_CARTS = new DB_CART_MANAGER(cartModel)

export { DB_CARTS }
