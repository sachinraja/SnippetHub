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
import Label from '@components/form-inputs/Label'
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
    formState: { errors, isValid },
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
          <div>
            <Label text="Pack Name" required>
              <TextInput
                placeholder="React Snippets"
                {...register('packName')}
              />
            </Label>
            <FormError name="packName" errors={errors} />
          </div>

          <div>
            <Label text="Short Description" required>
              <TextAreaInput {...register('packShortDescription')} />
            </Label>
            <FormError name="packShortDescription" errors={errors} />
          </div>

          <div>
            <Controller
              render={({ field: mdEditorField }) => {
                return (
                  <>
                    <Label text="Long Description - Supports Markdown (GFM)" />
                    <MDEditor
                      className="w-full"
                      onUpdate={(v) => {
                        setValue('packLongDescription', v.state.doc.toString())
                      }}
                      {...mdEditorField}
                    />
                  </>
                )
              }}
              control={control}
              name="packLongDescription"
            />

            <FormError name="packLongDescription" errors={errors} />
          </div>

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
        <ButtonInput className="my-4" type="submit" disabled={!isValid}>
          Create pack
        </ButtonInput>
      </form>
    </FormProvider>
  )
}

export default PackForm
