import { InferGetServerSidePropsType } from 'next'
import { SearchIcon } from '@heroicons/react/outline'
import { searchForPack } from '@lib/pack/search'
import Container from '@components/containers/Container'
import SearchPageLayout from '@layouts/SearchPageLayout'
import getCardFromPack from '@lib/pack/card'
import type { ParsedUrlQuery } from 'querystring'

export const getServerSideProps = async ({
  query,
}: {
  query: ParsedUrlQuery
}) => {
  const { q } = query
  let searchKeyword = (q || '') as string
  if (Array.isArray(q)) {
    ;[searchKeyword] = q
  }
  searchKeyword = searchKeyword.trim()

  return {
    props: {
      foundPacks: await searchForPack(searchKeyword, { take: 20 }),
      searchKeyword,
    },
  }
}

const SearchPage = ({
  foundPacks,
  searchKeyword,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // create components for found packs
  const cards = foundPacks.map((pack) => getCardFromPack(pack, pack.author))

  return (
    <Container meta={{ title: `${searchKeyword} | SnippetHub Search` }}>
      <SearchPageLayout
        cards={cards}
        heading={`Search Results - ${searchKeyword}`}
        headingIcon={
          <SearchIcon className="h-full text-blue-600 motion-safe:animate-pulse" />
        }
        headingLabel={`${foundPacks.length} snippet pack${
          foundPacks.length === 1 ? '' : 's'
        } found.`}
        searchInputValue={searchKeyword}
      />
    </Container>
  )
}

export default SearchPage
