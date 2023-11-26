import { Document } from 'mongoose'

enum EUserRole {
  ADMIN = 'admin',
  USER = 'user'
}

enum EGender {
  MALE = 'male',
  FEMALE = 'female'
}

interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  mobile: string
  role: EUserRole
  address: string
  wishlist: string
  isBlocked: boolean
  gender: EGender
  phoneNumber?: string
  bio?: string
  avatar?: string
}

type TUpdateUser = Omit<
  IUser,
  'role' | 'wishlist' | 'isBlocked' | 'Document' | 'email'
>

type TDeleteUser = Pick<IUser, 'id'>

interface IUserDocument extends IUser {
  checkPassword(password: string): Promise<boolean>
}

export { IUser, IUserDocument, TUpdateUser, TDeleteUser }
