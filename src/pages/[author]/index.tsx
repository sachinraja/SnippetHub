import { CardProps } from '@components/Card/Card'
import { ReactElement } from 'react'
import { getUser, getUserPacks } from '@lib/user'
import CardContainer from '@components/CardContainer/CardContainer'
import Container from '@components/Container/Container'
import Header from '@components/Header/Header'
import Heading from '@components/Heading/Heading'
import Paragraph from '@components/Paragraph/Paragraph'
import getCardFromPack from '@lib/pack/card'
import type { GetStaticPaths } from 'next'

export const getStaticProps = async ({
  params,
}: {
  params: { author: string }
}) => {
  // return 404 if the route is not prefixed with @ (signifying a user)
  if (!params.author.startsWith('@')) {
    return { notFound: true }
  }

  const username = params.author.slice(1)

  const user = await getUser(username)

  if (!user) {
    return { notFound: true }
  }

  const packs = await getUserPacks(user.id, {
    orderBy: 'desc',
    take: 20,
  })

  return {
    props: {
      author: user,
      packs,
    },
    revalidate: 30,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // nextjs passes empty props if fallback is true and page is on first render
    // blocking works like SSR, but caches the page
    fallback: 'blocking',

    paths: [{ params: { author: '@xCloudzx' } }],
  }
}

const AuthorPage = ({
  author,
  packs,
}: {
  author: Exclude<ThenArg<ReturnType<typeof getUser>>, null>
  packs: ThenArg<ReturnType<typeof getUserPacks>>
}) => {
  // must copy to keep state of arguments
  const packsCopy = [...packs]
  const cards = packsCopy.map(
    (pack): ReactElement<CardProps> => getCardFromPack(pack, author),
  )

  return (
    <Container meta={{ title: `@${author.username}` }}>
      <header className="mt-0">
        <Header>
          <section className="m-auto sm:w-2/3">
            <img
              alt={`${author.username} Profile`}
              className="inline-block rounded-full w-12 sm:w-20"
              src={`https://avatars.githubusercontent.com/u/${author.gitHubId}`}
            />
            <Heading
              className="inline font-inter pl-2 align-middle"
              priority={1}
              size={4}
              bold
            >
              {author.username}
            </Heading>

            <Paragraph className="font-inter mt-2" size={4}>
              {packs[0].description}
            </Paragraph>
          </section>
        </Header>
      </header>
      <main className="mx-4 mt-2 mb-16">
        <CardContainer>{cards}</CardContainer>
      </main>
    </Container>
  )
}

export default AuthorPage
