import { TPagination } from '@/interface/global'
import { Document } from 'mongoose'

type TProjectImage = {
  avatar: Express.Multer.File[]
  images: Express.Multer.File[]
}

enum EProjectCategory {
  BRAND_IDENTITY = 'brand-identity',
  LAYOUT_BOOK = 'layout-book',
  WEBSITE_APP = 'website-app',
  PACKAGING = 'packaging',
  ADVERTISING = 'advertising',
  PHOTOGRAPHY = 'photography',
  NONE = 'none'
}

interface IProject extends Document {
  avatar?: { publicId: string; url: string }
  name: string
  client: string
  description?: string
  link?: string
  category?: string
  images?: { publicId: string; url: string }[]
  layout: number[][]
}

type TCreateProject = IProject & {
  avatar: string
  images: string[]
}

interface IProjectPagination<T> extends TPagination<T> {
  name?: string
  category?: string
}

interface IUploadProjectImage {
  file: string
}

interface IUpdateProject extends Omit<IProject, 'Document' | 'avatar'> {
  id: string
  avatar: string
}

export {
  IProject,
  IProjectPagination,
  IUploadProjectImage,
  IUpdateProject,
  TProjectImage,
  TCreateProject,
  EProjectCategory
}
