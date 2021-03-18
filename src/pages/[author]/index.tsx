import { CardProps } from '@components/Card/Card';
import CardContainer from '@components/CardContainer/CardContainer';
import Header from '@components/Header/Header';
import Heading from '@components/Heading/Heading';
import Paragraph from '@components/Paragraph/Paragraph';
import getCardFromSnippet from '@lib/snippet/card';
import { getUser, getUserSnippets } from '@lib/user';
import type { GetStaticPaths } from 'next';
import { ReactElement } from 'react';

export const getStaticProps = async ({
  params,
}: {
  params: { author: string };
}) => {
  // return 404 if the route is not prefixed with @ (signifying a user)
  if (!params.author.startsWith('@')) {
    return { notFound: true };
  }

  const username = params.author.slice(1);

  const user = await getUser(username);

  if (!user) {
    return { notFound: true };
  }

  const snippets = await getUserSnippets(user.id, {
    take: 20,
    orderBy: 'desc',
  });

  return {
    props: {
      author: user,
      snippets,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { author: '@xCloudzx' } }],
    // nextjs passes empty props if fallback is true and page is on first render
    // blocking works like SSR, but caches the page
    fallback: 'blocking',
  };
};

const AuthorPage = ({
  author,
  snippets,
}: {
  author: Exclude<ThenArg<ReturnType<typeof getUser>>, null>;
  snippets: ThenArg<ReturnType<typeof getUserSnippets>>;
}) => {
  // must copy to keep state of arguments
  const snippetsCopy = [...snippets];
  const cards = snippetsCopy.map(
    (snippet): ReactElement<CardProps> => getCardFromSnippet(snippet, author),
  );

  return (
    <>
      <header className="mt-0">
        <Header>
          <section className="m-auto sm:w-2/3">
            <img
              className="inline-block rounded-full w-12 sm:w-20"
              src={`https://avatars.githubusercontent.com/u/${author.gitHubId}`}
              alt={`${author.username} Profile`}
            />
            <Heading
              className="inline font-inter pl-2 align-middle"
              priority={1}
              size={4}
              bold
              center={false}
            >
              {author.username}
            </Heading>

            <Paragraph className="font-inter mt-2" size={4}>
              {snippets[0].description}
            </Paragraph>
          </section>
        </Header>
      </header>
      <main className="mx-4 mt-2 mb-16">
        <CardContainer>{cards}</CardContainer>
      </main>
    </>
  );
};

export default AuthorPage;
