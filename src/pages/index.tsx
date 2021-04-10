import {
  GetTopPacksDocument,
  useGetTopPacksQuery,
} from '@graphql/queries/get-top-packs.graphql'
import { initializeApollo } from '@lib/apollo-client'
import Container from '@components/Container/Container'
import SearchPageLayout from '@layouts/SearchPageLayout'
import getCardFromPack from '@lib/pack/card'
import type { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { getTopPacks: topPacks },
  }: {
    data: Exclude<ReturnType<typeof useGetTopPacksQuery>['data'], undefined>
  } = await apolloClient.query({
    query: GetTopPacksDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      topPacks,
    },
    revalidate: 120,
  }
}

const HomePage = ({
  topPacks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // create components for top snippets
  const cards = topPacks.map((pack) => getCardFromPack(pack, pack.author))

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
