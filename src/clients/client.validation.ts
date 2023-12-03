import validator from '@/middlewares/validator'
import { RequestHandler } from 'express'
import clientSchema from './client.schema'

export const createClientValidation: RequestHandler = (req, res, next) =>
  validator(clientSchema.createClient, req.body, next)
