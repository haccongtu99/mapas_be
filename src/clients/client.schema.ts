import Joi from 'joi'

const clientSchema = {
  createClient: Joi.object({
    name: Joi.string().max(256).required(),
    client: Joi.string().max(256),
    country: Joi.string().max(24),
    contact: Joi.string().trim().regex(/[0-9]/).max(15),
    email: Joi.string()
      .pattern(new RegExp('gmail.com$'))
      .email()
      .lowercase()
      .required(),
    link: Joi.string().max(30)
  })
}

export default clientSchema
