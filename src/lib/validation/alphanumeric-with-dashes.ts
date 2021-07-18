const alphanumericWithDashes = /^[a-zA-Z0-9\-_]*$/

const errorMessageBase =
  'Characters can only be lowercase letters, uppercase letters, numbers, or dashes.'

export const alphanumerWithDashesErrorMessage =
  typeof window === 'undefined'
    ? `\${path} contains illegal character. ${errorMessageBase}`
    : errorMessageBase

export default alphanumericWithDashes
