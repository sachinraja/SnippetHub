import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/dist/client/router'
import { useUpdatePackNameMutation } from '@graphql/queries/update-pack-name.graphql'
import FormError from '@components/forms/FormError'
import Heading from '@components/Heading'
import PackEdit from '@components/pack/PackEdit'
import TextInput from '@components/form-inputs/TextInput'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'

interface PackNameProps {
  packId: number
  packName: string
  setPackName: Dispatch<SetStateAction<string>>
}

const PackName = ({ packId, packName, setPackName }: PackNameProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [updatePackNameMutation] = useUpdatePackNameMutation()

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<PackEditFormInputs>()

  const router = useRouter()

  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: { author: router.query.author, pack: packName },
      },
      // required or next.js will encode @ symbol
      `/${router.query.author}/${packName}`,
      { shallow: true },
    )
  }, [packName])

  return (
    <PackEdit
      displayComponent={
        <Heading className="font-inter" priority={1} size={4} bold>
          {packName}
        </Heading>
      }
      editComponent={
        <TextInput
          {...register('packName')}
          className="inline m-0"
          defaultValue={getValues('packName')}
        />
      }
      isEditing={isEditing}
      onEditClick={() => setIsEditing(!isEditing)}
      onConfirmClick={() =>
        (async () => {
          await trigger('packName')
          if (errors.packName) return

          const formPackName = getValues('packName')

          if (formPackName !== packName) {
            updatePackNameMutation({
              variables: {
                packId,
                packName: formPackName,
              },
            })
            setPackName(formPackName)
          }

          setIsEditing(false)
        })()
      }
      formError={<FormError errors={errors} name="packName" />}
    />
  )
}

export default PackName
