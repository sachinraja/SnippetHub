import { getAuthorFromParam, getPackFromParam } from '@lib/utils/url-params'
import { useUpdatePackMutation } from '@graphql/queries/update-pack.graphql'
import Container from '@components/Container/Container'
import PackFormLayout from '@layouts/PackFormLayout'
import type { AuthorPackProps, PackParams } from './pack'

export const getServerSideProps = async ({
  params,
}: {
  params: PackParams
}) => {
  const author = await getAuthorFromParam(params.author)
  if (!author) return { notFound: true }

  const pack = await getPackFromParam(author, params.pack)
  if (!pack) return { notFound: true }
  return {
    props: {
      pack,
    },
  }
}

const PackEditPage = ({ pack }: AuthorPackProps) => {
  const [updatePack] = useUpdatePackMutation()

  return (
    <Container meta={{ title: 'Edit a Pack' }}>
      <PackFormLayout
        heading="Edit a pack"
        subtitle="A pack can contain multiple snippets."
        defaultValues={{
          packName: pack.name,
          packShortDescription: pack.shortDescription,
          packLongDescription: pack.longDescription ?? '',
          snippets: pack.snippets,
        }}
        submitHandler={(data) => updatePack({ variables: data })}
      />
    </Container>
  )
}

export default PackEditPage
