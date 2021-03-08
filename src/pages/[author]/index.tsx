import type { GetStaticPaths, InferGetStaticPropsType } from 'next';

export const getStaticProps = async ({
  params,
}: {
  params: { author: string };
}) => {
  return {
    props: {
      author: params.author,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { author: '@xCloudzx' } }],
    fallback: true,
  };
};

const AuthorPage = ({
  author,
}: InferGetStaticPropsType<typeof getStaticProps>) => <main>{author}</main>;

export default AuthorPage;
