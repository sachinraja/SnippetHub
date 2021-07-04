import githubIcon from 'simple-icons/icons/github'
import { signIn } from 'next-auth/client'
import Container from '@components/containers/Container'
import IfUnauthenticated from '@components/auth/IfUnauthenticated'

const Login = () => {
  return (
    <IfUnauthenticated>
      <Container meta={{ title: 'Login to SnippetHub' }}>
        <section className="m-auto mt-4 w-2/3 md:w-1/2 ">
          <div className="border-white border-1 rounded-md p-2">
            <h1 className="text-center text-white text-xl font-semibold">
              Login to SnippetHub
            </h1>

            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="inline-block text-white text-lg p-1.5 rounded-md bg-blue-800 hover:bg-blue-700"
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                <svg
                  className="ml-1 my-1 w-5 inline-block"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={githubIcon.path} fill="white" />
                </svg>
                &nbsp;| Login with GitHub
              </button>
            </div>
          </div>
        </section>
      </Container>
    </IfUnauthenticated>
  )
}

export default Login
