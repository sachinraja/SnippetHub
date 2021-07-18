import { setLocale } from 'yup'
import { Message } from 'yup/lib/types'

const maxLengthMessage: Message<{ max: number }> = ({ max }) =>
  `Field cannot be over ${max} characters`

const minLengthMessage: Message<{ min: number }> = ({ min }) =>
  `Field cannot be under ${min} characters`

const configureYupLocale = () => {
  if (typeof window === 'undefined') return

  setLocale({
    mixed: {
      required: 'Field is required',
    },
    number: {
      max: maxLengthMessage,
      min: minLengthMessage,
    },
    string: {
      max: maxLengthMessage,
      min: minLengthMessage,
    },
  })
}

export default configureYupLocale
