import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useUpdatePackLongDescriptionMutation } from '@graphql/queries/update-pack-long-description.graphql'
import FormError from '@components/forms/FormError'
import MDEditor from '@components/md-editor/MDEditor'
import MDRenderer from '@components/md-renderer/MDRenderer'
import EditLayout from '@layouts/EditLayout'
import type { Pack } from '@prisma/client'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'

interface PackLongDescriptionProps {
  packId: Pack['id']
  packLongDescription: string
  setPackLongDescription: Dispatch<SetStateAction<string>>
  allowedToEdit: boolean
}

const PackLongDescription = ({
  packId,
  packLongDescription,
  setPackLongDescription,
  allowedToEdit,
}: PackLongDescriptionProps) => {
  const [updatePackLongDescriptionMutation] =
    useUpdatePackLongDescriptionMutation()
  const [isEditing, setIsEditing] = useState(false)

  const {
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<PackEditFormInputs>()

  return (
    <EditLayout
      className="justify-center"
      displayComponent={
        packLongDescription !== '' && (
          <MDRenderer className="w-3/4">{packLongDescription}</MDRenderer>
        )
      }
      editComponent={
        <MDEditor
          className="w-3/4"
          value={getValues('longDescription')}
          onBlur={() => trigger('longDescription')}
          onUpdate={(v) => setValue('longDescription', v.state.doc.toString())}
        />
      }
      isEditing={isEditing}
      onEditClick={() => setIsEditing(!isEditing)}
      onConfirmClick={() =>
        (async () => {
          await trigger('longDescription')
          if (errors.longDescription) return

          const formPackLongDescription = getValues('longDescription')

          if (formPackLongDescription !== packLongDescription) {
            try {
              await updatePackLongDescriptionMutation({
                variables: {
                  packId,
                  packLongDescription: formPackLongDescription,
                },
              })
              setPackLongDescription(formPackLongDescription)
              setIsEditing(false)
            } catch {
              toast.error('There was an error updating the long description.')
            }
          }
        })()
      }
      formError={<FormError errors={errors} name="longDescription" />}
      allowedToEdit={allowedToEdit}
    />
  )
}

export default PackLongDescription
