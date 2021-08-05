import { ChevronUpIcon } from '@heroicons/react/outline'
import type { ComponentProps } from 'react'

const UpvoteIcon = ({ className, ...props }: ComponentProps<'svg'>) => (
  <ChevronUpIcon
    className={`text-blue-600 ${className}`}
    width={35}
    aria-hidden
    {...props}
  />
)

export default UpvoteIcon
