import CardContainer from '@components/card/CardContainer'
import Heading from '@components/Heading'
import Hero from '@components/hero/Hero'
import Paragraph from '@components/Paragraph'
import PageNumbers from '@components/nav/PageNumbers'
import type { ReactElement, ReactNode } from 'react'
import type { CardProps } from '@components/card/Card'

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
}: SearchPageLayoutProps) => (
  <>
    <Hero searchInputValue={searchInputValue} />
    <header className="flex mx-4">
      <div className="h-14">{headingIcon}</div>

      <div>
        <Heading className="font-inter text-xl" priority={2} size="2xl" bold>
          {heading}
        </Heading>
        <Paragraph>{headingLabel}</Paragraph>
      </div>
    </header>

    <section className="mx-4 mt-2 mb-16">
      <CardContainer>{cards}</CardContainer>
      {children}
      <PageNumbers
        className="mt-10"
        range={10}
        constructHref={(i) => `/search/?page=${i}`}
      />
    </section>
  </>
)

SearchPageLayout.defaultProps = {
  children: undefined,
  searchInputValue: '',
}

export default SearchPageLayout
