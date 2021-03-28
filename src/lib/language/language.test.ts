import { enum_Snippet_language } from '@prisma/client'
import languages from '@lib/language/language'

test('Typescript language name found.', () => {
  const languageData = languages[enum_Snippet_language.typescript]
  expect(languageData.name).toBe('typescript')
})
