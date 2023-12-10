import { TPagination } from '@/interface/global'
import { Document } from 'mongoose'

type TProjectImage = {
  avatar: Express.Multer.File[]
  images: Express.Multer.File[]
}

interface IProject extends Document {
  avatar?: { publicId: string; url: string }
  name: string
  client: string
  description?: string
  images?: { publicId: string; url: string }[]
  layout: number[][]
}

type TCreateProject = IProject & {
  avatar: string
  images: string[]
}

interface IProjectPagination<T> extends TPagination<T> {
  name?: string
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
  TCreateProject
}
