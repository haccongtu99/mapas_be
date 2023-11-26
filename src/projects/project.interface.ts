import { TPagination } from '@/interface/global'
import { Document } from 'mongoose'

interface IProjectImage {
  mainImage: string[]
  subImage: string[]
}

interface IProject extends Document {
  avatar?: string
  name: string
  client: string
  description?: string
  images?: IProjectImage[]
}

interface IProjectPagination<T> extends TPagination<T> {
  name?: string
}

interface IUploadProjectImage {
  file: string
}

interface IUpdateProject extends Omit<IProject, 'Document'> {
  id: string
}

export { IProject, IProjectPagination, IUploadProjectImage, IUpdateProject }
