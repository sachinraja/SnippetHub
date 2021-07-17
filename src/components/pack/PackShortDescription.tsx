import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useUpdatePackShortDescriptionMutation } from '@graphql/queries/update-pack-short-description.graphql'
import FormError from '@components/forms/FormError'
import EditLayout from '@layouts/EditLayout'
import Paragraph from '@components/Paragraph'
import TextAreaInput from '@components/form-inputs/TextAreaInput'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'

interface PackShortDescriptionProps {
  packId: number
  packShortDescription: string
  setPackShortDescription: Dispatch<SetStateAction<string>>
  allowedToEdit: boolean
}

const PackShortDescription = ({
  packId,
  packShortDescription,
  setPackShortDescription,
  allowedToEdit,
}: PackShortDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [updatePackShortDescriptionMutation] =
    useUpdatePackShortDescriptionMutation()

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<PackEditFormInputs>()

  return (
    <EditLayout
      displayComponent={
        <Paragraph className="font-inter" size="lg">
          {packShortDescription}
        </Paragraph>
      }
      editComponent={
        <TextAreaInput
          {...register('shortDescription')}
          className="inline m-0"
          defaultValue={getValues('shortDescription')}
        />
      }
      isEditing={isEditing}
      onEditClick={() => setIsEditing(!isEditing)}
      onConfirmClick={() =>
        (async () => {
          await trigger('shortDescription')
          if (errors.shortDescription) return
          const formPackShortDescription = getValues('shortDescription')

          if (formPackShortDescription !== packShortDescription) {
            try {
              await updatePackShortDescriptionMutation({
                variables: {
                  packId,
                  packShortDescription: formPackShortDescription,
                },
              })
              setPackShortDescription(formPackShortDescription)
              setIsEditing(false)
            } catch {
              toast.error('There was an error updating the short description.')
            }
          }
        })()
      }
      formError={<FormError errors={errors} name="shortDescription" />}
      allowedToEdit={allowedToEdit}
    />
  )
}

export default PackShortDescription
