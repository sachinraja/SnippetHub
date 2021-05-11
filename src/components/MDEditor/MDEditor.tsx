import { LanguageMode } from '@lib/language/mode'
import { forwardRef, useState } from 'react'
import CodeInput from '@components/FormInputs/CodeInput'
import Label from '@components/FormInputs/Label'
import Link from 'next/link'
import MDRenderer from '@components/MDRenderer/MDRenderer'
import Menu, { LeftAlign, RightAlign } from './Menu'
import MenuItem from './MenuItem'
import type { CodeInputProps } from '@components/FormInputs/CodeInput'
import type { SimpleIcon } from 'simple-icons'

const markdownIcon: SimpleIcon = require('simple-icons/icons/markdown')

type MDEditorProps = {
  className?: string
  value?: string
  required?: boolean
  name: string
} & CodeInputProps

const MDEditor = forwardRef<HTMLDivElement, MDEditorProps>(
  (
    { className, value, required, name, label, ...props }: MDEditorProps,
    ref,
  ) => {
    const [writing, setWriting] = useState(true)

    return (
      <div className={className}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {label && (
          <Label htmlFor={name} required={required}>
            {label}
          </Label>
        )}

        <div className="ring-1 ring-carbon-400 mt-2">
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
                    className="w-5 mr-2 h-full"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={markdownIcon.path} fill={markdownIcon.hex} />
                  </svg>
                </a>
              </Link>
            </RightAlign>
          </Menu>

          <CodeInput
            id={name}
            className={`${writing ? '' : 'hidden'}`}
            ref={ref}
            mode={LanguageMode.gfm}
            value={value}
            {...props}
          />

          <MDRenderer className={writing ? 'hidden' : 'block'}>
            {value ?? ''}
          </MDRenderer>
        </div>
      </div>
    )
  },
)

MDEditor.displayName = 'MDEditor'

MDEditor.defaultProps = {
  className: '',
  value: undefined,
  required: false,
}

export default MDEditor
