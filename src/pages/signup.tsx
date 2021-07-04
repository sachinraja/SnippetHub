import githubIcon from 'simple-icons/icons/github'
import { signIn } from 'next-auth/client'
import { setCookie } from 'nookies'
import Container from '@components/containers/Container'
import IfUnauthenticated from '@components/auth/IfUnauthenticated'

const Signup = () => (
  <IfUnauthenticated>
    <Container meta={{ title: 'Signup for SnippetHub' }}>
      <section className="m-auto mt-4 w-2/3 md:w-1/2">
        <div className="p-2 rounded-md border-1 border-white">
          <h1 className="text-xl font-semibold text-center text-white">
            Sign in to SnippetHub
          </h1>

          <div className="flex justify-center mt-2">
            <button
              type="button"
              className="inline-block p-1.5 text-lg text-white bg-blue-800 hover:bg-blue-700 rounded-md"
              onClick={() => {
                setCookie(null, 'requestedUsername', 'sachinraja', {
                  // 1 hour
                  maxAge: 60 * 60,
                  path: '/',
                })
                signIn('github', { callbackUrl: '/' })
              }}
            >
              <svg
                className="inline-block my-1 ml-1 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={githubIcon.path} fill="white" />
              </svg>
              &nbsp;| Sign in with GitHub
            </button>
          </div>
        </div>
      </section>
    </Container>
  </IfUnauthenticated>
)

export default Signup
