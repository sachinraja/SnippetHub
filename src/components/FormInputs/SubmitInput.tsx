import { forwardRef } from 'react'

interface SubmitInputProps {
  className?: string
  id?: string
  value: string
  disabled?: boolean
}

const SubmitInput = forwardRef<HTMLInputElement, SubmitInputProps>(
  ({ className, id, value, disabled }: SubmitInputProps, ref) => {
    return (
      <input
        ref={ref}
        type="submit"
        className={`text-xl bg-carbon-800 cursor-pointer py-1.5 px-5 rounded-md hover:bg-carbon-700 transition-colors ${className}`}
        id={id}
        name={id}
        value={value}
        disabled={disabled}
      />
    )
  },
)

SubmitInput.displayName = 'TextInput'

SubmitInput.defaultProps = {
  className: '',
  id: undefined,
  disabled: false,
}

export default SubmitInput
