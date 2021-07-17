import { setCookie } from 'nookies'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Container from '@components/containers/Container'
import IfUnauthenticated from '@components/auth/IfUnauthenticated'
import TextInput from '@components/form-inputs/TextInput'
import Label from '@components/form-inputs/Label'
import FormError from '@components/forms/FormError'
import SignUpButtons from '@components/SignUpButtons'
import { userUsername } from '@lib/schemas/user-schema'

const Signup = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm<{ username: string }>({
    resolver: yupResolver(
      Yup.object().shape({
        username: userUsername,
      }),
    ),
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
                  {...register('username')}
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
