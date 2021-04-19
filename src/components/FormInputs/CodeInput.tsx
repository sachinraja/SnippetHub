import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { forwardRef, useEffect } from 'react'
import CodeMirrorMode from '@lib/utils/codemirror/mode'
import Label from './Label'
import type { IUnControlledCodeMirror } from 'react-codemirror2'

type CodeInputProps = IUnControlledCodeMirror & {
  label?: string
  id?: string
  mode?: CodeMirrorMode | (Record<string, unknown> & { name: CodeMirrorMode })
  required?: boolean
}

const CodeInput = forwardRef(
  (
    { label, className, id, mode, required, options, ...props }: CodeInputProps,
    ref,
  ) => {
    let resolvedMode: CodeMirrorMode
    if (typeof mode === 'object') {
      resolvedMode = mode.name
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      resolvedMode = mode!
    }

    useEffect(() => {
      async function asyncImport() {
        ;(await import('@lib/utils/codemirror/get-import')).default(
          resolvedMode,
        )()
      }

      asyncImport()
    }, [resolvedMode])

    return (
      <div className={className}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        <CodeMirror
          // @ts-expect-error Legacy ref
          ref={ref}
          options={{
            mode,
            theme: 'material-darker',
            lineNumbers: true,
            ...options,
          }}
          {...props}
        />
      </div>
    )
  },
)

CodeInput.displayName = 'CodeInput'

CodeInput.defaultProps = {
  label: undefined,
  id: undefined,
  mode: CodeMirrorMode.javascript,
  required: false,
}

export default CodeInput
