import bcrypt from 'bcrypt'
import { errorMessage } from '@/constants'
import { IVerifyOtp, TCreateOtp, TValidOtp } from './otp.interface'
import OtpModel from './otp.model'
import authService from '@/auth/auth.service'

const otpService = {
  insertOtp: async ({ email, otp }: TCreateOtp) => {
    const salt = await bcrypt.genSalt(10)
    const hashOtp = await bcrypt.hash(otp, salt)
    const Otp = await OtpModel.create({
      email,
      otp: hashOtp
    })

    return Otp ? 1 : 0
  },

  validOtp: async ({ otp, hashOtp }: TValidOtp) => {
    return await bcrypt.compare(otp, hashOtp)
  },

  verifyOtp: async ({ email, password, otp }: IVerifyOtp) => {
    // check existed email
    const isExisted = await authService.checkEmail({ email })
    if (isExisted)
      return {
        code: 404,
        message: errorMessage.registerd(email)
      }

    const otpHolder = await OtpModel.find({ email })
    if (!otpHolder.length) {
      return {
        code: 404,
        message: 'Expired OTP!'
      }
    }

    // get last OTP
    const lastOtp = otpHolder[otpHolder.length - 1]
    const isValid = await otpService.validOtp({
      hashOtp: lastOtp.otp,
      otp
    })

    if (isValid && email === lastOtp.email) {
      const user = await authService.register({ email, password })

      if (user) {
        await OtpModel.deleteMany({ email })
        return {
          code: 201,
          data: user,
          message: 'OTP is valid'
        }
      }
    }

    return {
      code: 401,
      message: 'Invalid OTP!'
    }
  }
}

export default otpService
