import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Language, Snippet } from '@prisma/client'
import { PlusIcon, RefreshIcon, UserIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/client'
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
import PackUpvote from '@components/pack/PackUpvote'
import type { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async ({
  req,
  params,
}: {
  params: PackParams
} & GetServerSidePropsContext) => {
  const author = await getAuthorFromParam(params.author)
  if (!author) return { notFound: true }

  const session = await getSession({ req })

  const pack = await getPackFromParam(author, params.pack, session?.user.id)

  if (!pack) return { notFound: true }
  return {
    props: {
      author,
      pack,
      session,
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

  const [session] = useSession()

  const isAuthor = session?.user.id === author.id

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
                allowedToEdit={isAuthor}
              />

              <div className="inline-grid grid-cols-2 gap-x-4 text-gray-400">
                <Link href={`/@${author.username}`} prefetch={false}>
                  <a className="inline-flex items-center">
                    <UserIcon
                      className="text-carbon-200"
                      width={25}
                      aria-hidden
                    />

                    <Heading
                      priority={2}
                      size="lg"
                      aria-label="author username"
                    >
                      {author.username}
                    </Heading>
                  </a>
                </Link>

                <div className="inline-flex items-center">
                  <RefreshIcon
                    className="text-blue-300"
                    width={25}
                    aria-hidden
                  />
                  <Paragraph title="date updated">
                    {pack.updatedAt.toLocaleDateString()}
                  </Paragraph>
                </div>

                <div>
                  <PackUpvote
                    packId={pack.id}
                    upvotes={pack.upvotes}
                    upvoted={pack.upvoted}
                  />
                </div>
              </div>

              <PackShortDescription
                packId={pack.id}
                packShortDescription={packShortDescription}
                setPackShortDescription={setPackShortDescription}
                allowedToEdit={isAuthor}
              />
            </section>
          </Header>
        </header>

        <main className="mx-4 mb-16">
          <PackLongDescription
            packId={pack.id}
            packLongDescription={packLongDescription}
            setPackLongDescription={setPackLongDescription}
            allowedToEdit={isAuthor}
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
                    allowedToEdit={isAuthor}
                  />

                  <PackSnippetCode
                    snippet={snippets[index]}
                    index={index}
                    snippets={snippets}
                    setSnippets={setSnippets}
                    allowedToEdit={isAuthor}
                  />
                </article>
              )
            })}

            {isAuthor &&
              (isCreatingSnippet ? (
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
              ))}
          </div>
        </main>
      </FormProvider>
    </Container>
  )
}

export default PackPage
