import { getAuthorFromParam, getPackFromParam } from '@lib/utils/url-params'
import Container from '@components/Container/Container'
import getCardFromPack from '@lib/pack/card'
import type { ThenArg } from 'src/types'

export const getServerSideProps = async ({
  params,
}: {
  params: {
    author: string
    pack: string
  }
}) => {
  const author = await getAuthorFromParam(params.author)
  if (!author) return { notFound: true }

  const pack = await getPackFromParam(author, params.pack)
  if (!pack) return { notFound: true }
  return {
    props: {
      author,
      pack,
    },
  }
}

const PackPage = ({
  author,
  pack,
}: {
  author: Exclude<ThenArg<ReturnType<typeof getAuthorFromParam>>, null>
  pack: Exclude<ThenArg<ReturnType<typeof getPackFromParam>>, null>
}) => {
  return (
    <Container meta={{ title: `@${author.username}/${pack.name}` }}>
      {getCardFromPack(pack, author)}
    </Container>
  )
}

export default PackPage
