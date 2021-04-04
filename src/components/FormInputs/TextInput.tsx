import { forwardRef, useState } from 'react'
import type { ReactNode } from 'react'

interface TextInputProps {
  children?: ReactNode
  className?: string
  id: string
  label?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      children,
      className,
      id,
      label,
      defaultValue,
      placeholder,
      required,
    }: TextInputProps,
    ref,
  ) => {
    const [value, setValue] = useState(defaultValue)

    return (
      <div>
        {label && (
          <label htmlFor={id} className="block sm:inline mr-3 text-lg">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type="text"
          className={`text-xl bg-carbon-900 align-middle w-full sm:w-2/3 border-0 border-b-1 border-carbon-700 shadow-lg focus:ring-0 focus:border-carbon-400 transition-colors duration-500 ${className}`}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          required={required}
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        {children}
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'

TextInput.defaultProps = {
  children: undefined,
  className: '',
  label: '',
  defaultValue: '',
  placeholder: '',
  required: false,
}

export default TextInput
