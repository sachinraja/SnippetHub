import { forwardRef, useState } from 'react'
import Link from 'next/link'
import markdownIcon from 'simple-icons/icons/markdown'
import { LanguageMode } from '@lib/language/mode'
import CodeInput from '@components/form-inputs/CodeInput'
import MDRenderer from '@components/md-renderer/MDRenderer'
import Menu, { LeftAlign, RightAlign } from './Menu'
import MenuItem from './MenuItem'
import type { CodeInputProps } from '@components/form-inputs/CodeInput'

export type MDEditorProps = {
  className?: string
  value?: string
} & CodeInputProps

const MDEditor = forwardRef<HTMLDivElement, MDEditorProps>(
  ({ className, value, ...props }: MDEditorProps, ref) => {
    const [writing, setWriting] = useState(true)

    return (
      <div className={className}>
        <div className="mt-2 ring-1 ring-carbon-400">
          <Menu>
            <LeftAlign>
              <MenuItem
                className={writing ? 'bg-carbon-900' : ''}
                onClick={() => setWriting(true)}
              >
                Write
              </MenuItem>
              <MenuItem
                className={writing ? '' : 'bg-carbon-900'}
                onClick={() => setWriting(false)}
              >
                Preview
              </MenuItem>
            </LeftAlign>

            <RightAlign>
              <Link href="https://github.github.com/gfm/">
                <a className="h-full" target="_blank" rel="noopener noreferrer">
                  <svg
                    className="mr-2 w-5 h-full"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={markdownIcon.path} fill={markdownIcon.hex} />
                  </svg>
                </a>
              </Link>
            </RightAlign>
          </Menu>

          {writing ? (
            <CodeInput
              ref={ref}
              mode={LanguageMode.gfm}
              value={value}
              {...props}
            />
          ) : (
            <MDRenderer>{value ?? ''}</MDRenderer>
          )}
        </div>
      </div>
    )
  },
)

MDEditor.displayName = 'MDEditor'

MDEditor.defaultProps = {
  className: '',
  value: undefined,
}

export default MDEditor
