import UpvoteIcon from '@components/icons/UpvoteIcon'
import type { CardProps } from './Card'

interface CardUpvoteProps {
  className?: string
  upvotes: CardProps['upvotes']
}

const CardUpvote = ({ className, upvotes }: CardUpvoteProps) => (
  <div
    className={`inline-block rounded-sm border-blue-500 border-2 ${className}`}
  >
    <UpvoteIcon className="inline w-6" />

    <p className="inline mx-1 text-blue-400" aria-label="upvotes">
      {upvotes}
    </p>
  </div>
)

CardUpvote.defaultProps = {
  className: '',
}

export default CardUpvote
