import { ErrorMessage } from '@hookform/error-message'
import Paragraph from '@components/Paragraph'
import type { DeepMap, FieldError, FieldValues } from 'react-hook-form'

export interface FormErrorProps {
  name: string
  errors: DeepMap<FieldValues, FieldError>
}

const FormError = ({ name, errors }: FormErrorProps) => {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <Paragraph className="p-1 text-red-400">{message}</Paragraph>
      )}
    />
  )
}

export default FormError
