import { Controller, useFormContext } from 'react-hook-form'
import { useRef, useState } from 'react'
import { PackFormInputs } from '@lib/schemas/pack-schema'
import Heading from '@components/Heading'
import getLanguageMode from '@lib/language/get-language-mode'
import FormError from '@components/forms/FormError'
import DeleteIcon from '@components/icons/DeleteIcon'
import ConfirmModal from '@components/modals/ConfirmModal'
import TextInput from './TextInput'
import LanguageSelectInput from './LanguageSelectInput'
import CodeInput from './CodeInput'
import ButtonInput from './ButtonInput'
import type { FieldArrayWithId, UseFieldArrayReturn } from 'react-hook-form'

interface SnippetInputProps {
  field: FieldArrayWithId<PackFormInputs, 'snippets', 'id'>
  index: number
  fieldArray: UseFieldArrayReturn<PackFormInputs, 'snippets', 'id'>
}

const SnippetInput = ({ field, index, fieldArray }: SnippetInputProps) => {
  const snippetNameId = `snippets.${index}.name` as const
  const snippetLanguageId = `snippets.${index}.language` as const
  const snippetCodeId = `snippets.${index}.code` as const

  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  const {
    trigger,
    setValue,
    watch,
    getValues,
    register,
    control,
    formState: { errors },
  } = useFormContext<PackFormInputs>()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <div key={field.id}>
      <ConfirmModal
        initialFocus={deleteButtonRef}
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        heading={`Are you sure you want to delete snippet ${
          getValues(snippetNameId) || index + 1
        }?`}
        headingPriority={2}
      >
        <ButtonInput
          className="mt-4"
          onClick={() => {
            fieldArray.remove(index)
            trigger('snippets')
          }}
          ref={deleteButtonRef}
        >
          Confirm Deletion
        </ButtonInput>
      </ConfirmModal>

      <div className="flex">
        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          aria-label="Remove snippet"
        >
          <DeleteIcon />
        </button>
        <Heading priority={5} size="2xl">
          Snippet {index + 1}
        </Heading>
      </div>

      <hr className="my-2 w-5/6 bg-carbon-600" />

      <TextInput
        label="Name"
        id={snippetNameId}
        className="mb-3"
        required
        defaultValue={getValues(snippetNameId)}
        {...register(snippetNameId)}
      />
      <FormError name={snippetNameId} errors={errors} />

      <Controller
        render={({ field: { onChange, value } }) => (
          <LanguageSelectInput
            value={value}
            onChange={(val) => {
              if (!val) return
              onChange(val.value)
            }}
          />
        )}
        defaultValue={field.language}
        control={control}
        name={snippetLanguageId}
      />

      <CodeInput
        label="Code"
        mode={getLanguageMode(watch(snippetLanguageId))}
        required
        id={snippetCodeId}
        onBlur={() => trigger(snippetCodeId)}
        onUpdate={(v) =>
          setValue(snippetCodeId, v.state.doc.toString() as never)
        }
        value={getValues(snippetCodeId)}
      />

      <FormError name={snippetCodeId} errors={errors} />
    </div>
  )
}

export default SnippetInput
