import { enviromentConfig } from '@/configs/env.config'
import client from '@/configs/redis.config'
import { errorMessage } from '@/constants'
import otpService from '@/otp/otp.service'
import UserModel from '@/users/user.model'
import { sendMail } from '@/utils/sendMail'
import createHttpError from 'http-errors'
import JWT from 'jsonwebtoken'
import { Types } from 'mongoose'
import otpGenerator from 'otp-generator'
import { IToken, IUserRegister } from './auth.interface'
import { verifyRefreshToken } from '@/middlewares'

const authService = {
  register: async ({ email, password }: IUserRegister) => {
    const isExisted = await UserModel.findOne({ email })
    if (isExisted) {
      throw createHttpError.Conflict(errorMessage.registerd(email))
    }

    const user = new UserModel({ email, password })
    return (await user.save()).toObject()
  },

  checkEmail: async ({ email }: Pick<IUserRegister, 'email'>) => {
    return await UserModel.findOne({ email })
  },

  registerOtp: async ({ email }: IUserRegister) => {
    const isExisted = await UserModel.findOne({ email })
    if (isExisted) {
      throw createHttpError.Conflict(errorMessage.registerd(email))
    }
    const otp = otpGenerator.generate(6, {
      digits: true,
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false
    })

    const info = await sendMail({
      userEmail: email,
      subject: 'Verify OTP code',
      text: `Hi ${email}. \n Your OTP is ${otp} \n If you have any questions, please contact us via this email address ${enviromentConfig.ROOT_EMAIL}`
    })

    if (info) {
      return {
        code: 200,
        data: await otpService.insertOtp({ email, otp }),
        message: `OTP was sent to ${email} via email`
      }
    }
    console.log({ otp })

    return { code: 400, message: 'Can not send email' }
  },

  generateToken: async (
    payload: { userId: Types.ObjectId | string },
    secret: string | undefined = '',
    signOptions: JWT.SignOptions
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      JWT.sign(payload, secret, signOptions, (error, token) => {
        if (error) reject(error)
        resolve(token?.toString() ?? '')
      })
    })
  },
  login: async ({ email, password }: IUserRegister) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw createHttpError.NotFound(errorMessage.NOT_REGISTERED)
    }

    const isValid = await user.checkPassword(password)
    if (!isValid) {
      throw createHttpError.Unauthorized(errorMessage.INVALID_PASSWORD)
    }

    const accessToken = await authService.generateToken(
      { userId: user._id },
      enviromentConfig.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '10m' }
    )
    const refreshToken = await authService.generateToken(
      { userId: user._id },
      enviromentConfig.REFRESH_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '1y' }
    )

    await client.set(user._id.toString(), refreshToken.toString(), {
      EX: 365 * 24 * 60 * 60
    })

    return {
      accessToken,
      refreshToken,
      user: user.toObject(),
      code: 200,
      message: 'Login successfully'
    }
  },

  logout: async ({ refreshToken }: Pick<IToken, 'refreshToken'>) => {
    if (!refreshToken) {
      throw createHttpError.BadRequest()
    }
    const userId = await verifyRefreshToken(refreshToken)

    try {
      await client.del(userId)
      return { message: 'Log out successfully', code: 200 }
    } catch (err) {
      throw createHttpError.InternalServerError()
    }
  },

  refreshToken: async ({ refreshToken }: Pick<IToken, 'refreshToken'>) => {
    if (!refreshToken) {
      throw createHttpError.BadRequest()
    }
    const userId = await verifyRefreshToken(refreshToken)

    const accessToken = await authService.generateToken(
      { userId: userId },
      enviromentConfig.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '30s' }
    )

    const newRefreshToken = await authService.generateToken(
      { userId: userId },
      enviromentConfig.REFRESH_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '1y' }
    )

    await client.set(userId, newRefreshToken.toString(), {
      EX: 365 * 24 * 60 * 60
    })

    return { accessToken, newRefreshToken, code: 200 }
  }
}

export default authService
