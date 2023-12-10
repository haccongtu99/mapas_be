import { Schema, model } from 'mongoose'
import { IProject } from './project.interface'

const ProjectSchema = new Schema(
  {
    avatar: { url: { type: String, trim: true }, publicId: { type: String } },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true
    },
    images: [{ url: { type: String }, publicId: { type: String } }],
    layout: [[{ type: Number, default: undefined }]]
  },
  {
    collection: 'projects',
    timestamps: true
  }
)

const ProjectModel = model<IProject>('Project', ProjectSchema)

export default ProjectModel
