import { forwardRef } from 'react'
import type { ComponentPropsWithRef } from 'react'

type LabelProps = ComponentPropsWithRef<'label'> & {
  required?: boolean
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required, htmlFor, ...props }: LabelProps, ref) => {
    return (
      <label
        ref={ref}
        className="block sm:inline mr-3 text-lg"
        // must be specified to prevent eslint error
        htmlFor={htmlFor}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden>
            *
          </span>
        )}
      </label>
    )
  },
)

Label.displayName = 'Label'

Label.defaultProps = {
  required: false,
}

export default Label
