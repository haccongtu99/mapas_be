import { Schema, model } from 'mongoose'
import { productCategory } from './product-category.constant'

const ProductCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
      enum: {
        values: [
          productCategory.CAMERA,
          productCategory.SMART_PHONE,
          productCategory.LAPTOP
        ],
        message: `Please select category only from short listed option (
          ${productCategory.CAMERA},
          ${productCategory.SMART_PHONE},
          ${productCategory.LAPTOP})`
      },
      default: productCategory.ALL
    }
  },
  {
    timestamps: true
  }
)

const ProductCategoryModel = model('ProductCategory', ProductCategorySchema)

export default ProductCategoryModel
