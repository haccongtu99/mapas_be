import { IAuthRequest } from '@/auth/auth.interface'
import { NextFunction, Response } from 'express'
import productCategoryService from './product-category.service'

export const productCategoryController = {
  createProductCategory: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, category, message } = await productCategoryService.create(
        req.body
      )
      return res
        .status(code)
        .json({ data: category, message, numberRequest: req.limit })
    } catch (err) {
      next(err)
    }
  }
}
