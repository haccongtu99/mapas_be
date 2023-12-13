import { errorMessage } from '@/constants'
import createHttpError from 'http-errors'
import uploadService from '@/files/file.service'
import {
  IClient,
  IClientPagination,
  IUpdateClient,
  TCreateClient
} from './client.interface'
import ClientModel from './client.model'

const clientService = {
  create: async (params: TCreateClient) => {
    if (!Object.keys(params).length) throw createHttpError.NotFound()

    const clients = await ClientModel.findOne({ name: params.name })

    if (clients)
      throw createHttpError.BadRequest('Client have been already existed')

    const { data: thumb } = await uploadService.uploadImage(params.thumb)
    const { data: colorThumb } = await uploadService.uploadImage(
      params.colorThumb
    )

    const newClient = new ClientModel({
      ...params,
      thumb,
      colorThumb
    })

    if (!newClient) throw createHttpError.BadRequest()

    return {
      code: 200,
      message: `${params.name} has been created`,
      client: (await newClient.save()).toObject()
    }
  },

  getOne: async (id: string) => {
    const client = await ClientModel.findById(id).lean()

    if (!client || !id.trim()) {
      return { code: 404, message: errorMessage.notFound('Client') }
    }
    return {
      code: 200,
      client
    }
  },

  getAll: async ({
    limit = 20,
    page = 1,
    order = 1,
    sortBy = 'name',
    keyword = ''
  }: IClientPagination<IClient>) => {
    const query = ClientModel.find({
      name: { $regex: keyword, $options: 'i' }
    })
    const x = query.clone()

    const clients = await query
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ [sortBy]: order })

    const count = await x.countDocuments()

    return {
      clients,
      code: 200,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    }
  },
  update: async (params: IUpdateClient) => {
    const { id, ...otherParams } = params
    const project = await ClientModel.findById(id)

    if (!project || !id) {
      throw createHttpError.NotFound('Client not found')
    }

    const updatedProject = await ClientModel.findByIdAndUpdate(
      id,
      { ...otherParams },
      { returnOriginal: false, new: true }
    )

    return {
      code: 200,
      message: 'Client has been updated',
      data: updatedProject
    }
  },
  delete: async (clientId: string) => {
    const client = await ClientModel.findById({ _id: clientId })
      .lean()
      .select('thumb.publicId colorThumb.publicId')

    if (!client) {
      return {
        code: 404,
        message: 'Client not found'
      }
    }

    const thumbId = client?.thumb?.publicId ?? ''
    const thumbColorId = client?.colorThumb?.publicId ?? ''
    const publicIdList = [thumbId, thumbColorId]

    await uploadService.deleteMultiImages(publicIdList)
    const deletedClient = await ClientModel.deleteOne({ _id: clientId })

    if (deletedClient) {
      return {
        code: 200,
        message: `Client ${clientId} has been deleted`
      }
    }

    return {
      code: 400,
      message: 'Can not delete this client'
    }
  }
}

export default clientService
