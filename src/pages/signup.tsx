import githubIcon from 'simple-icons/icons/github'
import { signIn } from 'next-auth/client'
import { setCookie } from 'nookies'
import Container from '@components/containers/Container'
import AllowOnlyIfUnauthenticated from '@components/auth/AllowOnlyIfUnauthenticated'

const Signup = () => (
  <AllowOnlyIfUnauthenticated>
    <Container meta={{ title: 'Signup for SnippetHub' }}>
      <section className="md:w-1/2 w-2/3 m-auto mt-4">
        <div className="border-white border-1 rounded-md p-2">
          <h1 className="text-center text-white text-xl font-semibold">
            Sign in to SnippetHub
          </h1>

          <div className="flex justify-center mt-2">
            <button
              type="button"
              className="inline-block bg-blue-800 hover:bg-blue-700 text-white text-lg p-1.5 rounded-md"
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
                className="ml-1 my-1 w-5 inline-block"
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
  </AllowOnlyIfUnauthenticated>
)

export default Signup
