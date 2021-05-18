import { useEffect, useState } from 'react'

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  return prefersReducedMotion
}

export default usePrefersReducedMotion
