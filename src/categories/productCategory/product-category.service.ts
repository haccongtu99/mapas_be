import createHttpError from 'http-errors'
import { TCreateProductCategory } from './product-category.interface'
import ProductCategoryModel from './product-category.model'

const productCategoryService = {
  create: async (params: TCreateProductCategory) => {
    if (!Object.keys(params).length) throw createHttpError.NotFound()

    const newCategory = new ProductCategoryModel({ ...params })

    if (!newCategory) throw createHttpError.BadRequest()

    return {
      code: 200,
      message: `${params.title} has been created`,
      category: (await newCategory.save()).toObject()
    }
  }
}

export default productCategoryService
