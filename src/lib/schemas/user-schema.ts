import * as Yup from 'yup'
import alphanumericWithDashes, {
  alphanumerWithDashesErrorMessage,
} from '@lib/validation/alphanumeric-with-dashes'
import configureYupLocale from '@lib/validation/configure-yup-locale'

configureYupLocale()

export const userUsername = Yup.string()
  .required()
  .max(39)
  .test(
    'characters are alphanumeric with dashes',
    alphanumerWithDashesErrorMessage,
    (val) => (val ? alphanumericWithDashes.test(val as string) : false),
  )

export const userBio = Yup.string().required().max(160)

export const userSchema = Yup.object().shape({
  bio: userBio,
  username: userUsername,
})
