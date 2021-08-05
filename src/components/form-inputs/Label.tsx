import { forwardRef } from 'react'
import type { ComponentPropsWithRef } from 'react'

type LabelProps = ComponentPropsWithRef<'label'> & {
  text?: string
  required?: boolean
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, text, required, htmlFor, ...props }: LabelProps, ref) => (
    <label ref={ref} htmlFor={htmlFor} {...props}>
      {text && (
        <p className="block sm:inline mr-2 text-lg">
          {text}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden>
              *
            </span>
          )}
        </p>
      )}

      {children}
    </label>
  ),
)

Label.displayName = 'Label'

Label.defaultProps = {
  text: undefined,
  required: false,
}

export default Label
