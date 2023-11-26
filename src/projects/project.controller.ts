import { IAuthRequest } from '@/auth/auth.interface'
import { NextFunction, Response } from 'express'
import projectService from './project.service'

export const projectController = {
  createProject: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, project } = await projectService.create({
        ...req.body,
        avatar: req.file?.path
      })
      return res.status(code).json({ data: project, numberRequest: req.limit })
    } catch (err) {
      next(err)
    }
  },
  getProjectDetails: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params
      const { code, project, message } = await projectService.getOne(id)
      return res.status(code).json({ data: project, message })
    } catch (err) {
      next(err)
    }
  },
  getAllProjects: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, projects, totalPages, currentPage } =
        await projectService.getAll(req.query)
      return res.status(code).json({ data: projects, totalPages, currentPage })
    } catch (err) {
      next(err)
    }
  },
  uploadImage: async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const { code, data } = await projectService.uploadImage(req.body)
      return res.status(code).json({ data })
    } catch (err) {
      next(err)
    }
  },
  updateProject: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code, data, message } = await projectService.update(req.body)
      return res.status(code).json({ data, message })
    } catch (err) {
      next(err)
    }
  }
}