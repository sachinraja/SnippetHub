import * as Yup from 'yup'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import {
  Language as GraphQLLanguage,
  useCreatePackMutation,
} from '@graphql/queries/create-pack.graphql'
import { Language as PrismaLanguage } from '@prisma/client'
import { TrashIcon } from '@heroicons/react/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonInput from '@components/FormInputs/ButtonInput'
import CodeInput from '@components/FormInputs/CodeInput'
import FormError from './FormError'
import Heading from '@components/Heading/Heading'
import LanguageSelectInput from '@components/FormInputs/LanguageSelectInput'
import MDEditor from '@components/MDEditor/MDEditor'
import TextAreaInput from '@components/FormInputs/TextAreaInput'
import TextInput from '@components/FormInputs/TextInput'
import getLanguageMode from '@lib/language/get-language-mode'
import validationErrors from '@lib/validation/error'
import type { SnippetInput } from '@graphql/queries/create-pack.graphql'

type PackFormInputs = {
  packName: string
  packShortDescription: string
  packLongDescription: string
  snippets: SnippetInput[]
}

const packFormSchema = Yup.object().shape({
  packName: Yup.string()
    .required(validationErrors.required)
    .max(50, validationErrors.maxLength),
  packShortDescription: Yup.string()
    .required(validationErrors.required)
    .max(255, validationErrors.maxLength),
  packLongDescription: Yup.string().max(10000, validationErrors.maxLength),
  snippets: Yup.array()
    .required(validationErrors.required)
    .min(1, ({ min }) => `You must have at least ${min} snippet.`)
    .max(5, ({ max }) => `You can only have up to ${max} snippets.`)
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required(validationErrors.required)
          .max(50, validationErrors.maxLength),
        code: Yup.string()
          .required(validationErrors.required)
          .max(5000, validationErrors.maxLength),
        language: Yup.string().oneOf(Object.values(PrismaLanguage)),
      }),
    ),
})

export interface PackFormProps {
  defaultValues?: Partial<PackFormInputs>
}

const PackForm = ({ defaultValues }: PackFormProps) => {
  const [createPack] = useCreatePackMutation()

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
    <form
      className="space-y-3"
      onSubmit={handleSubmit((data) => createPack({ variables: data }))}
    >
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
                className="hover:text-red-500 tranistion-colors duration-200"
              >
                <TrashIcon height={35} width={35} />
              </button>
              <Heading priority={5} size={2}>
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
              defaultValue={getValues(snippetLanguageId)}
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
      <ButtonInput
        className="!mt-8"
        value="Add Snippet"
        onClick={() => {
          appendSnippet({ language: GraphQLLanguage.Javascript })
          trigger('snippets')
        }}
      />

      <FormError name="snippets" errors={errors} />

      <hr className="bg-carbon-600" />

      <ButtonInput type="submit" value="Create pack" />
    </form>
  )
}

export default PackForm