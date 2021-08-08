import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  GetTopPacksDocument,
  useGetTopPacksLazyQuery,
  useGetTopPacksQuery,
} from '@graphql/queries/get-top-packs.graphql'
import { initializeApollo } from '@lib/apollo-client'
import Container from '@components/containers/Container'
import SearchPageLayout from '@layouts/SearchPageLayout'
import getCardFromPack from '@lib/pack/card'
import UpvoteIcon from '@components/icons/UpvoteIcon'
import { getPageNumberFromParam } from '@lib/utils/client-url-params'
import type { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { getTopPacks: topPacks },
  }: {
    data: Exclude<ReturnType<typeof useGetTopPacksQuery>['data'], undefined>
  } = await apolloClient.query({
    query: GetTopPacksDocument,
    variables: { take: 20 },
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
  const router = useRouter()

  const [packs, setPacks] = useState(topPacks)

  // create components for top snippets
  const cards = packs.map((pack) =>
    getCardFromPack(pack, {
      username: pack.author.username,
      image: pack.author.image ?? undefined,
    }),
  )

  const [getTopPacks, { data: getTopPacksOnPageClickData, loading }] =
    useGetTopPacksLazyQuery()

  useEffect(() => {
    if (loading || !getTopPacksOnPageClickData) return
    setPacks(getTopPacksOnPageClickData.getTopPacks)
  }, [getTopPacksOnPageClickData, loading])

  useEffect(() => {
    const pageNumber = getPageNumberFromParam(router.query.page)

    if (pageNumber !== 1) {
      getTopPacks({
        variables: {
          skip: 20 * pageNumber - 1,
          take: 20,
        },
      })
    }
  }, [getTopPacks, router])

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
          <UpvoteIcon
            className="h-full motion-safe:animate-bounce"
            width={undefined}
          />
        }
        headingLabel="The snippet packs with the most votes."
        onPageClick={(i) => {
          getTopPacks({
            variables: {
              skip: 20 * i,
              take: 20,
            },
          })

          router.push(
            {
              pathname: router.pathname,
              query: { page: i + 1 },
            },
            undefined,
            { shallow: true },
          )
        }}
      />
    </Container>
  )
}

export default HomePage
