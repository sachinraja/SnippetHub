import Link from 'next/link'
import type { ComponentProps } from 'react'

export type LinkWithPropsPassedProps = ComponentProps<'a'> & { href: string }

const LinkWithPropsPassed = ({
  href,
  children,
  ...props
}: LinkWithPropsPassedProps) => {
  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  )
}

export default LinkWithPropsPassed
