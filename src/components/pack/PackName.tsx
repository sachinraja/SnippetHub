import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/dist/client/router'
import toast from 'react-hot-toast'
import { useUpdatePackNameMutation } from '@graphql/queries/update-pack-name.graphql'
import FormError from '@components/forms/FormError'
import Heading from '@components/Heading'
import EditLayout from '@layouts/EditLayout'
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
    if (router.query.pack === packName) return

    router.replace(
      {
        pathname: router.pathname,
        query: { author: router.query.author, pack: packName },
      },
      // required or next.js will encode @ symbol
      `/${router.query.author}/${packName}`,
      { shallow: true },
    )
  }, [packName, router])

  return (
    <EditLayout
      displayComponent={
        <Heading className="font-inter" priority={1} size="4xl" bold>
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
            try {
              await updatePackNameMutation({
                variables: {
                  packId,
                  packName: formPackName,
                },
              })
              setPackName(formPackName)
              setIsEditing(false)
            } catch {
              toast.error('There was an error updating the name.')
            }
          }
        })()
      }
      formError={<FormError errors={errors} name="packName" />}
    />
  )
}

export default PackName
