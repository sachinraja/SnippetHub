import ButtonInput from '@components/FormInputs/ButtonInput'
import Heading from '@components/Heading/Heading'
import Modal from 'react-modal'
import type { MouseEventHandler } from 'react'

type ConfirmModalProps = {
  message: string
  onCancel?: MouseEventHandler<HTMLInputElement>
  onConfirm?: MouseEventHandler<HTMLInputElement>
} & Modal.Props

const ConfirmModal = ({
  message,
  onCancel,
  onConfirm,
  ...props
}: ConfirmModalProps) => {
  return (
    <div>
      <Modal {...props} className="bg-carbon-600">
        <Heading priority={5} size={2}>
          {message}
        </Heading>

        <ButtonInput value="Cancel" onClick={onCancel} />
        <ButtonInput value="Confirm" onClick={onConfirm} />
      </Modal>
    </div>
  )
}

ConfirmModal.defaultProps = {
  onCancel: undefined,
  onConfirm: undefined,
}

export default ConfirmModal