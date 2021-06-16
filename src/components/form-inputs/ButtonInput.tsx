import { forwardRef } from 'react'
import type { ComponentPropsWithRef } from 'react'

type ButtonInputProps = ComponentPropsWithRef<'button'> & {
  type?: 'button' | 'reset' | 'submit'
}

const ButtonInput = forwardRef<HTMLButtonElement, ButtonInputProps>(
  ({ className, type, ...props }: ButtonInputProps, ref) => {
    return (
      <button
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type ?? 'button'}
        className={`${className} text-xl bg-carbon-800 cursor-pointer py-1.5 px-5 rounded-md hover:bg-carbon-700 transition-colors`}
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
