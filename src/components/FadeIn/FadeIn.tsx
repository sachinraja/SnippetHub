import { Fade } from 'react-awesome-reveal'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
}
function FadeIn({ children }: FadeInProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  return prefersReducedMotion ? (
    <div>{children}</div>
  ) : (
    <Fade direction="up" triggerOnce>
      {children}
    </Fade>
  )
}

export default FadeIn
