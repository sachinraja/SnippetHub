import { FormErrorProps } from '@components/forms/FormError'
import EditIcon from '@components/icons/EditIcon'
import SubmitIcon from '@components/icons/SubmitIcon'
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
          <EditIcon />
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
