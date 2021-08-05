import { forwardRef } from 'react'
import type { ComponentPropsWithRef } from 'react'

type TextAreaInputProps = ComponentPropsWithRef<'textarea'>

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ className, ...props }: TextAreaInputProps, ref) => (
    <textarea
      ref={ref}
      className={`w-full sm:w-2/3 align-middle bg-carbon-900 rounded-sm border-0 ring-1 ring-carbon-700 focus:ring-carbon-400 transition-shadow duration-300 ${className}`}
      autoComplete="off"
      {...props}
    />
  ),
)

TextAreaInput.displayName = 'TextAreaInput'

export default TextAreaInput
