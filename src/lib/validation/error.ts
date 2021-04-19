import type * as Yup from 'yup'

interface ErrorsInterface {
  required: string
  maxLength: Yup.TestOptionsMessage<{ max: number }>
  minLength: Yup.TestOptionsMessage<{ min: number }>
}

const validationErrors: ErrorsInterface = {
  required: 'Field is required',
  maxLength: (message) => `Field cannot be over ${message.max} characters`,
  minLength: (message) => `Field cannot be over ${message.min} characters`,
}

export default validationErrors
