import mongoose, { Schema, model } from 'mongoose'
import { EProductColor, IProduct } from './product.interface'

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'ProductCategory'
    },
    quantity: {
      type: Number,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    },
    images: {
      type: Array
    },
    color: {
      type: String,
      enum: EProductColor
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
        comment: { type: String }
      }
    ],
    totalRatings: {
      type: Number,
      default: 0
    },
    specs: { type: Array, default: [] }
  },
  {
    collection: 'products',
    timestamps: true
  }
)

const ProductModel = model<IProduct>('Product', ProductSchema)

export default ProductModel
