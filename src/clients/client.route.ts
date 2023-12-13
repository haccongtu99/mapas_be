import { uploadCloud } from '@/configs/cloudinary.config'
import { verifyAccessToken } from '@/middlewares'
import express from 'express'
import { clientController } from './client.controller'
import { createClientValidation } from './client.validation'

const router = express.Router()

router.post(
  '/clients/create',
  verifyAccessToken,
  uploadCloud.fields([
    { name: 'thumb', maxCount: 1 },
    { name: 'colorThumb', maxCount: 1 }
  ]),
  createClientValidation,
  clientController.createClient
)

router.get('/clients', verifyAccessToken, clientController.getAllClients)
router.get('/clients/:id', verifyAccessToken, clientController.getClientDetails)
router.delete(
  '/clients/:clientId',
  verifyAccessToken,
  clientController.deleteProject
)

export = router
