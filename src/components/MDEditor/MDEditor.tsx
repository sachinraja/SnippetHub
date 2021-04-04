import { useState } from 'react'
import Link from 'next/link'
import MDRenderer from '@components/MDRenderer/MDRenderer'
import Menu, { LeftAlign, RightAlign } from './Menu'
import MenuItem from './MenuItem'
import TextAreaInput from '@components/FormInputs/TextAreaInput'
import type { SimpleIcon } from 'simple-icons'

const markdownIcon: SimpleIcon = require('simple-icons/icons/markdown')

interface MDEditorProps {
  className?: string
}

const MDEditor = ({ className }: MDEditorProps) => {
  const editorId = 'markdownDescription'

  const [value, setValue] = useState('')
  const [writing, setWriting] = useState(true)

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={editorId} className="text-lg">
        Description
      </label>

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
              <a className="h-full" target="_blank">
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

        <TextAreaInput
          style={{ height: 300 }}
          className={`h-full ${className} ${writing ? 'block' : 'hidden'}`}
          id={editorId}
          responsive={false}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />

        <MDRenderer className={writing ? 'hidden' : 'block'}>
          {value}
        </MDRenderer>
      </div>
    </div>
  )
}

MDEditor.defaultProps = {
  className: '',
}

export default MDEditor
