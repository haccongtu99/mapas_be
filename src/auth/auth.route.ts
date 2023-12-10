import express from 'express'
import { authController } from './auth.controller'
import {
  loginValidation,
  registerOtpValidation,
  registerValidation,
  verifyOtpValidation
} from './auth.validation'

const router = express.Router()

router.post('/users/register', registerValidation, authController.register)
router.post(
  '/users/register-otp',
  registerOtpValidation,
  authController.registerOtp
)
router.post('/users/verify-otp', verifyOtpValidation, authController.verifyOtp)
router.post('/users/login', loginValidation, authController.login)
router.post('/users/refresh-token', authController.refreshToken)
router.post('/users/logout', authController.logout)

export = router
