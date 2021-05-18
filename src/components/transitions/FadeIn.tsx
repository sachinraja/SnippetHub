import FadeInTransition from 'react-fade-in'
import usePrefersReducedMotion from '@hooks/use-reduced-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  as?: keyof JSX.IntrinsicElements
  children: ReactNode
}
function FadeIn({ as, children }: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return prefersReducedMotion ? (
    <div>{children}</div>
  ) : (
    // @ts-expect-error Docs show string passed into wrapperTag, it has the wrong type here.
    <FadeInTransition wrapperTag={as} transitionDuration={500}>
      {children}
    </FadeInTransition>
  )
}

FadeIn.defaultProps = {
  as: undefined,
}

export default FadeIn
