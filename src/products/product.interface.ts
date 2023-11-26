import { TPagination } from '@/interface/global'
import { IUser } from '@/users/user.interface'
import { Document } from 'mongoose'

enum EProductColor {
  BLACK = 'black',
  GREEN = 'green',
  BLUE = 'blue'
}

type TRating = { star: number; postedBy: IUser['id']; comment: string }
interface IProduct extends Document {
  title: string
  slug: string
  description: string
  brand: string
  code: string
  price: number

  category: string
  quantity: number
  sold: number
  images: string
  color: EProductColor
  ratings: TRating[]
  totalRatings: number

  release_date: Date
  specs: unknown[]
}

type TCreateProduct = Omit<IProduct, 'Document'>
type TUpdateProduct = Omit<IProduct, 'Document' | 'slug'> & {
  id: string
}

type TRatingProduct = {
  uid: string
  star?: number
  comment?: string
  pid: string
}

interface IProductPagination<T> extends TPagination<T> {
  title?: string
  minPrice?: number
  maxPrice?: number
}

export {
  EProductColor,
  IProduct,
  IProductPagination,
  TCreateProduct,
  TRatingProduct,
  TUpdateProduct
}
