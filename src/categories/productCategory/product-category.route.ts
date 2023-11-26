import { verifyAccessToken } from '@/middlewares'
import express from 'express'
import { productCategoryController } from './product-category.controller'

const router = express.Router()

router.post(
  '/product-category/create',
  verifyAccessToken,
  productCategoryController.createProductCategory
)

export = router
