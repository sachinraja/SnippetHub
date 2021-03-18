import { CardProps } from '@components/Card/Card';
import CardContainer from '@components/CardContainer/CardContainer';
import Heading from '@components/Heading/Heading';
import Hero from '@components/Hero/Hero';
import Paragraph from '@components/Paragraph/Paragraph';
import getCardFromSnippet from '@lib/snippet/card';
import getTopSnippets from '@lib/snippet/top';
import type { InferGetStaticPropsType } from 'next';
import type { ReactElement } from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      topSnippets: await getTopSnippets(20),
    },
    revalidate: 120,
  };
};

const HomePage = ({
  topSnippets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // create components for top snippets
  const cards = topSnippets.map(
    (snippet): ReactElement<CardProps> =>
      getCardFromSnippet(snippet, snippet.author),
  );

  return (
    <>
      <Hero />
      <header className="flex mx-4">
        <div className="h-14">
          <svg
            className="h-full text-blue-600 motion-safe:animate-bounce"
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
          <Paragraph size={3}>The snippets with the most votes.</Paragraph>
        </div>
      </header>

      <main className="mx-4 mt-2 mb-16">
        <CardContainer>{cards}</CardContainer>
      </main>
    </>
  );
};

export default HomePage;
