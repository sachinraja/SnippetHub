import { useEffect, useState, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/dist/client/router'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/client'
import { useUpdatePackNameMutation } from '@graphql/queries/update-pack-name.graphql'
import FormError from '@components/forms/FormError'
import Heading from '@components/Heading'
import EditLayout from '@layouts/EditLayout'
import TextInput from '@components/form-inputs/TextInput'
import { useDeletePackMutation } from '@graphql/queries/delete-pack.graphql'
import DeleteIcon from '@components/icons/DeleteIcon'
import ConfirmModal from '@components/modals/ConfirmModal'
import ButtonInput from '@components/form-inputs/ButtonInput'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'
import type { Session } from 'next-auth'

interface PackNameProps {
  packId: number
  packName: string
  setPackName: Dispatch<SetStateAction<string>>
  allowedToEdit: boolean
}

const PackName = ({
  packId,
  packName,
  setPackName,
  allowedToEdit,
}: PackNameProps) => {
  const [session] = useSession()

  const [isEditing, setIsEditing] = useState(false)

  const [deletePackMutation] = useDeletePackMutation()
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <EditLayout
      displayComponent={
        <>
          {allowedToEdit && (
            <>
              <button type="button" onClick={() => setIsDeleteModalOpen(true)}>
                <DeleteIcon />
              </button>

              {/* needed or modal will not show when coming from new page */}
              {isDeleteModalOpen && (
                <ConfirmModal
                  initialFocus={deleteButtonRef}
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  heading={`Are you sure you want to delete pack ${packName}?`}
                  headingPriority={2}
                >
                  <ButtonInput
                    className="mt-4"
                    onClick={() =>
                      (async () => {
                        try {
                          await deletePackMutation({
                            variables: {
                              id: packId,
                            },
                          })

                          // allowedToEdit will ensure this
                          const { username } = (session as Session).user

                          router.push(
                            {
                              pathname: '/[author]',
                              query: {
                                author: `@${username}`,
                              },
                            },
                            `/@${username}`,
                          )
                        } catch {
                          toast.error('There was an error deleting this pack.')
                        }
                      })()
                    }
                    ref={deleteButtonRef}
                  >
                    Confirm Deletion
                  </ButtonInput>
                </ConfirmModal>
              )}
            </>
          )}

          <Heading className="font-inter" priority={1} size="4xl" bold>
            {packName}
          </Heading>
        </>
      }
      editComponent={
        <TextInput
          {...register('name')}
          className="inline m-0"
          defaultValue={getValues('name')}
        />
      }
      isEditing={isEditing}
      onEditClick={() => setIsEditing(!isEditing)}
      onConfirmClick={() =>
        (async () => {
          await trigger('name')
          if (errors.name) return

          const formPackName = getValues('name')

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
      formError={<FormError errors={errors} name="name" />}
      allowedToEdit={allowedToEdit}
    />
  )
}

export default PackName
