import * as Yup from 'yup'
import validationErrors from '@lib/validation/error'
import alphanumericWithDashes, {
  alphanumerWithDashesErrorMessage,
} from '@lib/validation/alphanumeric-with-dashes'

export const userUsername = Yup.string()
  .required(validationErrors.required)
  .max(39, validationErrors.maxLength)
  .test(
    'characters are alphanumeric with dashes',
    alphanumerWithDashesErrorMessage,
    (val) => (val ? alphanumericWithDashes.test(val as string) : false),
  )

export const userBio = Yup.string()
  .required(validationErrors.required)
  .max(160, validationErrors.maxLength)

export const userSchema = Yup.object().shape({
  bio: userBio,
  username: userUsername,
})
