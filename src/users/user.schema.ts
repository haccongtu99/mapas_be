import Joi from 'joi'

const userSchema = {
  updateUser: Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string().max(24).required(),
    lastName: Joi.string().max(24).required(),
    phoneNumber: Joi.string().trim().regex(/[0-9]/).max(15),
    gender: Joi.string()
      .valid('male', 'female')
      .label("Gender must be one of 'male', 'female"),
    bio: Joi.string().min(4).max(256),
    address: Joi.string().min(4).max(256)
  })
}

export default userSchema
