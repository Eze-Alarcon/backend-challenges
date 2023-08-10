// Libraries
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  owner: { type: String, required: true, default: 'admin' },
  thumbnail: { type: [String], default: [] }
}, { versionKey: false })

productSchema.add({ id: mongoose.Types.ObjectId })

productSchema.pre('save', function (next) {
  if (!this.id) {
    this.id = JSON.parse(JSON.stringify(this._id))
  }
  next()
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model('products', productSchema)

export { productModel }
