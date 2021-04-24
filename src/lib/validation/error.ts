import type * as Yup from 'yup'

interface ErrorsInterface {
  required: string
  maxLength: Yup.TestOptionsMessage<{ max: number }>
  minLength: Yup.TestOptionsMessage<{ min: number }>
}

const validationErrors: ErrorsInterface = {
  required: 'Field is required',
  maxLength: ({ max }) => `Field cannot be over ${max} characters`,
  minLength: ({ min }) => `Field cannot be over ${min} characters`,
}

export default validationErrors
