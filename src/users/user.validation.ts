import validator from '@/middlewares/validator'
import { RequestHandler } from 'express'
import userSchema from './user.schema'

export const updateUserValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.updateUser, req.body, next)
