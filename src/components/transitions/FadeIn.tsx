import usePrefersReducedMotion from '@hooks/use-reduced-motion'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import type { ComponentProps, ReactNode } from 'react'

interface FadeInProps {
  as?: ComponentProps<typeof Transition>['as']
  from?: Direction
  children: ReactNode
}

function FadeIn({ as, from, children }: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  function getDirectionClassName() {
    switch (from) {
      case 'left':
        return '-translate-x-1/2'
      case 'right':
        return 'translate-x-1/2'
      case 'up':
        return '-translate-y-1/2'
      // down
      default:
        return 'translate-y-1/2'
    }
  }

  const Tag = as ?? Fragment

  return prefersReducedMotion ? (
    <Tag>children</Tag>
  ) : (
    <Transition
      as={as}
      show
      appear
      enter="transition duration-1000"
      enterFrom={`transform opacity-0 ${getDirectionClassName()}`}
      enterTo="opacity-100"
    >
      {children}
    </Transition>
  )
}

FadeIn.defaultProps = {
  from: 'down',
  as: undefined,
}

export default FadeIn
