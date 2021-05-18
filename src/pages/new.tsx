import { Language } from '@prisma/client'
import { useCreatePackMutation } from '@graphql/queries/create-pack.graphql'
import Container from '@components/containers/Container'
import PackFormLayout from '@layouts/PackFormLayout'

const NewPack = () => {
  const [createPack] = useCreatePackMutation()

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
        submitHandler={(data) => createPack({ variables: data })}
      />
    </Container>
  )
}

export default NewPack
