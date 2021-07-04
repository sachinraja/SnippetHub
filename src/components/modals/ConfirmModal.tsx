import { Dialog } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import Heading from '@components/Heading'
import type { HeadingProps } from '@components/Heading'

type ConfirmModalProps = ExtractProps<typeof Dialog> & {
  heading: HeadingProps['children']
  headingPriority: HeadingProps['priority']
  children: ReactNode
}

const ConfirmModal = ({
  className,
  heading,
  headingPriority,
  children,
  ...props
}: ConfirmModalProps) => (
  <Dialog
    as="div"
    className={`fixed z-10 inset-0 overflow-y-auto ${className}`}
    {...props}
  >
    <div className="flex justify-center items-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />

      <div className="z-10 mx-4 text-center">
        <Dialog.Title as={Fragment}>
          <Heading priority={headingPriority} size="4xl">
            {heading}
          </Heading>
        </Dialog.Title>
        {children}
      </div>
    </div>
  </Dialog>
)

export default ConfirmModal
