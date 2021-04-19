interface LabelProps {
  htmlFor?: string
  children: string
  required?: boolean
}

const Label = ({ htmlFor, children, required }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="block sm:inline mr-3 text-lg">
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
  htmlFor: undefined,
  required: false,
}

export default Label
