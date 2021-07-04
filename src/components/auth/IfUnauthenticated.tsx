import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

interface IfUnauthenticatedProps {
  children: JSX.Element
  redirectTo?: string
}

const IfUnauthenticated = ({
  children,
  redirectTo,
}: IfUnauthenticatedProps) => {
  const router = useRouter()
  const [session] = useSession()

  // do not render anything if the session exists
  if (session) {
    router.replace(redirectTo ?? '/')
    return null
  }

  return children
}

IfUnauthenticated.defaultProps = {
  redirectTo: '/',
}

export default IfUnauthenticated
