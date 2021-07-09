import { forwardRef } from 'react'
import type { ComponentPropsWithRef } from 'react'

type TextInputProps = ComponentPropsWithRef<'input'>

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`text-xl align-middle bg-carbon-900 border-0 border-b-1 border-carbon-700 focus:border-carbon-400 focus:ring-0 shadow-lg transition-colors duration-500 ${className}`}
        autoComplete="off"
        {...props}
      />
    )
  },
)

TextInput.displayName = 'TextInput'

TextInput.defaultProps = {
  className: '',
}

export default TextInput
