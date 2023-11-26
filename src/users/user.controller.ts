import { IAuthRequest } from '@/auth/auth.interface'
import { NextFunction, Response } from 'express'
import userService from './user.service'

export const userController = {
  getAllUsers: async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const { code, user } = await userService.getAllUsers()
      return res.status(code).json({ user, numberRequest: req.limit })
    } catch (err) {
      next(err)
    }
  },
  getUserInformation: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params
      const { code, user } = await userService.getUserInformation(id)
      return res.status(code).json({ user, numberRequest: req.limit })
    } catch (err) {
      next(err)
    }
  },
  updateUserInfor: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, data, message } = await userService.updateUser({
        ...req.body,
        avatar: req.file?.path
      })
      return res
        .status(code)
        .json({ user: data, message, numberRequest: req.limit })
    } catch (err) {
      next(err)
    }
  },
  deleteUser: async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { code, message } = await userService.deleteUser(id)
      return res.status(code).json({ message })
    } catch (err) {
      next(err)
    }
  }
}
