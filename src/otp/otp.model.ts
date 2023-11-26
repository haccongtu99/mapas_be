import { Schema, model } from 'mongoose'
import { IOtp } from './otp.interface'

const OtpSchema: Schema<IOtp> = new Schema(
  {
    email: {
      type: String
    },
    otp: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      index: { expires: 30 }
    }
  },
  {
    collection: 'otp'
  }
)

const OtpModel = model<IOtp>('Otp', OtpSchema)

export default OtpModel
