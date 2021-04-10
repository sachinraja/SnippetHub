import { Language } from '@prisma/client'
import languages from '@lib/language/language'

test('Typescript language name found.', () => {
  const languageData = languages[Language.typescript]
  expect(languageData.name).toBe('typescript')
})
