import { Language } from '@prisma/client'
import prisma from '@lib/prisma'
import type { Snippet } from '@prisma/client'

export function getLanguageFromSnippets(snippets: { language: Language }[]) {
  const languageCounts = snippets.reduce((accu, snippet) => {
    if (!accu[snippet.language]) {
      accu[snippet.language] = 0
    }

    accu[snippet.language] += 1
    return accu
  }, {} as Record<Language, number>)

  const language = Object.entries(languageCounts).sort(
    ([, count1], [, count2]) => count2 - count1,
  )[0][0] as Language

  return language
}

export async function updatePackLanguage(
  snippets: Snippet[],
  packId: number,
  packLanguage?: Language,
) {
  const language = getLanguageFromSnippets(snippets)
  // do not update if the language is already the same
  if (packLanguage === language) return null

  return prisma.pack.update({
    where: { id: packId },
    data: {
      language: getLanguageFromSnippets(snippets),
    },
  })
}
