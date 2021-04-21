import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { forwardRef, useEffect, useState } from 'react'
import CodeMirrorMode from '@lib/utils/codemirror/mode'
import Label from './Label'
import getImportFromMode from '@lib/utils/codemirror/get-import'
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
    const [modeImported, setModeImported] = useState(false)

    let resolvedMode: CodeMirrorMode
    if (typeof mode === 'object') {
      resolvedMode = mode.name
    } else {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      resolvedMode = mode!
    }

    useEffect(() => {
      setModeImported(false)
      async function importMode() {
        await getImportFromMode(resolvedMode)()
        setModeImported(true)
      }

      importMode()
    }, [resolvedMode])

    return (
      <div className={className}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        {modeImported && (
          <CodeMirror
            // @ts-expect-error Legacy ref
            ref={ref}
            options={{
              mode: resolvedMode,
              theme: 'material-darker',
              lineNumbers: true,
              ...options,
            }}
            {...props}
          />
        )}
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
