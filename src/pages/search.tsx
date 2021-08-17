import { InferGetServerSidePropsType } from 'next'
import { SearchIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { searchForPack } from '@lib/pack/search'
import Container from '@components/containers/Container'
import SearchPageLayout from '@layouts/SearchPageLayout'
import getCardFromPack from '@lib/pack/card'
import {
  getPageNumberFromParam,
  getSearchKeywordFromParam,
} from '@lib/utils/client-url-params'
import { useGetPacksByNameWithCountLazyQuery } from '@graphql/queries/get-packs-by-name-with-count.graphql'
import { countPacks } from '@lib/pack/count'
import prisma from '@lib/prisma'
import PageNumbers from '@components/nav/PageNumbers'
import type { ParsedUrlQuery } from 'querystring'

export const getServerSideProps = async ({
  query,
}: {
  query: ParsedUrlQuery
}) => {
  const { q, page } = query
  const searchKeyword = getSearchKeywordFromParam(q)

  const pageNumber = getPageNumberFromParam(page)

  const [foundPacks, initialCount] = await prisma.$transaction([
    searchForPack(searchKeyword, {
      skip: 2 * (pageNumber - 1),
      take: 2,
    }),
    countPacks(searchKeyword),
  ])
  return {
    props: {
      foundPacks,
      initialCount,
      searchKeyword,
    },
  }
}

const SearchPage = ({
  foundPacks,
  initialCount,
  searchKeyword,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  // create components for found packs
  const [getPackByName, { data: getSearchedPacksOnPageClickData, loading }] =
    useGetPacksByNameWithCountLazyQuery()

  const [packs, setPacks] =
    useState<
      NonNullable<
        NonNullable<
          typeof getSearchedPacksOnPageClickData
        >['getPacksByNameWithCount']
      >['packs']
    >(foundPacks)

  const [packsCount, setPacksCount] = useState<number>(0)

  useEffect(() => {
    setPacksCount(initialCount)
  }, [initialCount])

  useEffect(() => {
    setPacks(foundPacks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q])

  const [packCards, setPackCards] = useState(
    packs.map((pack) =>
      getCardFromPack(pack, {
        username: pack.author.username,
        image: pack.author.image ?? undefined,
      }),
    ),
  )

  useEffect(() => {
    setPackCards(
      packs.map((pack) =>
        getCardFromPack(pack, {
          username: pack.author.username,
          image: pack.author.image ?? undefined,
        }),
      ),
    )
  }, [packs])

  useEffect(() => {
    const data = getSearchedPacksOnPageClickData?.getPacksByNameWithCount
    if (loading || !data) return

    setPacks(data.packs)
    setPacksCount(data.count)
  }, [getSearchedPacksOnPageClickData, loading])

  return (
    <Container meta={{ title: `${searchKeyword} | SnippetHub Search` }}>
      <SearchPageLayout
        cards={packCards}
        heading={`Search Results - ${searchKeyword}`}
        headingIcon={
          <SearchIcon className="h-full text-blue-600 motion-safe:animate-pulse" />
        }
        headingLabel={`${packsCount} snippet pack${
          initialCount === 1 ? '' : 's'
        } found.`}
        searchInputValue={searchKeyword}
      >
        <PageNumbers
          className="mt-10"
          range={packsCount / 2}
          max={10}
          constructHref={(i) => `/search/?page=${i + 1}`}
          onPageClick={(i) => {
            getPackByName({
              variables: { name: searchKeyword, skip: 2 * i, take: 2 },
            })

            router.push(
              {
                pathname: router.pathname,
                query: { q: searchKeyword, page: i + 1 },
              },
              undefined,
              { shallow: true, scroll: false },
            )
          }}
        />
      </SearchPageLayout>
    </Container>
  )
}

export default SearchPage
