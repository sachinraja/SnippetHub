import languages from '@lib/language'
import type { Language } from '@prisma/client'

function getLanguageMode(language: Language) {
  return languages[language].mode
}

export default getLanguageMode
