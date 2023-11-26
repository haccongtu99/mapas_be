import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import { enviromentConfig } from './env.config'

cloudinary.config({
  cloud_name: enviromentConfig.CLOUDINARY_NAME,
  api_key: enviromentConfig.CLOUDINARY_API_KEY,
  api_secret: enviromentConfig.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary
})

const uploadCloud = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 10 // accept files up 10 mgb
  }
})

export { cloudinary, uploadCloud }
