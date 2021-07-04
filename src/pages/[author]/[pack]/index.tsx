import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Language, Snippet } from '@prisma/client'
import { PlusIcon, RefreshIcon, UserIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { getAuthorFromParam, getPackFromParam } from '@lib/utils/url-params'
import {
  PackEditFormInputs,
  packEditFormSchema,
} from '@lib/schemas/pack-edit-schema'
import Container from '@components/containers/Container'
import CreateSnippet from '@components/pack/CreateSnippet'
import Header from '@components/header/Header'
import Heading from '@components/Heading'
import PackLongDescription from '@components/pack/PackLongDescription'
import PackName from '@components/pack/PackName'
import PackShortDescription from '@components/pack/PackShortDescription'
import PackSnippetCode from '@components/pack/PackSnippetCode'
import PackSnippetName from '@components/pack/PackSnippetName'
import Paragraph from '@components/Paragraph'

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

              <div className="text-gray-400 my-2">
                <Link href={`/@${author.username}`} prefetch={false}>
                  <a className="inline-flex items-center">
                    <UserIcon width={25} aria-label="author icon" />

                    <Heading
                      priority={2}
                      size="lg"
                      aria-label="author username"
                    >
                      {author.username}
                    </Heading>
                  </a>
                </Link>

                <div className="inline-flex items-center ml-4">
                  <RefreshIcon width={25} />
                  <Paragraph>{pack.updatedAt.toLocaleDateString()}</Paragraph>
                </div>
              </div>

              <PackShortDescription
                packId={pack.id}
                packShortDescription={packShortDescription}
                setPackShortDescription={setPackShortDescription}
              />
            </section>
          </Header>
        </header>

        <main className="mx-4 mb-16">
          <PackLongDescription
            packId={pack.id}
            packLongDescription={packLongDescription}
            setPackLongDescription={setPackLongDescription}
          />

          <div className="m-auto mt-5 w-3/4">
            <Heading className="mb-3" priority={2} size="4xl" bold>
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
