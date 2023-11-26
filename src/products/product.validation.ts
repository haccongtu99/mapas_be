import validator from '@/middlewares/validator'
import { RequestHandler } from 'express'
import productSchema from './product.schema'

export const updateProductValidation: RequestHandler = (req, res, next) =>
  validator(productSchema.updateProduct, req.body, next)
