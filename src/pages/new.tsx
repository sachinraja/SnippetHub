import Container from '@components/Container/Container'
import Heading from '@components/Heading/Heading'
import NewPackForm from '@components/Forms/NewPackForm'
import Paragraph from '@components/Paragraph/Paragraph'

const NewPack = () => {
  return (
    <Container
      className="mx-4 mt-2 mb-16"
      meta={{ title: 'Create a New Pack' }}
    >
      <div className="m-auto w-2/3">
        <header className="mt-6">
          <Heading className="font-inter" priority={1} size={3}>
            Create a new snippet pack
          </Heading>
          <Paragraph size={4}>A pack can contain multiple snippets.</Paragraph>

          <hr className="my-5 bg-carbon-600" />
        </header>

        <NewPackForm />
      </div>
    </Container>
  )
}

export default NewPack
