import { Language } from '@prisma/client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/client'
import { useCreatePackMutation } from '@graphql/queries/create-pack.graphql'
import Container from '@components/containers/Container'
import PackFormLayout from '@layouts/PackFormLayout'

const NewPack = () => {
  const [createPack] = useCreatePackMutation()
  const [session] = useSession()
  const router = useRouter()

  return (
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
  )
}

export default NewPack
