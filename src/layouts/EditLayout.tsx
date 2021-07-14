import { FormErrorProps } from '@components/forms/FormError'
import EditIcon from '@components/icons/EditIcon'
import SubmitIcon from '@components/icons/SubmitIcon'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'

interface EditLayoutProps {
  className?: string
  displayComponent: ReactNode
  editComponent: ReactNode
  isEditing: boolean
  onEditClick: MouseEventHandler<HTMLButtonElement>
  onConfirmClick: MouseEventHandler<HTMLButtonElement>
  formError: ReactElement<FormErrorProps>
  allowedToEdit: boolean
}

const EditLayout = ({
  className,
  displayComponent,
  editComponent,
  isEditing,
  onEditClick,
  onConfirmClick,
  formError,
  allowedToEdit,
}: EditLayoutProps) => {
  return (
    <>
      <div className={`flex ${className}`}>
        {isEditing ? editComponent : displayComponent}

        {allowedToEdit && (
          <button className="ml-3" type="button" onClick={onEditClick}>
            <EditIcon />
          </button>
        )}

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

EditLayout.defaultProps = {
  className: '',
}

export default EditLayout
