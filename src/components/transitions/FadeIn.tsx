import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import usePrefersReducedMotion from '@hooks/use-reduced-motion'
import type { ComponentProps, ReactNode } from 'react'
import type { TransitionEvents } from '@headlessui/react'

type FadeInProps = {
  as?: ComponentProps<typeof Transition>['as']
  from?: Direction
  children: ReactNode
} & TransitionEvents

function FadeIn({ as, from, children, ...props }: FadeInProps) {
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
      enterFrom={`opacity-0 ${getDirectionClassName()}`}
      enterTo="opacity-100"
      {...props}
    >
      {children}
    </Transition>
  )
}

FadeIn.defaultProps = {
  as: undefined,
  from: 'down',
}

export default FadeIn
