import { getAuthorFromParam } from '@lib/utils/url-params'
import { getUserPacks } from '@lib/user'
import CardContainer from '@components/card/CardContainer'
import Container from '@components/containers/Container'
import Header from '@components/header/Header'
import Heading from '@components/Heading'
import Paragraph from '@components/Paragraph'
import getCardFromPack from '@lib/pack/card'
import type { GetStaticPaths } from 'next'
import Image from 'next/image'

export const getStaticProps = async ({
  params,
}: {
  params: { author: string }
}) => {
  const author = await getAuthorFromParam(params.author)
  if (!author) return { notFound: true }

  const packs = await getUserPacks(author, {
    orderBy: 'desc',
    take: 20,
  })

  return {
    props: {
      author,
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
  author: AuthorPropFromParam
  packs: UnwrapPromise<ReturnType<typeof getUserPacks>>
}) => {
  // must copy to keep state of arguments
  const packsCopy = [...packs]
  const cards = packsCopy.map((pack) => getCardFromPack(pack, author))

  return (
    <Container meta={{ title: `@${author.username}` }}>
      <header className="mt-0">
        <Header>
          <section className="m-auto sm:w-2/3">
            <div className="flex items-center">
              <Image
                width={80}
                height={80}
                alt={`${author.username} Profile`}
                className="rounded-full"
                src={`https://avatars.githubusercontent.com/u/${author.gitHubId}`}
              />
              <Heading className="font-inter pl-2" priority={1} size="4xl" bold>
                {author.username}
              </Heading>
            </div>

            <Paragraph className="font-inter mt-2">{author.bio}</Paragraph>
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
