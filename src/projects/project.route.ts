import { verifyAccessToken } from '@/middlewares'
import express from 'express'
import { projectController } from './project.controller'
import { uploadCloud } from '@/configs/cloudinary.config'
import {
  createProjectValidation,
  updateProjectValidation
} from './project.validation'

const router = express.Router()

router.post(
  '/projects/create',
  verifyAccessToken,
  uploadCloud.single('avatar'),
  createProjectValidation,
  projectController.createProject
)

router.get(
  '/projects/:id',
  verifyAccessToken,
  projectController.getProjectDetails
)

router.get('/projects', verifyAccessToken, projectController.getAllProjects)
router.get(
  '/projects/upload',
  verifyAccessToken,
  projectController.getAllProjects
)

router.patch(
  '/projects/update',
  verifyAccessToken,
  updateProjectValidation,
  projectController.updateProject
)

export = router
