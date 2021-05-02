import { getAuthorFromParam, getPackFromParam } from '@lib/utils/url-params'
import CodeBlock from '@components/CodeBlock/CodeBlock'
import Container from '@components/Container/Container'
import Header from '@components/Header/Header'
import Heading from '@components/Heading/Heading'
import MDRenderer from '@components/MDRenderer/MDRenderer'
import Paragraph from '@components/Paragraph/Paragraph'
import languages from '@lib/language'
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
      author,
      pack,
    },
  }
}

const PackPage = ({ author, pack }: AuthorPackProps) => {
  return (
    <Container meta={{ title: `@${author.username}/${pack.name}` }}>
      <header className="mt-0">
        <Header>
          <section className="m-auto sm:w-2/3">
            <Heading className="font-inter" priority={1} size={4} bold>
              {pack.name}
            </Heading>

            <Paragraph className="font-inter mt-2" size={4}>
              {pack.shortDescription}
            </Paragraph>
          </section>
        </Header>
      </header>

      <main className="mx-4 mt-2 mb-16">
        {pack.longDescription && (
          <MDRenderer className="w-3/4 m-auto">
            {pack.longDescription}
          </MDRenderer>
        )}
        <div className="m-auto mt-5 w-3/4">
          <Heading className="mb-3" priority={2} size={4} bold>
            Snippets
          </Heading>
          {pack.snippets.map((snippet) => (
            <article key={snippet.id}>
              <Heading priority={3} size={3}>
                {snippet.name}
              </Heading>

              <CodeBlock
                language={languages[snippet.language].mode}
                value={snippet.code}
              />
            </article>
          ))}
        </div>
      </main>
    </Container>
  )
}

export default PackPage
