import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

interface AllowOnlyIfAuthenticatedProps {
  children: JSX.Element
  redirectTo?: string
}

const AllowOnlyIfAuthenticated = ({
  children,
  redirectTo,
}: AllowOnlyIfAuthenticatedProps) => {
  const router = useRouter()
  const [session] = useSession()

  // do not render anything if the session does not exist
  if (!session) {
    router.replace(redirectTo ?? '/')
    return null
  }

  return children
}

AllowOnlyIfAuthenticated.defaultProps = {
  redirectTo: '/',
}

export default AllowOnlyIfAuthenticated
