import { InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Container from '@components/Container/Container'
import SearchPageLayout from '@layouts/SearchPageLayout'
import getCardFromPack from '@lib/pack/card'
import searchForPack from '@lib/pack/search'
import type { CardProps } from '@components/Card/Card'
import type { ReactElement } from 'react'

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
      foundPacks: await searchForPack(searchKeyword, 'desc'),
      searchKeyword,
    },
  }
}

const SearchPage = ({
  foundPacks,
  searchKeyword,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // create components for found snippets
  const cards = foundPacks.map(
    (pack): ReactElement<CardProps> => getCardFromPack(pack, pack.author),
  )

  return (
    <Container meta={{ title: `${searchKeyword} | SnippetHub Search` }}>
      <SearchPageLayout
        cards={cards}
        heading={`Search Results - ${searchKeyword}`}
        headingIcon={
          <svg
            className="h-full text-blue-600 motion-safe:animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
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
