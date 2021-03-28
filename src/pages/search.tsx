import { InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import SearchTemplate from '@components/SearchTemplate/SearchTemplate'
import getCardFromSnippet from '@lib/snippet/card'
import searchForSnippet from '@lib/snippet/search'
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
    /* eslint-disable @typescript-eslint/no-extra-semi */
    ;[searchKeyword] = q
  }
  searchKeyword = searchKeyword.trim()

  return {
    props: {
      title: `${searchKeyword} | SnippetHub Search`,
      searchKeyword,
      foundSnippets: await searchForSnippet(searchKeyword, 'desc'),
    },
  }
}

const SearchPage = ({
  searchKeyword,
  foundSnippets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // create components for found snippets
  const cards = foundSnippets.map(
    (snippet): ReactElement<CardProps> =>
      getCardFromSnippet(snippet, snippet.author),
  )

  return (
    <SearchTemplate
      heading={`Search Results - ${searchKeyword}`}
      headingLabel={`${foundSnippets.length} snippet${
        foundSnippets.length === 1 ? '' : 's'
      } found.`}
      cards={cards}
    />
  )
}

export default SearchPage
