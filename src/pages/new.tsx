import { Language } from '@graphql/queries/create-pack.graphql'
import Container from '@components/Container/Container'
import PackFormLayout from '@layouts/PackFormLayout'

const NewPack = () => {
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
              language: Language.Javascript,
            },
          ],
        }}
      />
    </Container>
  )
}

export default NewPack
