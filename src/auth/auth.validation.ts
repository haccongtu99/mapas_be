import { RequestHandler } from 'express'
import authSchema from './auth.schema'
import validator from '@/middlewares/validator'

export const registerValidation: RequestHandler = (req, res, next) =>
  validator(authSchema.register, req.body, next)

export const registerOtpValidation: RequestHandler = (req, res, next) =>
  validator(authSchema.registerOtp, req.body, next)

export const loginValidation: RequestHandler = (req, res, next) =>
  validator(authSchema.login, req.body, next)

export const verifyOtpValidation: RequestHandler = (req, res, next) =>
  validator(authSchema.verifyOtp, req.body, next)
