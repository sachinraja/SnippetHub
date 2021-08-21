import { useEffect, useState } from 'react'
import { Language } from '@prisma/client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/client'
import { useCreatePackMutation } from '@graphql/queries/create-pack.graphql'
import Container from '@components/containers/Container'
import PackFormLayout from '@layouts/PackFormLayout'
import { useGetUserPackCountLazyQuery } from '@graphql/queries/get-user-pack-count.graphql'
import ErrorPageLayout from '@layouts/ErrorPageLayout'

const NewPack = () => {
  const [createPack] = useCreatePackMutation()
  const [session, sessionLoading] = useSession()
  const router = useRouter()

  const [
    getUserPackCount,
    { data: userPackCountData, loading: getUserPackCountLoading },
  ] = useGetUserPackCountLazyQuery()

  const [isOverPackLimit, setIsOverPackLimit] = useState(false)

  useEffect(() => {
    if (sessionLoading || !session) return

    getUserPackCount({
      variables: { id: session.user.id },
    })
  }, [getUserPackCount, sessionLoading, session])

  useEffect(() => {
    if (
      sessionLoading ||
      getUserPackCountLoading ||
      !userPackCountData?.getUserPackCount
    )
      return

    if (userPackCountData.getUserPackCount.count >= 20) setIsOverPackLimit(true)
  }, [sessionLoading, getUserPackCountLoading, userPackCountData])

  return !isOverPackLimit ? (
    <Container meta={{ title: 'Create a New Pack' }}>
      <PackFormLayout
        heading="Create a new snippet pack"
        subtitle="A pack can contain multiple snippets."
        defaultValues={{
          snippets: [
            {
              name: '',
              code: '',
              language: Language.javascript,
            },
          ],
        }}
        submitHandler={async (data) => {
          try {
            await createPack({ variables: data })

            const username = session?.user.username

            router.push(
              {
                pathname: '/[author]/[pack]',
                query: {
                  author: `@${username}`,
                  pack: data.name,
                },
              },
              `/@${username}/${data.name}`,
            )
          } catch {
            toast.error('There was an error creating your pack.')
          }
        }}
      />
    </Container>
  ) : (
    <ErrorPageLayout title="Over Pack Limit (20)" />
  )
}

export default NewPack
