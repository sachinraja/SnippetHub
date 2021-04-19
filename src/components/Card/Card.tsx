import { ChevronUpIcon } from '@heroicons/react/outline'
import { useEffect, useRef, useState } from 'react'
import FadeIn from '@components/FadeIn/FadeIn'
import Link from 'next/link'
import languages from '@lib/language/language'
import type { Language } from '@prisma/client'
import type { ReactNode } from 'react'

export interface CardProps {
  bodyUrl?: string
  count: string | number
  description: string
  imageUrl: string
  language: Language
  subtitle: string
  title: string
}

const Card = ({
  bodyUrl,
  count,
  description,
  imageUrl,
  language,
  subtitle,
  title,
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
    <FadeIn>
      <WithLink>
        <div className="bg-opacity-80 border-carbon-500 border-1 rounded p-2 transform motion-safe:hover:-translate-y-0.5 hover:border-carbon-50 transition-colors duration-500">
          <div className="flex flex-wrap">
            <section ref={header} className="flex-grow mr-2">
              <section>
                <h3 className="font-mono text-gray-400 leading-none tracking-tighter text-sm">
                  {subtitle}/
                </h3>
              </section>

              <h2 className="font-extrabold font-mono text-lg">{title}</h2>
            </section>

            <section
              ref={attributes}
              className={`whitespace-nowrap font-inter font-bold grid grid-cols-1${
                attributesFloatedRight ? ' justify-items-end' : ''
              }`}
            >
              <div>
                <div className="inline-block border-blue-500 border-2 rounded-sm">
                  <ChevronUpIcon className="w-6 inline text-blue-600" />

                  <p className="inline mx-1 text-blue-400">{count}</p>
                </div>
              </div>

              <div className="mt-1">
                <div
                  className={`inline-flex items-center border-${languageAttributes.color}-500 border-2 rounded-sm`}
                >
                  <svg
                    className="ml-1 my-1 w-5 inline-block"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={languageAttributes.icon.path}
                      fill={languageAttributes.iconColor}
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
                  alt={`${subtitle} Profile`}
                  className="rounded-full"
                  src={imageUrl}
                />
              </div>

              <hr />
            </div>
          </div>

          <p className="mt-3">{description}</p>
        </div>
      </WithLink>
    </FadeIn>
  )
}

export default Card
