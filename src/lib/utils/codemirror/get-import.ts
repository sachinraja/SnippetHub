import CodeMirrorMode from './mode'

const modeToImport: Record<CodeMirrorMode, () => Promise<unknown>> = {
  // @ts-expect-error Mode import not typed.
  [CodeMirrorMode.python]: () => import('codemirror/mode/python/python'),
  [CodeMirrorMode.javascript]: () =>
    // @ts-expect-error Mode import not typed.
    import('codemirror/mode/javascript/javascript'),
  // @ts-expect-error Mode import not typed.
  [CodeMirrorMode.csharp]: () => import('codemirror/mode/clike/clike'),
  // @ts-expect-error Mode import not typed.
  [CodeMirrorMode.erlang]: () => import('codemirror/mode/erlang/erlang'),
  // @ts-expect-error Mode import not typed.
  [CodeMirrorMode.xml]: () => import('codemirror/mode/xml/xml'),
  // @ts-expect-error Mode import not typed.
  [CodeMirrorMode.css]: () => import('codemirror/mode/css/css'),
  // @ts-expect-error Mode import not typed.
  [CodeMirrorMode.gfm]: () => import('codemirror/mode/gfm/gfm'),
}

function getImportFromMode(mode: CodeMirrorMode) {
  return modeToImport[mode]
}

export default getImportFromMode
