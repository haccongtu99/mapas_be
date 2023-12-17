import { verifyAccessToken } from '@/middlewares'
import express from 'express'
import { projectController } from './project.controller'
import { uploadCloud } from '@/configs/cloudinary.config'
import {
  createImageValidation,
  createProjectValidation,
  updateProjectValidation
} from './project.validation'

const router = express.Router()

router.post(
  '/admin/projects/create',
  verifyAccessToken,
  uploadCloud.fields([{ name: 'avatar', maxCount: 1 }, { name: 'images' }]),
  createProjectValidation,
  createImageValidation,
  projectController.createProject
)

router.get('/projects/:id', projectController.getProjectDetails)

router.get('/projects', projectController.getAllProjects)

router.get(
  '/admin/projects/:id',
  verifyAccessToken,
  projectController.getProjectDetails
)

router.get(
  '/admin/projects',
  verifyAccessToken,
  projectController.getAllProjects
)

router.patch(
  '/admin/projects/update',
  verifyAccessToken,
  uploadCloud.fields([{ name: 'avatar', maxCount: 1 }, { name: 'images' }]),
  updateProjectValidation,
  projectController.updateProject
)

router.delete(
  '/admin/projects/:projectId',
  verifyAccessToken,
  projectController.deleteProject
)

export = router
