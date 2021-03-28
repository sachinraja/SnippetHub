import { CardProps } from '@components/Card/Card'
import { ReactElement, ReactNode } from 'react'
import CardContainer from '@components/CardContainer/CardContainer'
import Heading from '@components/Heading/Heading'
import Hero from '@components/Hero/Hero'
import Paragraph from '@components/Paragraph/Paragraph'

interface SearchTemplateProps {
  heading: string
  headingLabel: string
  cards: ReactElement<CardProps>[]
  children?: ReactNode
}

const SearchTemplate = ({
  heading,
  headingLabel,
  cards,
  children,
}: SearchTemplateProps) => {
  return (
    <>
      <Hero />
      <header className="flex mx-4">
        <div className="h-14">
          <svg
            className="h-full text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div>
          <Heading
            className="font-inter text-xl"
            priority={2}
            size={2}
            bold
            center={false}
          >
            {heading}
          </Heading>
          <Paragraph size={3}>{headingLabel}</Paragraph>
        </div>
      </header>

      <main className="mx-4 mt-2 mb-16">
        <CardContainer>{cards}</CardContainer>
        {children}
      </main>
    </>
  )
}

SearchTemplate.defaultProps = {
  children: undefined,
}

export default SearchTemplate
