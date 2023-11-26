import validator from '@/middlewares/validator'
import { RequestHandler } from 'express'
import projectSchema from './project.schema'

export const createProjectValidation: RequestHandler = (req, res, next) =>
  validator(projectSchema.createProject, req.body, next)

export const updateProjectValidation: RequestHandler = (req, res, next) =>
  validator(projectSchema.updateProject, req.body, next)
