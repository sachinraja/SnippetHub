import { Controller, useFormContext } from 'react-hook-form'
import { Language } from '@prisma/client'
import { useCreateSnippetMutation } from '@graphql/queries/create-snippet.graphql'
import CodeInput from '@components/form-inputs/CodeInput'
import FormError from '@components/forms/FormError'
import LanguageSelectInput from '@components/form-inputs/LanguageSelectInput'
import SubmitIcon from '@components/icons/SubmitIcon'
import TextInput from '@components/form-inputs/TextInput'
import getLanguageMode from '@lib/language/get-language-mode'
import type { UseFieldArrayReturn } from 'react-hook-form'
import type { Snippet } from '@prisma/client'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'

interface CreateSnippetProps {
  packId: number
  methods: UseFieldArrayReturn<PackEditFormInputs, 'snippets', 'id'>
  snippets: Snippet[]
  setSnippets: Dispatch<SetStateAction<Snippet[]>>
  setIsCreatingSnippet: Dispatch<SetStateAction<boolean>>
}

const CreateSnippet = ({
  packId,
  methods,
  snippets,
  setSnippets,
  setIsCreatingSnippet,
}: CreateSnippetProps) => {
  const [createSnippetMutation] = useCreateSnippetMutation()

  const {
    register,
    getValues,
    setValue,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<PackEditFormInputs>()

  const formSnippetId = 'newSnippet' as const
  const formSnippetNameId = `${formSnippetId}.name` as const
  const formSnippetLanguageId = `${formSnippetId}.language` as const
  const formSnippetCodeId = `${formSnippetId}.code` as const

  return (
    <>
      <div className="">
        <TextInput
          label="Name"
          id={formSnippetNameId}
          className="mb-3"
          required
          {...register(formSnippetNameId)}
        />
        <FormError name={formSnippetNameId} errors={errors} />

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
          defaultValue={getValues(formSnippetLanguageId)}
          control={control}
          name={formSnippetLanguageId}
        />

        <CodeInput
          label="Code"
          mode={getLanguageMode(
            watch(formSnippetLanguageId) ?? Language.javascript,
          )}
          required
          id={formSnippetCodeId}
          onBlur={() => trigger(formSnippetCodeId)}
          onUpdate={(v) =>
            setValue(formSnippetCodeId, v.state.doc.toString() as never)
          }
          value={getValues(formSnippetCodeId)}
        />

        <FormError name={formSnippetCodeId} errors={errors} />
      </div>
      <FormError errors={errors} name={formSnippetId} />

      <button
        type="submit"
        aria-label="Submit the new snippet"
        onClick={() => {
          ;(async () => {
            await trigger('newSnippet')
            if (errors.newSnippet) return

            const newSnippet = getValues('newSnippet')

            const { data } = await createSnippetMutation({
              variables: {
                packId,
                snippet: newSnippet,
              },
            })

            if (!data || !data.createSnippet) return

            const { createSnippet } = data
            setSnippets([...snippets, createSnippet])
            methods.append(createSnippet)

            // reset input values
            setValue('newSnippet', {
              name: '',
              language: Language.javascript,
              code: '',
            })

            setIsCreatingSnippet(false)
          })()
        }}
      >
        <SubmitIcon />
      </button>
    </>
  )
}

export default CreateSnippet
