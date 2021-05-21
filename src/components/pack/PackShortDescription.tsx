import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { useUpdatePackShortDescriptionMutation } from '@graphql/queries/update-pack-short-description.graphql'
import FormError from '@components/forms/FormError'
import PackEdit from '@components/pack/PackEdit'
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
    <PackEdit
      displayComponent={
        <Paragraph className="font-inter mt-2" size={4}>
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
            updatePackShortDescriptionMutation({
              variables: {
                packId,
                packShortDescription: formPackShortDescription,
              },
            })
            setPackShortDescription(formPackShortDescription)
          }

          setIsEditing(false)
        })()
      }
      formError={<FormError errors={errors} name="packShortDescription" />}
    />
  )
}

export default PackShortDescription
