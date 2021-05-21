import { forwardRef } from 'react'
import type { ComponentPropsWithRef } from 'react'
import Label from './Label'

type TextInputProps = ComponentPropsWithRef<'input'> & {
  label?: string
  required?: boolean
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { children, className, id, label, required, ...props }: TextInputProps,
    ref,
  ) => {
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
          className="text-xl bg-carbon-900 align-middle border-0 border-b-1 border-carbon-700 shadow-lg focus:ring-0 focus:border-carbon-400 transition-colors duration-500"
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
