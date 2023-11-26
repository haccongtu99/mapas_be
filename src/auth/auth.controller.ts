import otpService from '@/otp/otp.service'
import { NextFunction, Request, Response } from 'express'
import authService from './auth.service'

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, ...result } = await authService.register(req.body)
      return res.json({
        status: 200,
        data: result,
        message: 'Register user successfully!!'
      })
    } catch (err) {
      next(err)
    }
  },

  registerOtp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, data, message } = await authService.registerOtp(req.body)

      return res.status(code).json({ message, data })
    } catch (err) {
      next(err)
    }
  },

  verifyOtp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, data, message } = await otpService.verifyOtp(req.body)

      return res.status(code).json({ message, data: data?.email })
    } catch (err) {
      next(err)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken, user, code, message } =
        await authService.login(req.body)
      const { password, ...rest } = user

      return res.status(code).json({
        message,
        data: rest,
        accessToken,
        refreshToken
      })
    } catch (err) {
      next(err)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message, code } = await authService.logout(req.body)

      return res.status(code).json({ message })
    } catch (err) {
      next(err)
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, newRefreshToken, code } =
        await authService.refreshToken(req.body)

      return res.status(code).json({
        accessToken,
        newRefreshToken
      })
    } catch (err) {
      next(err)
    }
  }
}
