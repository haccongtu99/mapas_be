import bcrypt from 'bcrypt'
import {
  CallbackError,
  CallbackWithoutResultAndOptionalError,
  Schema,
  model
} from 'mongoose'
import { IUser, IUserDocument } from './user.interface'

const UserSchema: Schema<IUserDocument> = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  gender: {
    type: String
  },

  phoneNumber: {
    type: String
  },

  bio: {
    type: String
  },

  address: {
    type: String
  },

  avatar: {
    type: String,
    trim: true
  }
})

UserSchema.pre(
  'save',
  async function (this: IUser, next: CallbackWithoutResultAndOptionalError) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(this.password, salt)
      this.password = hashPassword
      next()
    } catch (error) {
      next(error as CallbackError)
    }
  }
)

UserSchema.methods.checkPassword = async function (
  accessPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(accessPassword, this.password)
  return isMatch
}

const UserModel = model<IUserDocument>('User', UserSchema)

export default UserModel
