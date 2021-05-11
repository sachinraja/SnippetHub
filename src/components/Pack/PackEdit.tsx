import { FormErrorProps } from '@components/Forms/FormError'
import { PencilIcon } from '@heroicons/react/outline'
import SubmitIcon from '@components/Icons/SubmitIcon'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'

interface PackEditProps {
  className?: string
  displayComponent: ReactNode
  editComponent: ReactNode
  isEditing: boolean
  onEditClick: MouseEventHandler<HTMLButtonElement>
  onConfirmClick: MouseEventHandler<HTMLButtonElement>
  formError: ReactElement<FormErrorProps>
}

const PackEdit = ({
  className,
  displayComponent,
  editComponent,
  isEditing,
  onEditClick,
  onConfirmClick,
  formError,
}: PackEditProps) => {
  return (
    <>
      <div className={`flex ${className}`}>
        {isEditing ? editComponent : displayComponent}

        <button className="ml-3" type="button" onClick={onEditClick}>
          <PencilIcon width={35} />
        </button>

        {isEditing && (
          <button type="button" aria-label="Confirm" onClick={onConfirmClick}>
            <SubmitIcon />
          </button>
        )}
      </div>
      {isEditing && formError}
    </>
  )
}

PackEdit.defaultProps = {
  className: '',
}

export default PackEdit
