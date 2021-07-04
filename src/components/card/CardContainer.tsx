import { CardProps } from './Card'
import type { ReactElement } from 'react'

interface CardContainerProps {
  children: ReactElement<CardProps>[]
}

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <section className="grid gap-1 break-words md:grid-cols-4 sm:grid-cols-2">
      {children}
    </section>
  )
}

export default CardContainer
