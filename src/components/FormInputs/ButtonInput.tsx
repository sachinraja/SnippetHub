import { forwardRef } from 'react'
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type ButtonInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type?: 'button' | 'submit'
}

const ButtonInput = forwardRef<HTMLInputElement, ButtonInputProps>(
  ({ className, type, ...props }: ButtonInputProps, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`text-xl bg-carbon-800 cursor-pointer py-1.5 px-5 rounded-md hover:bg-carbon-700 transition-colors ${className}`}
        {...props}
      />
    )
  },
)

ButtonInput.displayName = 'ButtonInput'

ButtonInput.defaultProps = {
  type: 'button',
}

export default ButtonInput
