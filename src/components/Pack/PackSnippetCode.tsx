import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useUpdateSnippetCodeMutation } from '@graphql/queries/update-snippet-code.graphql'
import CodeBlock from '@components/CodeBlock/CodeBlock'
import CodeInput from '@components/FormInputs/CodeInput'
import FormError from '@components/Forms/FormError'
import PackEdit from '@components/Pack/PackEdit'
import getLanguageMode from '@lib/language/get-language-mode'
import type { Dispatch, SetStateAction } from 'react'
import type { PackEditFormInputs } from '@lib/schemas/pack-edit-schema'
import type { Snippet } from '@prisma/client'

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
  }, [snippet])

  const languageMode = getLanguageMode(snippet.language)

  return (
    <PackEdit
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
            updateSnippetCodeMutation({
              variables: {
                snippetId: snippet.id,
                snippetCode: formSnippetCode,
              },
            })
            const newSnippets = [...snippets]
            newSnippets[index].code = formSnippetCode

            setSnippets(newSnippets)
          }

          setIsEditing(false)
        })()
      }
      formError={<FormError errors={errors} name={formSnippetId} />}
    />
  )
}

export default PackSnippetCode
