import Container from '@components/Container/Container'
import SearchPageLayout from '@layouts/SearchPageLayout'
import getCardFromPack from '@lib/pack/card'
import getTopPacks from '@lib/pack/top'
import type { CardProps } from '@components/Card/Card'
import type { InferGetStaticPropsType } from 'next'
import type { ReactElement } from 'react'

export const getStaticProps = async () => {
  return {
    props: {
      topPacks: await getTopPacks(20),
    },
    revalidate: 120,
  }
}

const HomePage = ({
  topPacks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // create components for top snippets
  const cards = topPacks.map(
    (pack): ReactElement<CardProps> => getCardFromPack(pack, pack.author),
  )

  return (
    <Container
      head={
        <link
          href="/opensearch.xml"
          rel="search"
          title="SnippetHub"
          type="application/opensearchdescription+xml"
        />
      }
    >
      <SearchPageLayout
        cards={cards}
        heading="Most Popular Snippet Packs"
        headingIcon={
          <svg
            className="h-full text-blue-600 motion-safe:animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 15l7-7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        }
        headingLabel="The snippet packs with the most votes."
      />
    </Container>
  )
}

export default HomePage
