import { forwardRef, useState } from 'react'
import type { ReactNode } from 'react'

interface SnippetInputProps {
  children?: ReactNode
  className?: string
  id: string
  label?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
}

const SnippetInput = forwardRef<HTMLInputElement, SnippetInputProps>(
  (
    {
      children,
      className,
      id,
      label,
      defaultValue,
      placeholder,
      required,
    }: SnippetInputProps,
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
          className={`text-xl bg-carbon-900 align-middle w-full sm:w-2/3 border-0 border-b-1 border-carbon-400 shadow-lg focus:ring-0 focus:border-carbon-700 transition-colors duration-500 ${className}`}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
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

SnippetInput.displayName = 'TextInput'

SnippetInput.defaultProps = {
  children: undefined,
  className: '',
  label: '',
  defaultValue: '',
  placeholder: '',
  required: false,
}

export default SnippetInput
