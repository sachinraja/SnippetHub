import type { ReactElement } from 'react'
import type { CardProps } from '@components/card/Card'

interface CardContainerProps {
  children: ReactElement<CardProps>[]
}

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <section className="grid md:grid-cols-4 sm:grid-cols-2 gap-1 break-words">
      {children}
    </section>
  )
}

export default CardContainer
