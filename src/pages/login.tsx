import Container from '@components/containers/Container'
import IfUnauthenticated from '@components/auth/IfUnauthenticated'
import SignUpButtons from '@components/SignUpButtons'

const Login = () => {
  return (
    <IfUnauthenticated>
      <Container meta={{ title: 'Login to SnippetHub' }}>
        <section className="m-auto mt-4 w-2/3 md:w-1/2">
          <div className="p-2 rounded-md border-1 border-white">
            <h1 className="text-xl font-semibold text-center text-white">
              Login to SnippetHub
            </h1>

            <SignUpButtons prefixText="Login" />
          </div>
        </section>
      </Container>
    </IfUnauthenticated>
  )
}

export default Login
