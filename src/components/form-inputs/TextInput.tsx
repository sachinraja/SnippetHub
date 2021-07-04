import { forwardRef } from 'react'
import Label from './Label'
import type { ComponentPropsWithRef } from 'react'

type TextInputProps = ComponentPropsWithRef<'input'> & {
  label?: string
  required?: boolean
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, className, id, label, required, ...props }, ref) => {
    return (
      <div className={`overflow-hidden ${className}`}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <input
          ref={ref}
          type="text"
          className="text-xl align-middle bg-carbon-900 border-0 border-b-1 border-carbon-700 focus:border-carbon-400 focus:ring-0 shadow-lg transition-colors duration-500"
          id={id}
          name={id}
          required={required}
          autoComplete="off"
          {...props}
        />
        {children}
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'

TextInput.defaultProps = {
  label: undefined,
  required: false,
}

export default TextInput
