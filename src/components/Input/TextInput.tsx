import { ReactNode, forwardRef } from 'react'

interface TextInputProps {
  id: string
  label?: string
  placeholder?: string
  children?: ReactNode
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, placeholder, children }: TextInputProps, ref) => {
    return (
      <>
        <input
          className="p-2 text-xl bg-carbon-900 rounded-md outline-none w-full"
          type="text"
          id={id}
          name={id}
          autoComplete="off"
          placeholder={placeholder}
          ref={ref}
        />
        {children}
        {label && <label htmlFor={id}>{label}</label>}
      </>
    )
  },
)

TextInput.displayName = 'TextInput'

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  children: undefined,
}

export default TextInput
