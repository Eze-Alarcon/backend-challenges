/* eslint-disable no-prototype-builtins */
// Libraries
import mongoose from 'mongoose'

// Schemas
import { cartModel } from '../schemas/mongoose/cart.schema.js'

class DB_CART_MANAGER {
  #model
  constructor (model) {
    this.#model = model
  }

  #toPOJO (item) {
    return JSON.parse(JSON.stringify(item))
  }

  async getCarts () {
    const response = await this.#model.find({}, { _id: 0, products: { _id: 0 } })
    const carts = this.#toPOJO(response)
    return carts
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

    const carts = this.#toPOJO(response)

    if (carts.length === 0) throw new Error()

    // me trae un array, de esta forma obtengo el valor que busco
    return carts[0]
  }

  async createCart (item) {
    try {
      const response = await this.#model.create(item)
      const data = this.#toPOJO(response)
      return data
    } catch (error) {
      throw new Error()
    }
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

const DAO_CARTS = new DB_CART_MANAGER(cartModel)

export { DAO_CARTS }
