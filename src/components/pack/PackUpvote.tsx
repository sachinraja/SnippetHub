import toast from 'react-hot-toast'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'
import CardUpvote from '@components/card/CardUpvote'
import { useCreatePackUpvoteMutation } from '@graphql/queries/create-pack-upvote.graphql'
import { numberWithCommas } from '@lib/utils/number'
import { useDeletePackUpvoteMutation } from '@graphql/queries/delete-pack-upvote.graphql'
import type { Pack } from '@prisma/client'

interface PackUpvoteProps {
  packId: Pack['id']
  upvotes: number
  upvoted: boolean
}
const PackUpvote = ({ packId, upvotes, upvoted }: PackUpvoteProps) => {
  const [session] = useSession()

  const [createPackUpvoteMutation] = useCreatePackUpvoteMutation({
    variables: {
      packId,
    },
  })

  const [deletePackUpvoteMutation] = useDeletePackUpvoteMutation({
    variables: {
      packId,
    },
  })

  const [upvoteCount, setUpvoteCount] = useState(upvotes)
  const [hasUpvoted, setHasUpvoted] = useState(upvoted)

  const createUpvote = useCallback(async () => {
    try {
      const { data } = await createPackUpvoteMutation()
      setHasUpvoted(true)

      if (!data?.createPackUpvote) return

      setUpvoteCount(data.createPackUpvote.upvotes)
    } catch {
      toast.error('There was an error upvoting this pack.')
    }
  }, [createPackUpvoteMutation])

  const deleteUpvote = useCallback(async () => {
    try {
      const { data } = await deletePackUpvoteMutation()
      setHasUpvoted(false)

      if (!data?.deletePackUpvote) return

      setUpvoteCount(data.deletePackUpvote.upvotes)
    } catch {
      toast.error('There was an error un-upvoting this pack.')
    }
  }, [deletePackUpvoteMutation])

  const [upvoteClickFunction, setUpvoteClickFunction] = useState(
    () => createUpvote,
  )

  useEffect(() => {
    setUpvoteClickFunction(hasUpvoted ? () => deleteUpvote : () => createUpvote)
  }, [hasUpvoted, createUpvote, deleteUpvote])

  const upvoteComponent = (
    <CardUpvote
      className="border-none"
      upvotes={numberWithCommas(upvoteCount)}
    />
  )

  return session ? (
    <button
      type="button"
      className={`rounded transition-colors duration-300 ${
        hasUpvoted ? 'bg-blue-900/75' : 'hover:bg-blue-900/75'
      }`}
      onClick={() => upvoteClickFunction()}
    >
      {upvoteComponent}
    </button>
  ) : (
    upvoteComponent
  )
}

export default PackUpvote
