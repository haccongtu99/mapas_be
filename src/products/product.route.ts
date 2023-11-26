import express from 'express'
import { productController } from './product.controller'
import { updateProductValidation } from './product.validation'
import { verifyAccessToken } from '@/middlewares'

const router = express.Router()

router.post(
  '/products/create',
  //   verifyAccessToken,
  productController.createProduct
)

router.get(
  '/products/:id',
  //   verifyAccessToken,
  productController.getProductDetails
)

router.get(
  '/products',
  //   verifyAccessToken,
  productController.getAllProducts
)

router.patch(
  '/products',
  //   verifyAccessToken,,
  updateProductValidation,
  productController.updateProduct
)

router.put(
  '/products/ratings',
  // verifyAccessToken,
  productController.ratingProduct
)

export = router
