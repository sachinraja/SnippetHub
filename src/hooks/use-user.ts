import type { User } from '@prisma/client'
import { decode } from 'jsonwebtoken'
import { parseCookies } from 'nookies'

const useUser = () => {
  const cookie = parseCookies().user
  return decode(cookie) as User | null
}

export default useUser
