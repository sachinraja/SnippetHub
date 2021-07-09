import { signIn } from 'next-auth/client'
import { ComponentProps } from 'react'
import githubIcon from 'simple-icons/icons/github'

type SignUpButtonsProps = ComponentProps<'button'> & {
  prefixText: string
}

const SignUpButtons = ({
  disabled,
  className,
  onClick,
  prefixText,
  ...props
}: SignUpButtonsProps) => (
  <div className="flex justify-center mt-2">
    <button
      disabled={disabled}
      type="button"
      className={`inline-block p-1.5 text-lg text-white bg-blue-800 hover:bg-blue-700 disabled:hover:bg-blue-800 rounded-md disabled:opacity-60 ${className}`}
      onClick={(e) => {
        if (onClick) onClick(e)
        signIn('github', { callbackUrl: '/' })
      }}
      {...props}
    >
      <svg
        className="inline-block my-1 ml-1 w-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={githubIcon.path} fill="white" />
      </svg>
      &nbsp;| {prefixText} with GitHub
    </button>
  </div>
)

export default SignUpButtons
