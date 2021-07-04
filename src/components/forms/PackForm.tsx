import {
  Controller,
  useFieldArray,
  useForm,
  FormProvider,
} from 'react-hook-form'
import { Language } from '@prisma/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { packFormSchema } from '@lib/schemas/pack-schema'
import ButtonInput from '@components/form-inputs/ButtonInput'
import MDEditor from '@components/md-editor/MDEditor'
import TextAreaInput from '@components/form-inputs/TextAreaInput'
import TextInput from '@components/form-inputs/TextInput'
import SnippetInput from '@components/form-inputs/SnippetInput'
import FormError from './FormError'
import type { SubmitHandler } from 'react-hook-form'
import type { PackFormInputs } from '@lib/schemas/pack-schema'

export interface PackFormProps {
  defaultValues?: Partial<PackFormInputs>
  submitHandler: SubmitHandler<PackFormInputs>
}

const PackForm = ({ defaultValues, submitHandler }: PackFormProps) => {
  const formMethods = useForm<PackFormInputs>({
    resolver: yupResolver(packFormSchema),
    mode: 'onBlur',
    defaultValues,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    trigger,
  } = formMethods

  const snippetFieldArray = useFieldArray({
    control,
    name: 'snippets',
  })

  const { fields: snippetFields, append: appendSnippet } = snippetFieldArray

  return (
    <FormProvider {...formMethods}>
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
            render={({ field: mdEditorField }) => {
              return (
                <MDEditor
                  className="w-full"
                  onUpdate={(v) => {
                    setValue('packLongDescription', v.state.doc.toString())
                  }}
                  label="Long Description - Supports Markdown (GFM)"
                  {...mdEditorField}
                />
              )
            }}
            control={control}
            name="packLongDescription"
          />

          <FormError name="packLongDescription" errors={errors} />

          {snippetFields.map((field, index) => {
            return (
              <SnippetInput
                key={field.id}
                field={field}
                index={index}
                fieldArray={snippetFieldArray}
              />
            )
          })}
        </div>

        <ButtonInput
          className="my-4"
          onClick={() => {
            appendSnippet({ language: Language.javascript })
            trigger('snippets')
          }}
        >
          Add Snippet
        </ButtonInput>

        <FormError name="snippets" errors={errors} />

        <hr className="bg-carbon-600" />

        <ButtonInput className="my-4" type="submit">
          Create pack
        </ButtonInput>
      </form>
    </FormProvider>
  )
}

export default PackForm
