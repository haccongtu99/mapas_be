import validator from '@/middlewares/validator'
import { RequestHandler } from 'express'
import projectSchema from './project.schema'
import { TProjectImage } from './project.interface'

export const createProjectValidation: RequestHandler = (req, res, next) =>
  validator(projectSchema.createProject, req.body, next)

export const createImageValidation: RequestHandler = (req, res, next) =>
  validator(projectSchema.createImage, req.files as TProjectImage, next)

export const updateProjectValidation: RequestHandler = (req, res, next) =>
  validator(projectSchema.updateProject, req.body, next)
