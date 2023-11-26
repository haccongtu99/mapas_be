import Joi from 'joi'
import { EProductColor } from './product.interface'

const productSchema = {
  updateProduct: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().max(24),
    description: Joi.string().max(256),
    brand: Joi.string().lowercase().valid('apple', 'sony', 'dell'),
    price: Joi.number().min(0),
    quantity: Joi.number().min(0),
    sold: Joi.number().min(0).max(Joi.ref('quantity')),
    color: Joi.string().valid(EProductColor),
    specs: Joi.array().items(Joi.string())
  })
}

export default productSchema
