import SearchTemplate from '@components/SearchTemplate/SearchTemplate'
import getCardFromSnippet from '@lib/snippet/card'
import getTopSnippets from '@lib/snippet/top'
import type { CardProps } from '@components/Card/Card'
import type { InferGetStaticPropsType } from 'next'
import type { ReactElement } from 'react'

export const getStaticProps = async () => {
  return {
    props: {
      topSnippets: await getTopSnippets(20),
    },
    revalidate: 120,
  }
}

const HomePage = ({
  topSnippets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // create components for top snippets
  const cards = topSnippets.map(
    (snippet): ReactElement<CardProps> =>
      getCardFromSnippet(snippet, snippet.author),
  )

  return (
    <SearchTemplate
      heading="Most Popular Snippets"
      headingLabel="The snippets with the most votes."
      cards={cards}
    />
  )
}

export default HomePage
