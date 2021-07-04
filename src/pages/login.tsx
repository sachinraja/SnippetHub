import githubIcon from 'simple-icons/icons/github'
import { signIn } from 'next-auth/client'
import Container from '@components/containers/Container'
import IfUnauthenticated from '@components/auth/IfUnauthenticated'

const Login = () => {
  return (
    <IfUnauthenticated>
      <Container meta={{ title: 'Login to SnippetHub' }}>
        <section className="m-auto mt-4 w-2/3 md:w-1/2 ">
          <div className="p-2 rounded-md border-1 border-white">
            <h1 className="text-xl font-semibold text-center text-white">
              Login to SnippetHub
            </h1>

            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="inline-block p-1.5 text-lg text-white bg-blue-800 hover:bg-blue-700 rounded-md"
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                <svg
                  className="inline-block my-1 ml-1 w-5"
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
