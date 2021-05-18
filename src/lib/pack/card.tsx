import { numberWithCommas } from '@lib/utils/number'
import Card from '@components/card/Card'
import type { CardProps } from '@components/card/Card'
import type { Language } from '@prisma/client'
import type { ReactElement } from 'react'

interface PackCard {
  shortDescription: string
  id: number
  language: Language
  name: string
  upvotes: number
}

export default function getCardFromPack(
  pack: PackCard,
  { gitHubId, username }: { gitHubId: number; username: string },
): ReactElement<CardProps> {
  const count = numberWithCommas(pack.upvotes)
  return (
    <Card
      key={pack.id}
      bodyUrl={`/@${username}/${pack.name}`}
      count={count}
      description={pack.shortDescription}
      imageUrl={`https://avatars.githubusercontent.com/u/${gitHubId}`}
      language={pack.language}
      subtitle={username}
      title={pack.name}
    />
  )
}
