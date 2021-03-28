import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import languages from '@lib/language/language'
import type { enum_Snippet_language } from '@prisma/client'
import type React from 'react'

export interface CardProps {
  title: string
  subtitle: string
  count: string | number
  bodyUrl?: string
  description: string
  language: enum_Snippet_language
  imageUrl: string
}

const Card = ({
  title,
  subtitle,
  count,
  bodyUrl,
  description,
  language,
  imageUrl,
}: CardProps) => {
  const header = useRef<HTMLDivElement>(null)
  const attributes = useRef<HTMLDivElement>(null)
  const [attributesFloatedRight, setAttributesFloatedRight] = useState(true)

  const languageAttributes = languages[language]

  // detect flex wrap and style accordingly
  function checkFloat() {
    const attributesElement = attributes.current
    const headerElement = header.current

    if (
      attributesElement &&
      headerElement &&
      attributesElement.offsetTop > headerElement.offsetTop
    ) {
      setAttributesFloatedRight(false)
    } else {
      setAttributesFloatedRight(true)
    }
  }

  // continue running on client on resize
  useEffect(() => {
    checkFloat()
    window.addEventListener('resize', checkFloat)
    return () => window.removeEventListener('resize', checkFloat)
  }, [])

  const cardElement = (
    <div className="bg-opacity-80 border-carbon-500 border-1 rounded p-2 transform motion-safe:hover:-translate-y-0.5 hover:border-carbon-50 transition-colors duration-500">
      <div className="flex flex-wrap">
        <section className="flex-grow mr-2" ref={header}>
          <section>
            <h3 className="font-mono text-gray-400 leading-none tracking-tighter text-sm">
              {subtitle}/
            </h3>
          </section>

          <section>
            <h2 className="font-extrabold font-mono text-lg">{title}</h2>
          </section>
        </section>

        <section
          className={`whitespace-nowrap font-inter font-bold grid grid-cols-1${
            attributesFloatedRight ? ' justify-items-end' : ''
          }`}
          ref={attributes}
        >
          <div>
            <div className="inline-block border-blue-500 border-2 rounded-sm">
              <svg
                className="w-6 inline text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>

              <p className="inline mx-1 text-blue-400">{count}</p>
            </div>
          </div>

          <div className="mt-1">
            <div
              className={`inline-flex items-center border-${languageAttributes.color}-500 border-2 rounded-sm`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 my-1 w-5 inline-block"
                viewBox="0 0 24 24"
              >
                <path
                  fill={languageAttributes.iconColor}
                  d={languageAttributes.icon.path}
                />
              </svg>

              <p
                className={`inline-block mx-1 text-${languageAttributes.color}-400`}
              >
                {languageAttributes.name}
              </p>
            </div>
          </div>
        </section>

        <div className="w-full items-end">
          <div className="relative h-10 w-10 top-2 left-2">
            <img
              className="rounded-full"
              src={imageUrl}
              alt={`${subtitle} Profile`}
            />
          </div>

          <hr />
        </div>
      </div>

      <p className="mt-3">{description}</p>
    </div>
  )
  return (
    <article>
      {bodyUrl ? (
        <Link href={bodyUrl}>
          <a>{cardElement}</a>
        </Link>
      ) : (
        cardElement
      )}
    </article>
  )
}

export default Card
