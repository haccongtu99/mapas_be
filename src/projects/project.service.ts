import { errorMessage } from '@/constants'
import uploadService from '@/files/file.service'
import createHttpError from 'http-errors'
import {
  IProject,
  IProjectPagination,
  IUpdateProject,
  IUploadProjectImage,
  TCreateProject
} from './project.interface'
import ProjectModel from './project.model'

const projectService = {
  create: async (params: TCreateProject) => {
    if (!Object.keys(params).length) throw createHttpError.NotFound()

    const { data: avatarUrl } = await uploadService.uploadImage(params.avatar)
    const { data: imageList } = await uploadService.uploadMutipleImage(
      params.images
    )

    const newProject = new ProjectModel({
      ...params,
      avatar: avatarUrl,
      images: imageList
    })

    if (!newProject) throw createHttpError.BadRequest()

    return {
      code: 200,
      message: `${params.name} has been created`,
      project: (await newProject.save()).toObject()
    }
  },
  getOne: async (id: string) => {
    const project = await ProjectModel.findById(id)
      .lean()
      .select('-images._id -avatar._id')

    if (!project || !id.trim()) {
      return { code: 404, message: errorMessage.notFound('Project') }
    }
    return {
      code: 200,
      project
    }
  },
  getAll: async ({
    limit = 20,
    page = 1,
    order = 1,
    sortBy = 'name',
    keyword = '',
    category
  }: IProjectPagination<IProject>) => {
    const queryParams = []
    queryParams.push({ name: { $regex: keyword, $options: 'i' } })

    if (category) {
      queryParams.push({ category: category })
    }

    const query = ProjectModel.find({
      $and: queryParams
    })
    const x = query.clone()

    const projects = await query
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ [sortBy]: order })
      .select('-images._id -avatar._id')

    const count = await x.countDocuments()

    return {
      projects,
      code: 200,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    }
  },
  uploadImage: async ({ file }: IUploadProjectImage) => {
    const { data } = await uploadService.uploadImage(file)

    return {
      data,
      code: 200
    }
  },
  update: async (params: IUpdateProject) => {
    const { id, avatar, images, ...otherParams } = params
    const project = await ProjectModel.findById(id)

    if (!project || !id) {
      throw createHttpError.NotFound('Projects not found')
    }

    const { data } = await uploadService.updateImage(
      project.avatar?.publicId ?? '',
      avatar
    )

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      { ...otherParams, avatar: data ? { ...data } : undefined },
      { returnOriginal: false, new: true }
    )

    return {
      code: 200,
      message: 'Project has been updated',
      data: updatedProject
    }
  },
  delete: async (projectId: string) => {
    const project = await ProjectModel.findById({ _id: projectId })
      .lean()
      .select('images.publicId avatar.publicId')
    const imagesIds = project?.images?.map(i => i.publicId) ?? []
    const avatarId = project?.avatar?.publicId ?? ''
    const publicIdList = imagesIds.concat(avatarId)

    await uploadService.deleteMultiImages(publicIdList)
    const deletedProject = await ProjectModel.deleteOne({ _id: projectId })

    if (deletedProject) {
      return {
        code: 200,
        message: `Project ${projectId} has been deleted`
      }
    }

    return {
      code: 400,
      message: 'Can not delete this project'
    }
  }
}

export default projectService
