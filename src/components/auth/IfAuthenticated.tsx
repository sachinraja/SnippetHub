import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

interface IfAuthenticatedProps {
  children: JSX.Element
  redirectTo?: string
}

const IfAuthenticated = ({ children, redirectTo }: IfAuthenticatedProps) => {
  const router = useRouter()
  const [session] = useSession()

  // do not render anything if the session does not exist
  if (!session) {
    router.replace(redirectTo ?? '/')
    return null
  }

  return children
}

IfAuthenticated.defaultProps = {
  redirectTo: '/',
}

export default IfAuthenticated
