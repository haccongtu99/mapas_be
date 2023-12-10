import { cloudinary } from '@/configs/cloudinary.config'

const uploadService = {
  uploadImage: async (
    imagePath?: string,
    folder: string | undefined = 'images'
  ) => {
    if (!imagePath)
      return {
        code: 404,
        data: { url: '', publicId: '' },
        message: 'Image not found'
      }

    const results = await cloudinary.uploader.upload(imagePath, { folder })

    return {
      code: 200,
      data: {
        url: results.secure_url,
        publicId: results.public_id
      },
      message: 'Image was successfully uploaded'
    }
  },

  uploadMutipleImage: async (
    pathList?: string[],
    folder: string | undefined = 'images'
  ) => {
    if (!pathList || !pathList.length)
      return {
        code: 404,
        message: 'Image not found'
      }

    const imageList = []
    const filteredPathList = pathList.filter(t => t) // remove undefined images

    for (const image of filteredPathList) {
      const results = await cloudinary.uploader.upload(image, { folder })
      imageList.push({
        url: results.secure_url,
        publicId: results.public_id
      })
    }

    return {
      code: 200,
      data: imageList,
      message: 'Images were successfully uploaded'
    }
  },

  deleteImage: async (fileId: string) => {
    if (!fileId) {
      return {
        code: 404,
        message: 'Image not found',
        fileId
      }
    }

    const result = await cloudinary.uploader.destroy(fileId)

    if (result) {
      return {
        code: 200,
        message: 'Image has been deleted'
      }
    }
    return {
      code: 400,
      message: 'Can not delete image'
    }
  },
  deleteMultiImages: async (ids: string[]) => {
    if (!ids.length || !Array.isArray(ids)) {
      return {
        code: 404,
        message: 'Image not found'
      }
    }

    const result = await Promise.all(
      ids.map(async id => await uploadService.deleteImage(id))
    )

    const failDeletion = result.some(res => res.code !== 200)

    if (failDeletion) {
      return {
        code: 400,
        message: 'Can not delete image'
      }
    }

    return {
      code: 200,
      message: 'Images have been deleted'
    }
  }
}

export default uploadService
