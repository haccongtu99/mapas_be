import { TPagination } from '@/interface/global'
import { Document } from 'mongoose'

type TClientImage = {
  thumb: Express.Multer.File[]
  colorThumb: Express.Multer.File[]
}

interface IClient extends Document {
  thumb?: string
  colorThumb?: string
  name: string
  client: string
  country?: string
  contact?: string
  email?: string
  link?: string
}

interface IClientPagination<T> extends TPagination<T> {
  name?: string
}

interface IUpdateClient extends Omit<IClient, 'Document'> {
  id: string
}

export { IClient, TClientImage, IClientPagination, IUpdateClient }
