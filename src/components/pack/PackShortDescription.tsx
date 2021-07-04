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
}

const PackShortDescription = ({
  packId,
  packShortDescription,
  setPackShortDescription,
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
          {...register('packShortDescription')}
          className="inline m-0"
          defaultValue={getValues('packShortDescription')}
        />
      }
      isEditing={isEditing}
      onEditClick={() => setIsEditing(!isEditing)}
      onConfirmClick={() =>
        (async () => {
          await trigger('packShortDescription')
          if (errors.packShortDescription) return
          const formPackShortDescription = getValues('packShortDescription')

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
      formError={<FormError errors={errors} name="packShortDescription" />}
    />
  )
}

export default PackShortDescription
