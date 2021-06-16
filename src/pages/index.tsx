import { ChevronUpIcon } from '@heroicons/react/outline'
import {
  GetTopPacksDocument,
  useGetTopPacksQuery,
} from '@graphql/queries/get-top-packs.graphql'
import { initializeApollo } from '@lib/apollo-client'
import Container from '@components/containers/Container'
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
  const cards = topPacks.map((pack) =>
    getCardFromPack(pack, {
      username: pack.author.username,
      image: pack.author.image ?? undefined,
    }),
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
          <ChevronUpIcon className="h-full text-blue-600 motion-safe:animate-bounce" />
        }
        headingLabel="The snippet packs with the most votes."
      />
    </Container>
  )
}

export default HomePage
