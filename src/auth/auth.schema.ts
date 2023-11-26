import Joi from 'joi'

const baseSchema = {
  email: Joi.string()
    .pattern(new RegExp('gmail.com$'))
    .email()
    .lowercase()
    .required(),
  password: Joi.string().min(4).max(32).required()
}

const authSchema = {
  register: Joi.object({
    ...baseSchema
  }),
  registerOtp: Joi.object({
    ...baseSchema
  }),
  verifyOtp: Joi.object(baseSchema).append({
    otp: Joi.string().length(6).required()
  }),
  login: Joi.object({
    email: Joi.string().pattern(new RegExp('gmail.com$')).email().required(),
    password: Joi.string().min(4).max(32).required()
  })
}

export default authSchema
