import { IAuthRequest } from '@/auth/auth.interface'
import { NextFunction, Response } from 'express'
import productService from './product.service'

export const productController = {
  createProduct: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, product } = await productService.create(req.body)
      return res.status(code).json({ data: product, numberRequest: req.limit })
    } catch (err) {
      next(err)
    }
  },
  getProductDetails: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params
      const { code, product, message } = await productService.getOne(id)
      return res.status(code).json({ data: product, message })
    } catch (err) {
      next(err)
    }
  },
  getAllProducts: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, products, totalPages, currentPage } =
        await productService.getAll(req.query)
      return res.status(code).json({ data: products, totalPages, currentPage })
    } catch (err) {
      next(err)
    }
  },
  updateProduct: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, data, message } = await productService.update(req.body)
      return res.status(code).json({ data, message })
    } catch (err) {
      next(err)
    }
  },
  ratingProduct: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, message, data } = await productService.ratings(req.body)
      return res.status(code).json({ message, data })
    } catch (err) {
      next(err)
    }
  }
}
