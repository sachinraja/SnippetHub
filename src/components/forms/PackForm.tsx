import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Language } from '@prisma/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { packFormSchema } from '@lib/schemas/pack-schema'
import ButtonInput from '@components/form-inputs/ButtonInput'
import CodeInput from '@components/form-inputs/CodeInput'
import DeleteIcon from '@components/icons/DeleteIcon'
import Heading from '@components/Heading'
import LanguageSelectInput from '@components/form-inputs/LanguageSelectInput'
import MDEditor from '@components/md-editor/MDEditor'
import TextAreaInput from '@components/form-inputs/TextAreaInput'
import TextInput from '@components/form-inputs/TextInput'
import getLanguageMode from '@lib/language/get-language-mode'
import FormError from './FormError'
import type { SubmitHandler } from 'react-hook-form'
import type { PackFormInputs } from '@lib/schemas/pack-schema'

export interface PackFormProps {
  defaultValues?: Partial<PackFormInputs>
  submitHandler: SubmitHandler<PackFormInputs>
}

const PackForm = ({ defaultValues, submitHandler }: PackFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm<PackFormInputs>({
    resolver: yupResolver(packFormSchema),
    mode: 'onBlur',
    defaultValues,
  })

  const {
    fields: snippetFields,
    append: appendSnippet,
    remove: removeSnippet,
  } = useFieldArray({
    control,
    name: 'snippets',
  })

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="space-y-3">
        <TextInput
          id="packName"
          label="Pack Name"
          placeholder="React Snippets"
          required
          {...register('packName')}
        />
        <FormError name="packName" errors={errors} />

        <TextAreaInput
          id="packShortDescription"
          label="Short Description"
          required
          {...register('packShortDescription')}
        />
        <FormError name="packShortDescription" errors={errors} />

        <Controller
          render={({ field: mdEditorField }) => (
            <MDEditor
              className="w-full"
              {...mdEditorField}
              onBlur={() => trigger('packLongDescription')}
              onUpdate={(v) =>
                setValue('packLongDescription', v.state.doc.toString())
              }
              label="Long Description - Supports Markdown (GFM)"
              value={getValues('packLongDescription')}
            />
          )}
          control={control}
          name="packLongDescription"
        />
        <FormError name="packLongDescription" errors={errors} />

        {snippetFields.map((field, index) => {
          const snippetNameId = `snippets.${index}.name` as const
          const snippetLanguageId = `snippets.${index}.language` as const
          const snippetCodeId = `snippets.${index}.code` as const

          return (
            <div key={field.id}>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete snippet ${
                          getValues(snippetNameId) || index + 1
                        }?`,
                      )
                    ) {
                      removeSnippet(index)
                      trigger('snippets')
                    }
                  }}
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
        })}
      </div>

      <ButtonInput
        className="my-4"
        value="Add Snippet"
        onClick={() => {
          appendSnippet({ language: Language.javascript })
          trigger('snippets')
        }}
      />

      <FormError name="snippets" errors={errors} />

      <hr className="bg-carbon-600" />

      <ButtonInput className="my-4" type="submit" value="Create pack" />
    </form>
  )
}

export default PackForm
