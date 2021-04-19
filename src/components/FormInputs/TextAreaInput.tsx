import { forwardRef } from 'react'
import Label from './Label'
import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

type TextAreaInputPropsBase = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

type TextAreaInputProps = TextAreaInputPropsBase & {
  label?: string
  responsive?: boolean
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      children,
      label,
      id,
      responsive,
      required,
      className,
      ...props
    }: TextAreaInputProps,
    ref,
  ) => {
    return (
      <>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          className={`bg-carbon-900 ${
            responsive ? 'w-full sm:w-2/3' : ''
          } border-0 align-middle rounded-sm ring-1 ring-carbon-700 focus:ring-carbon-400 transition-shadow duration-300 ${className}`}
          id={id}
          name={id}
          autoComplete="off"
          {...props}
        />
        {children}
      </>
    )
  },
)

TextAreaInput.displayName = 'TextAreaInput'

TextAreaInput.defaultProps = {
  label: undefined,
  responsive: true,
}

export default TextAreaInput
