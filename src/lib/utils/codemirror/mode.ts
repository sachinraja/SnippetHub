export enum CodeMirrorMode {
  python = 'python',
  javascript = 'javascript',
  typescript = 'text/typescript',
  csharp = 'text/x-csharp',
  erlang = 'erlang',
  xml = 'xml',
  css = 'css',
  gfm = 'gfm',
}

export type CodeMirrorModeObject =
  | CodeMirrorMode
  | (Record<string, unknown> & { name: CodeMirrorMode })
