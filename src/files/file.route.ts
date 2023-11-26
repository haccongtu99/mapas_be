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
  '/uploads',
  uploadCloud.array('images'),
  uploadController.uploadMultipleImage
)

export = router
