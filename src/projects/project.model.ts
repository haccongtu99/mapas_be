import { Schema, model } from 'mongoose'
import { IProject } from './project.interface'

const ProjectSchema = new Schema(
  {
    avatar: {
      type: String,
      trim: true
    },
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
    images: [
      {
        mainImage: [{ type: String }],
        subImage: [{ type: String }]
      }
    ]
  },
  {
    collection: 'projects',
    timestamps: true
  }
)

const ProjectModel = model<IProject>('Project', ProjectSchema)

export default ProjectModel
