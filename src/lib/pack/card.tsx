import { numberWithCommas } from '@lib/utils/number'
import Card from '@components/card/Card'
import type { Pack, User } from '@prisma/client'
import type { ReactElement } from 'react'
import type { CardProps } from '@components/card/Card'

export type GetCardFromPackPackArg = Pick<
  Pack,
  'shortDescription' | 'id' | 'language' | 'name' | 'upvotes'
>

export default function getCardFromPack(
  pack: GetCardFromPackPackArg,
  author: Pick<User, 'username'> & { image?: string },
): ReactElement<CardProps> {
  const upvotesWithCommas = numberWithCommas(pack.upvotes)
  return (
    <Card
      key={pack.id}
      bodyUrl={`/@${author.username}/${pack.name}`}
      upvotes={upvotesWithCommas}
      description={pack.shortDescription}
      imageUrl={author.image ?? undefined}
      language={pack.language}
      subtitle={author.username}
      title={pack.name}
    />
  )
}
