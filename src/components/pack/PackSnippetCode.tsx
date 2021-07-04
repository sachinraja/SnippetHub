import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useUpdateSnippetCodeMutation } from '@graphql/queries/update-snippet-code.graphql'
import CodeBlock from '@components/CodeBlock'
import CodeInput from '@components/form-inputs/CodeInput'
import FormError from '@components/forms/FormError'
import EditLayout from '@layouts/EditLayout'
import getLanguageMode from '@lib/language/get-language-mode'
import type { Snippet } from '@prisma/client'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'

interface PackSnippetCodeProps {
  snippet: Snippet
  index: number
  snippets: Snippet[]
  setSnippets: Dispatch<SetStateAction<Snippet[]>>
}

const PackSnippetCode = ({
  snippet,
  index,
  snippets,
  setSnippets,
}: PackSnippetCodeProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const [updateSnippetCodeMutation] = useUpdateSnippetCodeMutation()

  const {
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<PackEditFormInputs>()

  const formSnippetId = `snippets.${index}.code` as const
  useEffect(() => {
    setValue(formSnippetId, snippet.code as never)
  }, [formSnippetId, setValue, snippet])

  const languageMode = getLanguageMode(snippet.language)

  return (
    <EditLayout
      displayComponent={
        <CodeBlock language={languageMode}>{snippet.code}</CodeBlock>
      }
      editComponent={
        <CodeInput
          mode={languageMode}
          onBlur={() => trigger(formSnippetId)}
          onUpdate={(v) =>
            setValue(formSnippetId, v.state.doc.toString() as never)
          }
          value={getValues(formSnippetId)}
        />
      }
      isEditing={isEditing}
      onEditClick={() => setIsEditing(!isEditing)}
      onConfirmClick={() =>
        (async () => {
          await trigger(formSnippetId)

          const { snippets: errorSnippets } = errors
          if (errorSnippets && errorSnippets[index]?.code) return

          const formSnippetCode = getValues(formSnippetId)

          if (formSnippetCode !== snippet.code) {
            try {
              await updateSnippetCodeMutation({
                variables: {
                  snippetId: snippet.id,
                  snippetCode: formSnippetCode,
                },
              })
              const newSnippets = [...snippets]
              newSnippets[index].code = formSnippetCode

              setSnippets(newSnippets)
              setIsEditing(false)
            } catch {
              toast.error("There was an error updating this snippet's code.")
            }
          }
        })()
      }
      formError={<FormError errors={errors} name={formSnippetId} />}
    />
  )
}

export default PackSnippetCode
