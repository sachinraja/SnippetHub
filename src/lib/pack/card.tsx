import { numberWithCommas } from '@lib/utils/number'
import Card from '@components/Card/Card'
import type { enum_Pack_language } from '.prisma/client'

interface PackCard {
  description: string
  id: number
  language: enum_Pack_language
  name: string
  upvotes: number
}

export default function getCardFromPack(
  pack: PackCard,
  author: { gitHubId: number; username: string },
) {
  const { gitHubId, username } = author
  const count = numberWithCommas(pack.upvotes)
  return (
    <Card
      key={pack.id}
      bodyUrl={`/@${username}/${pack.name}`}
      count={count}
      description={pack.description}
      imageUrl={`https://avatars.githubusercontent.com/u/${gitHubId}`}
      language={pack.language}
      subtitle={username}
      title={pack.name}
    />
  )
}
