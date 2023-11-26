import express, { RequestHandler } from 'express'
import { userController } from './user.controller'
import { limitRequests, verifyAccessToken } from '@/middlewares'
import { updateUserValidation } from './user.validation'
import { uploadCloud } from '@/configs/cloudinary.config'

const router = express.Router()

router.get(
  '/users/all',
  verifyAccessToken,
  limitRequests,
  userController.getAllUsers
)
router.get(
  '/users/:id',
  verifyAccessToken,
  limitRequests,
  userController.getUserInformation
)

router.patch(
  '/users',
  verifyAccessToken,
  limitRequests,
  uploadCloud.single('avatar'),
  updateUserValidation,
  userController.updateUserInfor
)

router.delete(
  '/users/:id',
  verifyAccessToken,
  limitRequests,
  userController.deleteUser
)

export = router
