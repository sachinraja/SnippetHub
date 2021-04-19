import { forwardRef } from 'react'
import Label from './Label'
import type { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'

interface TextInputProps {
  children?: ReactNode
  className?: string
  id: string
  label?: string
  defaultValue?: string
  value?: string
  placeholder?: string
  required?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      children,
      className,
      id,
      label,
      defaultValue,
      value,
      placeholder,
      required,
      onChange,
      onBlur,
    }: TextInputProps,
    ref,
  ) => {
    return (
      <div className={className}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <input
          ref={ref}
          type="text"
          className="text-xl bg-carbon-900 align-middle w-full sm:w-2/3 border-0 border-b-1 border-carbon-700 shadow-lg focus:ring-0 focus:border-carbon-400 transition-colors duration-500"
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          value={value}
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
  label: undefined,
  defaultValue: '',
  value: undefined,
  placeholder: '',
  required: false,
  onChange: undefined,
  onBlur: undefined,
}

export default TextInput
