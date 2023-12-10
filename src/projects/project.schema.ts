import Joi from 'joi'

const projectSchema = {
  createProject: Joi.object({
    name: Joi.string().max(256).required(),
    client: Joi.string().max(24).required(),
    description: Joi.string().max(256),
    layout: Joi.array().items(Joi.array().items(Joi.number().max(24)))
  }),
  createImage: Joi.object({
    images: Joi.array().items({
      fieldname: Joi.string().required(),
      originalname: Joi.string(),
      encoding: Joi.string(),
      path: Joi.string().required(),
      mimetype: Joi.string().valid('image/jpeg', 'image/png').required(), // Adjust mime types as needed
      size: Joi.number()
        .max(1024 * 1024 * 10)
        .required(), // Max size in bytes (e.g., 10 MB)
      filename: Joi.string().max(256)
    }),
    avatar: Joi.array().items({
      fieldname: Joi.string().required(),
      originalname: Joi.string(),
      encoding: Joi.string(),
      path: Joi.string().required(),
      mimetype: Joi.string().valid('image/jpeg', 'image/png').required(), // Adjust mime types as needed
      size: Joi.number()
        .max(1024 * 1024 * 10)
        .required(), // Max size in bytes (e.g., 10 MB)
      filename: Joi.string().max(256)
    })
  }),
  updateProject: Joi.object({
    id: Joi.string(),
    name: Joi.string().max(256),
    client: Joi.string().max(24),
    description: Joi.string().max(256),
    layout: Joi.array().items(Joi.array().items(Joi.number().max(24)))
  })
}

export default projectSchema
