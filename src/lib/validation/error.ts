interface ErrorsInterface {
  required: string
  maxLength: ({ max }: { max: number }) => string
  minLength: ({ min }: { min: number }) => string
}

const validationErrors: ErrorsInterface = {
  required: 'Field is required',
  maxLength: ({ max }) => `Field cannot be over ${max} characters`,
  minLength: ({ min }) => `Field cannot be over ${min} characters`,
}

export default validationErrors
