import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import languages from '@lib/language'
import FadeIn from '@components/transitions/FadeIn'
import CardUpvote from './CardUpvote'
import type { ReactNode } from 'react'
import type { Language } from '@prisma/client'

export interface CardProps {
  bodyUrl?: string
  upvotes: number | string
  description: string
  imageUrl?: string
  language: Language
  subtitle: string
  title: string
}

const Card = ({
  bodyUrl,
  upvotes,
  description,
  imageUrl,
  language,
  subtitle,
  title,
}: CardProps) => {
  const header = useRef<HTMLDivElement>(null)
  const attributes = useRef<HTMLDivElement>(null)
  const [areAttributesFloatedRight, setAreAttributesFloatedRight] =
    useState(true)

  const languageAttributes = languages[language]

  // detect flex wrap and style accordingly
  function checkFloat() {
    const headerElement = header.current
    const attributesElement = attributes.current

    if (
      headerElement &&
      attributesElement &&
      attributesElement.offsetTop > headerElement.offsetTop
    ) {
      setAreAttributesFloatedRight(false)
    } else {
      setAreAttributesFloatedRight(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', checkFloat)
    return () => window.removeEventListener('resize', checkFloat)
  }, [])

  const WithLink = ({ children }: { children: ReactNode }) => {
    return bodyUrl ? (
      <Link href={bodyUrl}>
        <a>{children}</a>
      </Link>
    ) : (
      <>{children}</>
    )
  }

  return (
    <FadeIn as="article" afterEnter={checkFloat}>
      <WithLink>
        <div className="bg-opacity-80 border-carbon-500 border-1 rounded p-2 motion-safe:hover:-translate-y-0.5 hover:border-carbon-50 transition-colors duration-500">
          <div className="flex flex-wrap">
            <section ref={header} className="flex-grow mr-2">
              <section>
                <h3 className="font-mono text-gray-400 leading-none tracking-tighter text-sm">
                  {subtitle}
                  <span aria-hidden>/</span>
                </h3>
              </section>

              <h2 className="font-extrabold font-mono text-lg">{title}</h2>
            </section>

            <section
              ref={attributes}
              className={`whitespace-nowrap font-inter font-bold grid grid-cols-1 ${
                areAttributesFloatedRight ? 'justify-items-end' : ''
              }`}
            >
              <CardUpvote upvotes={upvotes} />

              <div className="mt-1">
                <div
                  className="inline-flex items-center border-2 rounded-sm"
                  style={{ borderColor: languageAttributes.color.border }}
                >
                  <svg
                    className="ml-1 my-1 w-5 inline-block"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={languageAttributes.icon.path}
                      fill={languageAttributes.color.icon}
                    />
                  </svg>

                  <p
                    className="inline-block mx-1"
                    style={{ color: languageAttributes.color.text }}
                  >
                    {languageAttributes.name}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {imageUrl && (
            <div className="w-full">
              <div className="relative w-10 top-3 left-2">
                <Image
                  width={60}
                  height={60}
                  alt={`${subtitle} Profile`}
                  className="rounded-full"
                  src={imageUrl}
                />
              </div>

              <hr />
            </div>
          )}

          <p className="mt-3">{description}</p>
        </div>
      </WithLink>
    </FadeIn>
  )
}

export default Card
