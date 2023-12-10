import { uploadCloud } from '@/configs/cloudinary.config'
import express from 'express'
import { uploadController } from './file.controller'

const router = express.Router()

router.post(
  '/upload',
  uploadCloud.single('images'),
  uploadController.uploadImage
)

router.post(
  '/upload',
  uploadCloud.array('images'),
  uploadController.uploadMultipleImage
)

router.post('/upload/delete', uploadController.deleteImages)

export = router
