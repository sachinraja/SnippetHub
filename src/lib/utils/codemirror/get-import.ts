import { StreamLanguage } from '@codemirror/stream-parser'
import { markdownLanguage } from '@codemirror/lang-markdown'
import { LanguageMode } from '@lib/language/mode'

const modeToImport = {
  [LanguageMode.python]: async () =>
    (await import('@codemirror/lang-python')).python(),
  [LanguageMode.javascript]: async () =>
    (await import('@codemirror/lang-javascript')).javascript(),
  [LanguageMode.typescript]: async () =>
    (await import('@codemirror/lang-javascript')).javascript({
      typescript: true,
    }),
  [LanguageMode.csharp]: async () =>
    StreamLanguage.define(
      (await import('@codemirror/legacy-modes/mode/clike')).csharp,
    ),
  [LanguageMode.elixir]: async () =>
    // @ts-expect-error these are compatible
    StreamLanguage.define((await import('codemirror-lang-elixir')).elixir),
  [LanguageMode.html]: async () =>
    (await import('@codemirror/lang-html')).html(),
  [LanguageMode.css]: async () => (await import('@codemirror/lang-css')).css(),
  [LanguageMode.markdown]: async () =>
    (await import('@codemirror/lang-markdown')).markdown(),
  [LanguageMode.gfm]: async () =>
    (await import('@codemirror/lang-markdown')).markdown({
      base: markdownLanguage,
    }),
}

async function getImportFromMode(mode: LanguageMode) {
  return modeToImport[mode]()
}

export default getImportFromMode
