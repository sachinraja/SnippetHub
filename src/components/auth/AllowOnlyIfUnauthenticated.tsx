import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

interface AllowOnlyIfUnauthenticatedProps {
  children: JSX.Element
  redirectTo?: string
}

const AllowOnlyIfUnauthenticated = ({
  children,
  redirectTo,
}: AllowOnlyIfUnauthenticatedProps) => {
  const router = useRouter()
  const [session] = useSession()

  // do not render anything if the session exists
  if (session) {
    router.replace(redirectTo ?? '/')
    return null
  }

  return children
}

AllowOnlyIfUnauthenticated.defaultProps = {
  redirectTo: '/',
}

export default AllowOnlyIfUnauthenticated
