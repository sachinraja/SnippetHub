import Card, { CardProps } from '@components/Card/Card';
import CardContainer from '@components/CardContainer/CardContainer';
import Heading from '@components/Heading/Heading';
import Hero from '@components/Hero/Hero';
import Paragraph from '@components/Paragraph/Paragraph';
import getTopSnippets from '@lib/snippet/top';
import { numberWithCommas } from '@lib/utils/number';
import type { InferGetStaticPropsType } from 'next';
import type { ReactElement } from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      topSnippets: await getTopSnippets(10),
    },
    revalidate: 30,
  };
};

const HomePage = ({
  topSnippets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // create components for top snippets
  const cards = topSnippets.map(
    (snippet): ReactElement<CardProps> => {
      const { username, gitHubId } = snippet.author;
      const count = numberWithCommas(snippet.upvotes);
      return (
        <Card
          key={snippet.id}
          title={snippet.title}
          subtitle={username}
          count={count}
          description={snippet.description}
          language={snippet.language}
          imageUrl={`https://avatars.githubusercontent.com/u/${gitHubId}`}
        />
      );
    },
  );

  return (
    <>
      <Hero />
      <header className="flex mx-4">
        <div className="h-14">
          <svg
            className="w-auto h-full text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>

        <div>
          <Heading
            className="capitalize font-inter text-xl"
            priority={2}
            size={2}
            bold
            center={false}
          >
            Most Popular Snippets
          </Heading>
          <Paragraph>The snippets with the most votes.</Paragraph>
        </div>
      </header>

      <main className="mx-4 mt-2 mb-16">
        <CardContainer>{cards}</CardContainer>
      </main>
    </>
  );
};

export default HomePage;
