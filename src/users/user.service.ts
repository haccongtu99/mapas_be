import createHttpError from 'http-errors'
import { TDeleteUser, TUpdateUser } from './user.interface'
import UserModel from './user.model'
import uploadService from '@/files/file.service'

const userService = {
  getAllUsers: async () => {
    const user = await UserModel.find().select('-password -role')

    if (!user) {
      return { code: 404, message: 'User not found' }
    }
    return { code: 200, user }
  },

  getUserInformation: async (id: string) => {
    if (!id) {
      return { code: 404, message: 'Invalid user ID' }
    }
    const info = await UserModel.findById(id)
    if (!info) {
      return { code: 404, message: 'User not found' }
    }

    return { code: 200, user: info }
  },
  updateUser: async ({
    id,
    firstName,
    lastName,
    gender,
    address,
    phoneNumber,
    bio,
    avatar
  }: TUpdateUser) => {
    const user = await UserModel.findById(id)

    if (!user || !id) {
      throw createHttpError.NotFound('User not found')
    }

    const { data: avatarUrl } = await uploadService.uploadImage(avatar)

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        gender,
        address,
        phoneNumber,
        bio,
        avatar: avatarUrl?.url
      },
      { returnOriginal: false, new: true }
    ).select('-password -role')

    return {
      code: 200,
      message: 'User is updated',
      data: updatedUser
    }
  },
  deleteUser: async (id: string) => {
    const user = await UserModel.findById(id)

    if (!id || !user) {
      throw createHttpError.NotFound('User not found')
    }

    const deletedUser = await UserModel.findByIdAndDelete(id).select(
      'firstName'
    )

    if (!deletedUser) {
      throw createHttpError.NotFound('No user delete')
    }

    return {
      code: 200,
      message: `${deletedUser.firstName} is deleted`
    }
  }
}

export default userService
