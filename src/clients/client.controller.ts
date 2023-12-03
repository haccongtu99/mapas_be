import { IAuthRequest } from '@/auth/auth.interface'
import { NextFunction, Response } from 'express'
import clientService from './client.service'
import { TClientImage } from './client.interface'

export const clientController = {
  createClient: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files as TClientImage
      console.log(files)
      const { code, client } = await clientService.create({
        ...req.body,
        thumb: files?.thumb?.[0]?.path ?? '',
        colorThumb: files?.colorThumb?.[0]?.path ?? ''
      })
      return res.status(code).json({ data: client, numberRequest: req.limit })
    } catch (err) {
      next(err)
    }
  },
  getClientDetails: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params
      const { code, client, message } = await clientService.getOne(id)
      return res.status(code).json({ data: client, message })
    } catch (err) {
      next(err)
    }
  },
  getAllClients: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, clients, totalPages, currentPage } =
        await clientService.getAll(req.query)
      return res.status(code).json({ data: clients, totalPages, currentPage })
    } catch (err) {
      next(err)
    }
  }
}
