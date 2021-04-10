import {
  Language,
  useCreatePackMutation,
} from '@graphql/queries/create-pack.graphql'
import Container from '@components/Container/Container'
import Heading from '@components/Heading/Heading'
import MDEditor from '@components/MDEditor/MDEditor'
import Paragraph from '@components/Paragraph/Paragraph'
import SubmitInput from '@components/FormInputs/SubmitInput'
import TextInput from '@components/FormInputs/TextInput'

const NewPack = () => {
  const [createPack] = useCreatePackMutation({
    variables: {
      packName: 'e.js',
      packDescription: 'This is a test.',
      packLanguage: Language.Typescript,
      snippets: [
        {
          name: 'r/test',
          code: "import test from './test'",
          language: Language.Typescript,
        },
        {
          name: 'rea',
          code: "import b from './test'",
          language: Language.Elixir,
        },
      ],
    },
  })

  return (
    <Container className="m-auto w-2/3" meta={{ title: 'Create a New Pack' }}>
      <header className="mt-6">
        <Heading className="font-inter" priority={1} size={3}>
          Create a new snippet pack
        </Heading>
        <Paragraph size={4}>A pack can contain multiple snippets.</Paragraph>

        <hr className="my-5 bg-carbon-600" />
      </header>

      <form className="space-y-3">
        <TextInput id="name" label="Name" placeholder="Enter Name" required />

        <MDEditor className="w-full" />
        <hr className="bg-carbon-600" />

        <SubmitInput value="Create pack" />
        <input type="button" onClick={() => createPack()} value="Test" />
      </form>
    </Container>
  )
}

export default NewPack
