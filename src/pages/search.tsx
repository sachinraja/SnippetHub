import { InferGetServerSidePropsType } from 'next'
import { SearchIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { searchForPack } from '@lib/pack/search'
import Container from '@components/containers/Container'
import SearchPageLayout from '@layouts/SearchPageLayout'
import getCardFromPack from '@lib/pack/card'
import { useGetPackByNameLazyQuery } from '@graphql/queries/get-pack-by-name.graphql'
import {
  getPageNumberFromParam,
  getSearchKeywordFromParam,
} from '@lib/utils/client-url-params'
import type { ParsedUrlQuery } from 'querystring'

export const getServerSideProps = async ({
  query,
}: {
  query: ParsedUrlQuery
}) => {
  const { q, page } = query
  const searchKeyword = getSearchKeywordFromParam(q)

  const pageNumber = getPageNumberFromParam(page)

  return {
    props: {
      foundPacks: await searchForPack(searchKeyword, {
        skip: 20 * (pageNumber - 1),
        take: 20,
      }),
      searchKeyword,
    },
  }
}

const SearchPage = ({
  foundPacks,
  searchKeyword,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  // create components for found packs
  const [getPackByName, { data: getSearchedPacksOnPageClickData, loading }] =
    useGetPackByNameLazyQuery()

  const [packs, setPacks] =
    useState<
      Exclude<
        typeof getSearchedPacksOnPageClickData,
        undefined
      >['getPackByName']
    >(foundPacks)

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
    if (loading || !getSearchedPacksOnPageClickData) return

    setPacks(getSearchedPacksOnPageClickData.getPackByName)
  }, [getSearchedPacksOnPageClickData, loading])

  return (
    <Container meta={{ title: `${searchKeyword} | SnippetHub Search` }}>
      <SearchPageLayout
        cards={packCards}
        heading={`Search Results - ${searchKeyword}`}
        headingIcon={
          <SearchIcon className="h-full text-blue-600 motion-safe:animate-pulse" />
        }
        headingLabel={`${foundPacks.length} snippet pack${
          foundPacks.length === 1 ? '' : 's'
        } found.`}
        searchInputValue={searchKeyword}
        onPageClick={(i) => {
          getPackByName({
            variables: { name: searchKeyword, skip: 20 * i, take: 20 },
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
    </Container>
  )
}

export default SearchPage
