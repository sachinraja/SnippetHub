import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { useUpdatePackLongDescriptionMutation } from '@graphql/queries/update-pack-long-description.graphql'
import FormError from '@components/Forms/FormError'
import MDEditor from '@components/MDEditor/MDEditor'
import MDRenderer from '@components/MDRenderer/MDRenderer'
import PackEdit from '@components/Pack/PackEdit'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'

interface PackLongDescriptionProps {
  packId: number
  packLongDescription: string
  setPackLongDescription: Dispatch<SetStateAction<string>>
}

const PackLongDescription = ({
  packId,
  packLongDescription,
  setPackLongDescription,
}: PackLongDescriptionProps) => {
  const [
    updatePackLongDescriptionMutation,
  ] = useUpdatePackLongDescriptionMutation()
  const [isEditing, setIsEditing] = useState(false)

  const {
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<PackEditFormInputs>()

  return (
    <PackEdit
      className="justify-center"
      displayComponent={
        <MDRenderer className="w-3/4">{packLongDescription}</MDRenderer>
      }
      editComponent={
        <MDEditor
          name="Edit"
          className="w-3/4"
          value={getValues('packLongDescription')}
          onBlur={() => trigger('packLongDescription')}
          onUpdate={(v) =>
            setValue('packLongDescription', v.state.doc.toString())
          }
        />
      }
      isEditing={isEditing}
      onEditClick={() => setIsEditing(!isEditing)}
      onConfirmClick={() =>
        (async () => {
          await trigger('packLongDescription')
          if (errors.packLongDescription) return

          const formPackLongDescription = getValues('packLongDescription')

          if (formPackLongDescription !== packLongDescription) {
            updatePackLongDescriptionMutation({
              variables: {
                packId,
                packLongDescription: formPackLongDescription,
              },
            })
            setPackLongDescription(formPackLongDescription)
          }

          setIsEditing(false)
        })()
      }
      formError={<FormError errors={errors} name="packLongDescription" />}
    />
  )
}

export default PackLongDescription
