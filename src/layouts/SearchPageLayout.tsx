import CardContainer from '@components/CardContainer/CardContainer'
import Heading from '@components/Heading/Heading'
import Hero from '@components/Hero/Hero'
import Paragraph from '@components/Paragraph/Paragraph'
import type { CardProps } from '@components/Card/Card'
import type { ReactElement, ReactNode } from 'react'

interface SearchPageLayoutProps {
  cards: ReactElement<CardProps>[]
  children?: ReactNode
  heading: string
  headingIcon: ReactNode
  headingLabel: string
  searchInputValue?: string
}

const SearchPageLayout = ({
  cards,
  children,
  heading,
  headingIcon,
  headingLabel,
  searchInputValue,
}: SearchPageLayoutProps) => {
  return (
    <>
      <Hero searchInputValue={searchInputValue} />
      <header className="flex mx-4">
        <div className="h-14">{headingIcon}</div>

        <div>
          <Heading className="font-inter text-xl" priority={2} size={2} bold>
            {heading}
          </Heading>
          <Paragraph size={3}>{headingLabel}</Paragraph>
        </div>
      </header>

      <section className="mx-4 mt-2 mb-16">
        <CardContainer>{cards}</CardContainer>
        {children}
      </section>
    </>
  )
}

SearchPageLayout.defaultProps = {
  children: undefined,
  searchInputValue: '',
}

export default SearchPageLayout
