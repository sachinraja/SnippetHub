import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from '@codemirror/basic-setup'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { oneDark } from '@codemirror/theme-one-dark'
import getImportFromMode from '@lib/utils/codemirror/get-import'
import { LanguageMode } from '@lib/language/mode'
import Label from './Label'
import type { Extension } from '@codemirror/state'
import type { FocusEventHandler } from 'react'
import type { ViewUpdate } from '@codemirror/view'

export type CodeInputProps = {
  label?: string
  id?: string
  className?: string
  mode?: LanguageMode
  required?: boolean
  value?: string
  onUpdate?: (update: ViewUpdate) => void
  onBlur?: FocusEventHandler<HTMLDivElement>
}

const CodeInput = forwardRef<HTMLDivElement, CodeInputProps>(
  ({ label, className, id, mode, required, value, onUpdate, onBlur }, ref) => {
    const editor = useRef<HTMLDivElement>(null)
    const [, setEditorView] = useState<EditorView | null>(null)

    useEffect(() => {
      const currentEditor = editor.current
      if (!currentEditor) return undefined

      let view: EditorView
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
        setEditorView(view)
      })()

      return () => view.destroy()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, editor, onUpdate])

    // useEffect(() => {
    //   if (!editorView) return
    //   console.log('transaction useeffect')
    //   const transaction = editorView.state.update({
    //     changes: {
    //       from: 0,
    //       to: editorView.state.doc.length,
    //       insert: value,
    //     },
    //   })
    //   editorView.dispatch(transaction)
    // }, [editorView, value])

    return (
      <div ref={ref} className={className}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        <div ref={editor} onBlur={onBlur} />
      </div>
    )
  },
)

CodeInput.displayName = 'CodeInput'

CodeInput.defaultProps = {
  label: undefined,
  id: undefined,
  className: undefined,
  required: false,
  value: '',
  onUpdate: undefined,
  onBlur: undefined,
}

export default CodeInput
