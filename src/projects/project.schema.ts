import Joi from 'joi'

const projectSchema = {
  createProject: Joi.object({
    name: Joi.string().max(256).required(),
    client: Joi.string().max(24).required(),
    description: Joi.string().max(256)
  }),
  updateProject: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().max(256),
    client: Joi.string().max(24),
    description: Joi.string().max(256)
  })
}

export default projectSchema
