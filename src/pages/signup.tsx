import { setCookie } from 'nookies'
import { useForm } from 'react-hook-form'
import Container from '@components/containers/Container'
import IfUnauthenticated from '@components/auth/IfUnauthenticated'
import TextInput from '@components/form-inputs/TextInput'
import Label from '@components/form-inputs/Label'
import FormError from '@components/forms/FormError'
import alphanumericWithDashes, {
  alphanumerWithDashesErrorMessage,
} from '@lib/validation/alphanumeric-with-dashes'
import validationErrors from '@lib/validation/error'
import SignUpButtons from '@components/SignUpButtons'

const Signup = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm<{ username: string }>({
    mode: 'onChange',
  })

  return (
    <IfUnauthenticated>
      <Container meta={{ title: 'Signup for SnippetHub' }}>
        <section className="m-auto mt-4 w-2/3 md:w-1/2">
          <div className="p-2 rounded-md border-1 border-white">
            <h1 className="text-xl font-semibold text-center text-white">
              Sign in to SnippetHub
            </h1>

            <div className="m-auto w-3/4">
              <Label text="Username" required>
                <TextInput
                  placeholder="johndoe"
                  required
                  {...register('username', {
                    required: validationErrors.required,
                    maxLength: {
                      value: 39,
                      message: validationErrors.maxLength({ max: 39 }),
                    },
                    pattern: {
                      value: alphanumericWithDashes,
                      message: alphanumerWithDashesErrorMessage,
                    },
                  })}
                />
              </Label>
              <FormError name="username" errors={errors} />

              <SignUpButtons
                prefixText="Sign up"
                disabled={!isValid}
                onClick={() => {
                  setCookie(null, 'requestedUsername', getValues('username'), {
                    // 1 hour
                    maxAge: 60 * 60,
                    path: '/',
                  })
                }}
              />
            </div>
          </div>
        </section>
      </Container>
    </IfUnauthenticated>
  )
}

export default Signup
