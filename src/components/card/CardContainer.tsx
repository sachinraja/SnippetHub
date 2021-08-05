import { CardProps } from './Card'
import type { ReactElement } from 'react'

interface CardContainerProps {
  children: ReactElement<CardProps>[]
}

const CardContainer = ({ children }: CardContainerProps) => (
  <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-1 break-words">
    {children}
  </section>
)

export default CardContainer
