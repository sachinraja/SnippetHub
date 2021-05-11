import { Language } from '@prisma/client'

function getLanguageFromSnippets(snippets: { language: Language }[]) {
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

export default getLanguageFromSnippets
