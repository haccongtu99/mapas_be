import { IAuthRequest } from '@/auth/auth.interface'
import { NextFunction, Response } from 'express'
import { TProjectImage } from './project.interface'
import projectService from './project.service'

export const projectController = {
  createProject: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files as TProjectImage
      const { code, project } = await projectService.create({
        ...req.body,
        avatar: files?.avatar[0]?.path,
        images: files?.images?.map(file => file.path) ?? []
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
  updateProject: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files as TProjectImage
      const { code, data, message } = await projectService.update({
        ...req.body,
        avatar: files?.avatar[0]?.path
      })
      return res.status(code).json({ data, message })
    } catch (err) {
      next(err)
    }
  },
  deleteProject: async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { projectId } = req.params
      const { code, message } = await projectService.delete(projectId)
      return res.status(code).json({ message })
    } catch (err) {
      next(err)
    }
  }
}
