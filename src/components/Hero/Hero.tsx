import { useRef } from 'react'
import { useRouter } from 'next/dist/client/router'
import Header from '@components/Header/Header'
import Heading from '@components/Heading/Heading'
import Image from 'next/image'
import SearchInput from '@components/Input/SearchInput'

const Hero = () => {
  const router = useRouter()
  const textInput = useRef<HTMLInputElement>(null)

  return (
    <Header>
      <section className="md:w-1/2">
        <Heading priority={1} size={4} bold center={false}>
          SnippetHub
        </Heading>

        <Heading
          className="mt-3"
          priority={2}
          size={1}
          bold={false}
          center={false}
        >
          A home for snippets across various languages.
        </Heading>

        <SearchInput
          placeholder="Search for a snippet..."
          ref={textInput}
          onSubmit={(e) => {
            e.preventDefault()

            const searchValue = textInput.current?.value.trim()
            if (!searchValue) return

            router.push(`/search?q=${searchValue}`)
          }}
        />
      </section>

      <section className="md:w-1/2">
        <div className="relative h-full">
          <Image
            layout="fill"
            objectFit="contain"
            src="/logo.svg"
            alt="SnippetHub Logo"
          />
        </div>
      </section>
    </Header>
  )
}

export default Hero
