import * as Yup from 'yup'
import validationErrors from '@lib/validation/error'

export const userBio = Yup.string()
  .required(validationErrors.required)
  .max(160, validationErrors.maxLength)

export const userSchema = Yup.object().shape({
  bio: userBio,
})
