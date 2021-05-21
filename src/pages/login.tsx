import Container from '@components/containers/Container'
import Link from 'next/link'
import envConfig from 'src/config'
import githubIcon from 'simple-icons/icons/github'
import type { InferGetStaticPropsType } from 'next'

export const getStaticProps = () => {
  const searchParams = new URLSearchParams({
    /* eslint-disable-next-line camelcase */
    client_id: envConfig.get('gitHub.clientId'),
  })

  const githubAuthUrl = `https://github.com/login/oauth/authorize?${searchParams.toString()}`

  return {
    props: {
      githubAuthUrl,
    },
  }
}

const Login = ({
  githubAuthUrl,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Container meta={{ title: 'Sign in to SnippetHub' }}>
    <section className="md:w-1/2 w-2/3 m-auto mt-4">
      <div className="border-white border-1 rounded-md p-2">
        <h1 className="text-center text-white text-xl font-semibold">
          Sign in to SnippetHub
        </h1>

        <div className="flex justify-center mt-2">
          <Link href={githubAuthUrl}>
            <a className="inline-block bg-blue-800 hover:bg-blue-700 text-white text-lg p-1.5 rounded-md">
              <svg
                className="ml-1 my-1 w-5 inline-block"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={githubIcon.path} fill="white" />
              </svg>
              &nbsp;| Sign in with GitHub
            </a>
          </Link>
        </div>
      </div>
    </section>
  </Container>
)

export default Login
