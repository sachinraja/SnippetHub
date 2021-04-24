import { CodeMirrorMode } from './mode'

const modeToImport = {
  [CodeMirrorMode.python]: () => import('codemirror/mode/python/python'),
  [CodeMirrorMode.javascript]: () =>
    import('codemirror/mode/javascript/javascript'),
  [CodeMirrorMode.typescript]: () =>
    import('codemirror/mode/javascript/javascript'),
  [CodeMirrorMode.csharp]: () => import('codemirror/mode/clike/clike'),
  [CodeMirrorMode.erlang]: () => import('codemirror/mode/erlang/erlang'),
  [CodeMirrorMode.xml]: () => import('codemirror/mode/xml/xml'),
  [CodeMirrorMode.css]: () => import('codemirror/mode/css/css'),
  [CodeMirrorMode.gfm]: () => import('codemirror/mode/gfm/gfm'),
}

function getImportFromMode(mode: CodeMirrorMode) {
  return modeToImport[mode]
}

export default getImportFromMode
