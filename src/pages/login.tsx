import Link from 'next/link'
import config from 'src/config'
import type { InferGetStaticPropsType } from 'next'
import type { SimpleIcon } from 'simple-icons'

const githubIcon: SimpleIcon = require('simple-icons/icons/github')

export const getStaticProps = () => {
  const searchParams = new URLSearchParams({
    client_id: config.get('github').clientId,
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
  <main className="md:w-1/2 w-2/3 m-auto mt-4">
    <div className="border-white border-1 rounded-md p-2">
      <h1 className="text-center text-white text-xl font-semibold">
        Sign in to SnippetHub
      </h1>

      <div className="flex justify-center mt-2">
        <Link href={githubAuthUrl}>
          <a className="inline-block bg-blue-800 hover:bg-blue-700 text-white text-lg p-1.5 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 my-1 w-5 inline-block"
              viewBox="0 0 24 24"
            >
              <path fill="white" d={githubIcon.path} />
            </svg>
            &nbsp;| Sign in with GitHub
          </a>
        </Link>
      </div>
    </div>
  </main>
)

export default Login
