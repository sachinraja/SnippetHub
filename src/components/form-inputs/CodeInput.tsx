import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from '@codemirror/basic-setup'
import { forwardRef, useEffect, useRef } from 'react'
import { oneDark } from '@codemirror/theme-one-dark'
import getImportFromMode from '@lib/utils/codemirror/get-import'
import { LanguageMode } from '@lib/language/mode'
import useMergeRefs from '@hooks/use-merge-refs'
import type { Extension } from '@codemirror/state'
import type { FocusEventHandler } from 'react'
import type { ViewUpdate } from '@codemirror/view'

export type CodeInputProps = {
  className?: string
  mode?: LanguageMode
  value?: string
  onUpdate?: (update: ViewUpdate) => void
  onBlur?: FocusEventHandler<HTMLDivElement>
}

const CodeInput = forwardRef<HTMLDivElement, CodeInputProps>(
  ({ className, mode, value, onUpdate, onBlur }, ref) => {
    const editor = useRef<HTMLDivElement>(null)
    const mergedRef = useMergeRefs(ref, editor)

    useEffect(() => {
      const currentEditor = editor.current
      if (!currentEditor) return undefined

      let view: EditorView | undefined
      ;(async () => {
        const extensions: Extension[] = [
          basicSetup,
          oneDark,
          EditorView.contentAttributes.of({ 'data-gramm_editor': 'false' }),
        ]

        if (mode) extensions.push(await getImportFromMode(mode))
        if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate))

        const state = EditorState.create({
          doc: value,
          extensions,
        })
        view = new EditorView({ state, parent: currentEditor })
      })()

      return () => view?.destroy()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, editor])

    return <div ref={mergedRef} onBlur={onBlur} className={className} />
  },
)

CodeInput.displayName = 'CodeInput'

CodeInput.defaultProps = {
  className: undefined,
  value: '',
  onUpdate: undefined,
  onBlur: undefined,
}

export default CodeInput
