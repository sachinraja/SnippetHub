import Card from '@components/Card/Card';
import { numberWithCommas } from '@lib/utils/number';
import type { enum_Snippet_language } from '.prisma/client';

interface SnippetCard {
  id: number;
  title: string;
  description: string;
  language: enum_Snippet_language;
  upvotes: number;
}

export default function getCardFromSnippet(
  snippet: SnippetCard,
  author: { username: string; gitHubId: number },
) {
  const { username, gitHubId } = author;
  const count = numberWithCommas(snippet.upvotes);
  return (
    <Card
      key={snippet.id}
      title={snippet.title}
      subtitle={username}
      bodyUrl="/login"
      count={count}
      description={snippet.description}
      language={snippet.language}
      imageUrl={`https://avatars.githubusercontent.com/u/${gitHubId}`}
    />
  );
}
