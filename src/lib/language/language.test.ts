import { Language } from '@prisma/client'
import languages from '@lib/language'

describe('Typescript language', () => {
  const languageData = languages[Language.typescript]

  it('has the correct name', () => {
    expect(languageData.name).toBe('typescript')
  })
})
