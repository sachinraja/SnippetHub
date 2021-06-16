import { useEffect, useState, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { PackFormInputs } from '@lib/schemas/pack-schema'
import { useDeleteSnippetMutation } from '@graphql/queries/delete-snippet.graphql'
import { useUpdateSnippetNameMutation } from '@graphql/queries/update-snippet-name.graphql'
import DeleteIcon from '@components/icons/DeleteIcon'
import FormError from '@components/forms/FormError'
import Heading from '@components/Heading'
import PackEdit from '@components/pack/PackEdit'
import TextInput from '@components/form-inputs/TextInput'
import ConfirmModal from '@components/modals/ConfirmModal'
import ButtonInput from '@components/form-inputs/ButtonInput'
import type { UseFieldArrayReturn } from 'react-hook-form'
import type { Snippet } from '@prisma/client'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'

interface PackSnippetNameProps {
  snippet: Snippet
  index: number
  methods: UseFieldArrayReturn<PackFormInputs, 'snippets', 'id'>
  snippets: Snippet[]
  setSnippets: Dispatch<SetStateAction<Snippet[]>>
}

const PackSnippetName = ({
  snippet,
  index,
  methods,
  snippets,
  setSnippets,
}: PackSnippetNameProps) => {
  const [deleteSnippetMutation] = useDeleteSnippetMutation()
  const [updateSnippetNameMutation] = useUpdateSnippetNameMutation()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<PackEditFormInputs>()

  const formSnippetId = `snippets.${index}.name` as const
  useEffect(() => {
    setValue(formSnippetId, snippet.name as never)
  }, [formSnippetId, setValue, snippet])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <PackEdit
      displayComponent={
        <>
          {snippets.length !== 1 && (
            <>
              <button type="button" onClick={() => setIsDeleteModalOpen(true)}>
                <DeleteIcon />
              </button>

              <ConfirmModal
                initialFocus={deleteButtonRef}
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                heading={`Are you sure you want to delete snippet ${snippet.name}?`}
                headingPriority={2}
              >
                <ButtonInput
                  className="mt-4"
                  onClick={() => {
                    deleteSnippetMutation({
                      variables: {
                        packId: snippet.packId,
                        snippetId: snippet.id,
                      },
                    })

                    const newSnippets = [...snippets]
                    newSnippets.splice(index, 1)
                    setSnippets(newSnippets)

                    methods.remove(index)
                  }}
                  ref={deleteButtonRef}
                >
                  Confirm Deletion
                </ButtonInput>
              </ConfirmModal>
            </>
          )}

          <Heading priority={3} size="3xl">
            {snippet.name}
          </Heading>
        </>
      }
      editComponent={
        <TextInput
          {...register(formSnippetId)}
          required
          defaultValue={getValues(formSnippetId)}
        />
      }
      isEditing={isEditing}
      onEditClick={() => setIsEditing(!isEditing)}
      onConfirmClick={() =>
        (async () => {
          trigger(formSnippetId)
          const { snippets: errorSnippets } = errors
          if (errorSnippets && errorSnippets[index]?.name) return

          const formSnippetName = getValues(formSnippetId)
          if (formSnippetName !== snippet.name) {
            updateSnippetNameMutation({
              variables: {
                snippetId: snippet.id,
                snippetName: formSnippetName,
              },
            })

            const newSnippets = [...snippets]
            newSnippets[index].name = formSnippetName
            setSnippets(newSnippets)
          }

          setIsEditing(false)
        })()
      }
      formError={<FormError errors={errors} name={formSnippetId} />}
    />
  )
}

export default PackSnippetName
