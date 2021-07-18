import * as Yup from 'yup'
import alphanumericWithDashes, {
  alphanumericWithDashesErrorMessage,
} from '@lib/validation/alphanumeric-with-dashes'

export const getUserUsername = () =>
  Yup.string()
    .required()
    .max(39)
    .test(
      'characters are alphanumeric with dashes',
      alphanumericWithDashesErrorMessage,
      (val) => (val ? alphanumericWithDashes.test(val as string) : false),
    )

export const getUserBio = () => Yup.string().required().max(160)

export const getUserSchema = () =>
  Yup.object().shape({
    bio: getUserBio(),
    username: getUserUsername(),
  })
