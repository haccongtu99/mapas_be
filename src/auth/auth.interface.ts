import { IUser } from '@/users/user.interface'
import { Request } from 'express'
import JWT from 'jsonwebtoken'

interface IUserRegister {
  email: string
  password: string
}

interface IToken {
  refreshToken: string
  accessToken: string
}

interface IAuthRequest extends Request {
  headers: {
    authorization?: string
    Authorization?: string
    'x-forwarded-for'?: ''
  }
  cookies: { authToken?: string; accessToken?: string; refreshToken?: string }
  payload?: string | JWT.JwtPayload
  limit?: number
  user?: IUser
}

export { IAuthRequest, IToken, IUserRegister }
