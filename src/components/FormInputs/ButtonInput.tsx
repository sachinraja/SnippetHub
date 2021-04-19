import { forwardRef } from 'react'
import type { MouseEventHandler } from 'react'

interface ButtonInputProps {
  className?: string
  id?: string
  value: string
  disabled?: boolean
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLInputElement>
}

const ButtonInput = forwardRef<HTMLInputElement, ButtonInputProps>(
  (
    { className, id, value, disabled, type, onClick }: ButtonInputProps,
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`text-xl bg-carbon-800 cursor-pointer py-1.5 px-5 rounded-md hover:bg-carbon-700 transition-colors ${className}`}
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        onClick={onClick}
      />
    )
  },
)

ButtonInput.displayName = 'ButtonInput'

ButtonInput.defaultProps = {
  className: '',
  id: undefined,
  disabled: false,
  type: 'button',
  onClick: undefined,
}

export default ButtonInput
