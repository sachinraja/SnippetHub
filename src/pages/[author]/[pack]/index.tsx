import * as Yup from 'yup'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Language, Snippet } from '@prisma/client'
import { PlusIcon } from '@heroicons/react/outline'
import { SnippetInput } from '@graphql/queries/create-snippet.graphql'
import { getAuthorFromParam, getPackFromParam } from '@lib/utils/url-params'
import { packFormSchema, snippet } from '@lib/schemas/pack-schema'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import Container from '@components/Container/Container'
import CreateSnippet from '@components/Pack/CreateSnippet'
import Header from '@components/Header/Header'
import Heading from '@components/Heading/Heading'
import PackLongDescription from '@components/Pack/PackLongDescription'
import PackName from '@components/Pack/PackName'
import PackShortDescription from '@components/Pack/PackShortDescription'
import PackSnippetCode from '@components/Pack/PackSnippetCode'
import PackSnippetName from '@components/Pack/PackSnippetName'
import type { AuthorPackProps, PackParams } from './pack'
import type { PackFormInputs } from '@lib/schemas/pack-schema'

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
      author,
      pack,
    },
  }
}

export type PackEditFormInputs = PackFormInputs & { newSnippet: SnippetInput }

const packEditFormSchema = packFormSchema.concat(
  // @ts-expect-error yup is not typed well here
  Yup.object({
    newSnippet: snippet,
  }),
)

const PackPage = ({ author, pack }: AuthorPackProps) => {
  const [packName, setPackName] = useState(pack.name)
  const [packShortDescription, setPackShortDescription] = useState(
    pack.shortDescription,
  )
  const [packLongDescription, setPackLongDescription] = useState(
    pack.longDescription ?? '',
  )

  function sortSnippets(snippets: Snippet[]) {
    return snippets.sort((a, b) => a.name.localeCompare(b.name))
  }

  const [snippets, setSnippets] = useState<Snippet[]>(
    sortSnippets(pack.snippets),
  )

  const [isCreatingSnippet, setIsCreatingSnippet] = useState(false)

  const methods = useForm<PackEditFormInputs>({
    resolver: yupResolver(packEditFormSchema),
    mode: 'onBlur',
    defaultValues: {
      packName,
      packShortDescription,
      packLongDescription,
      snippets,
      newSnippet: {
        language: Language.javascript,
      },
    },
  })

  const snippetMethods = useFieldArray({
    control: methods.control,
    name: 'snippets',
  })

  const { fields: snippetFields } = snippetMethods

  return (
    <Container meta={{ title: `@${author.username}/${packName}` }}>
      <FormProvider {...methods}>
        <header className="mt-0">
          <Header>
            <section className="m-auto sm:w-2/3">
              <PackName
                packId={pack.id}
                packName={packName}
                setPackName={setPackName}
              />

              <PackShortDescription
                packId={pack.id}
                packShortDescription={packShortDescription}
                setPackShortDescription={setPackShortDescription}
              />
            </section>
          </Header>
        </header>

        <main className="mx-4 mt-2 mb-16">
          <PackLongDescription
            packId={pack.id}
            packLongDescription={packLongDescription}
            setPackLongDescription={setPackLongDescription}
          />

          <div className="m-auto mt-5 w-3/4">
            <Heading className="mb-3" priority={2} size={4} bold>
              Snippets
            </Heading>
            {snippetFields.map((field, index) => {
              return (
                <article key={field.id}>
                  <PackSnippetName
                    snippet={snippets[index]}
                    index={index}
                    methods={snippetMethods}
                    snippets={snippets}
                    setSnippets={setSnippets}
                  />

                  <PackSnippetCode
                    snippet={snippets[index]}
                    index={index}
                    snippets={snippets}
                    setSnippets={setSnippets}
                  />
                </article>
              )
            })}

            {isCreatingSnippet ? (
              <CreateSnippet
                packId={pack.id}
                methods={snippetMethods}
                snippets={snippets}
                setSnippets={setSnippets}
                setIsCreatingSnippet={setIsCreatingSnippet}
              />
            ) : (
              <button
                type="button"
                aria-label="Add a snippet"
                onClick={() => {
                  setIsCreatingSnippet(true)
                }}
              >
                <PlusIcon width={35} />
              </button>
            )}
          </div>
        </main>
      </FormProvider>
    </Container>
  )
}

export default PackPage
