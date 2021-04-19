import { ErrorMessage } from '@hookform/error-message'
import Paragraph from '@components/Paragraph/Paragraph'
import type { DeepMap, FieldError, FieldValues } from 'react-hook-form'

interface FormErrorProps {
  name: string
  errors: DeepMap<FieldValues, FieldError>
}

const FormError = ({ name, errors }: FormErrorProps) => {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <Paragraph size={3} className="p-1 text-red-400">
          {message}
        </Paragraph>
      )}
    />
  )
}

export default FormError
