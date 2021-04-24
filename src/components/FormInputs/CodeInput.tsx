import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { CodeMirrorMode } from '@lib/utils/codemirror/mode'
import { forwardRef, useEffect, useState } from 'react'
import Label from './Label'
import getImportFromMode from '@lib/utils/codemirror/get-import'
import resolveMode from '@lib/utils/codemirror/resolve-mode'
import type { CodeMirrorModeObject } from '@lib/utils/codemirror/mode'
import type { IUnControlledCodeMirror } from 'react-codemirror2'

type CodeInputProps = IUnControlledCodeMirror & {
  label?: string
  id?: string
  mode?: CodeMirrorModeObject
  required?: boolean
}

const CodeInput = forwardRef<CodeMirror, CodeInputProps>(
  (
    { label, className, id, mode, required, options, ...props }: CodeInputProps,
    ref,
  ) => {
    const [isModeImported, setisModeImported] = useState(false)

    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const resolvedMode = resolveMode(mode!)

    useEffect(() => {
      ;(async () => {
        setisModeImported(false)
        await getImportFromMode(resolvedMode)()
        setisModeImported(true)
      })()
    }, [resolvedMode])

    return (
      <div className={className}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        {isModeImported && (
          <CodeMirror
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
