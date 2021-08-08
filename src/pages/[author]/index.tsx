import Image from 'next/image'
import { useState, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { getAuthorFromParam } from '@lib/utils/server-url-params'
import { getUserPacks } from '@lib/user'
import CardContainer from '@components/card/CardContainer'
import Container from '@components/containers/Container'
import Header from '@components/header/Header'
import Heading from '@components/Heading'
import Paragraph from '@components/Paragraph'
import getCardFromPack from '@lib/pack/card'
import { useUpdateUserBioMutation } from '@graphql/queries/update-user-bio.graphql'
import EditLayout from '@layouts/EditLayout'
import TextAreaInput from '@components/form-inputs/TextAreaInput'
import FormError from '@components/forms/FormError'
import { getUserBio } from '@lib/schemas/user-schema'
import configureYupLocale from '@lib/validation/configure-yup-locale'
import type { GetStaticPaths } from 'next'

export const getStaticProps = async ({
  params,
}: {
  params: { author: string }
}) => {
  const author = await getAuthorFromParam(params.author)
  if (!author) return { notFound: true }

  const packs = await getUserPacks(author, {
    orderBy: 'desc',
    take: 20,
  })

  return {
    props: {
      author,
      packs,
    },
    revalidate: 30,
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  // nextjs passes empty props if fallback is true and page is on first render
  // blocking works like SSR, but caches the page
  fallback: 'blocking',
  paths: [],
})

const AuthorPage = ({
  author,
  packs,
}: {
  author: AuthorPropFromParam
  packs: UnwrapPromise<ReturnType<typeof getUserPacks>>
}) => {
  // must copy to keep state of arguments
  const packsCopy = [...packs]
  const cards = packsCopy.map((pack) =>
    getCardFromPack(pack, {
      username: author.username,
      image: author.image ?? undefined,
    }),
  )

  const [session] = useSession()

  const [bio, setBio] = useState(author.bio ?? '')
  const [updateUserBioMutation] = useUpdateUserBioMutation()
  const [isEditingBio, setIsEditingBio] = useState(false)

  const userBioSchema = useMemo(() => {
    configureYupLocale()

    return Yup.object().shape({
      bio: getUserBio(),
    })
  }, [])
  const {
    register,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(userBioSchema),
    mode: 'onChange',
    defaultValues: {
      bio,
    },
  })

  const isAuthor = session?.user.id === author.id

  return (
    <Container meta={{ title: `@${author.username}` }}>
      <header className="mt-0">
        <Header>
          <section className="m-auto sm:w-2/3">
            <div className="flex items-center">
              {author.image && (
                <Image
                  width={70}
                  height={70}
                  alt={`${author.username} Profile`}
                  className="rounded-full"
                  src={author.image}
                />
              )}
              <Heading className="pl-2 font-inter" priority={1} size="4xl" bold>
                {author.username}
              </Heading>
            </div>

            <EditLayout
              displayComponent={
                <Paragraph className="mt-2 font-inter">{bio}</Paragraph>
              }
              editComponent={
                <TextAreaInput
                  {...register('bio')}
                  defaultValue={getValues('bio')}
                />
              }
              isEditing={isEditingBio}
              onEditClick={() => setIsEditingBio(!isEditingBio)}
              onConfirmClick={() =>
                (async () => {
                  await trigger('bio')

                  if (errors.bio) return
                  const formBio = getValues('bio')

                  if (formBio !== bio) {
                    try {
                      await updateUserBioMutation({
                        variables: {
                          bio: formBio,
                        },
                      })
                      setBio(formBio)
                      setIsEditingBio(false)
                    } catch {
                      toast.error('There was an error updating your bio.')
                    }
                  }
                })()
              }
              formError={<FormError name="bio" errors={errors} />}
              allowedToEdit={isAuthor}
            />
          </section>
        </Header>
      </header>

      <main className="mx-4 mt-2 mb-16">
        <CardContainer>{cards}</CardContainer>
      </main>
    </Container>
  )
}

export default AuthorPage
