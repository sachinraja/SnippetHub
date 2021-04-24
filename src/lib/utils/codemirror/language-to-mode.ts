import languages from '@lib/language/language'
import type { Language } from '@prisma/client'

function languageToMode(language: Language) {
  return languages[language].codeMirrorMode
}

export default languageToMode
