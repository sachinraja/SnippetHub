import { ChangeEventHandler, KeyboardEventHandler, forwardRef } from 'react'
import type { ReactNode } from 'react'

interface TextAreaInputProps {
  children?: ReactNode
  style?: Record<string, unknown>
  className?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  id: string
  label?: string
  placeholder?: string
  responsive?: boolean
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      children,
      style,
      className,
      value,
      onChange,
      onKeyDown,
      id,
      label,
      placeholder,
      responsive,
    }: TextAreaInputProps,
    ref,
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={id} className="block sm:inline mr-3 text-lg">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`bg-carbon-900 ${
            responsive ? 'w-full sm:w-2/3' : ''
          } border-0 align-middle rounded-sm ring-1 ring-carbon-700 focus:ring-carbon-400 transition-shadow duration-300 ${className}`}
          style={style}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          autoComplete="off"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {children}
      </>
    )
  },
)

TextAreaInput.displayName = 'TextAreaInput'

TextAreaInput.defaultProps = {
  children: undefined,
  style: undefined,
  className: '',
  value: '',
  onChange: undefined,
  onKeyDown: undefined,
  label: '',
  placeholder: '',
  responsive: true,
}

export default TextAreaInput
