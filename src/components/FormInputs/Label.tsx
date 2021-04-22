import type { DetailedHTMLProps, LabelHTMLAttributes } from 'react'

type LabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  required?: boolean
}

const Label = ({ children, required, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      className="block sm:inline mr-3 text-lg"
      // must be specified to prevent eslint error
      htmlFor={htmlFor}
      {...props}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-1" aria-hidden>
          *
        </span>
      )}
    </label>
  )
}

Label.defaultProps = {
  required: false,
}

export default Label
