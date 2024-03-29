import { useRef } from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Header from '@components/header/Header'
import Heading from '@components/Heading'
import SearchInput from '@components/hero/SearchInput'
import logo from 'assets/logo.svg'

interface HeroProps {
  searchInputValue?: string
}
const Hero = ({ searchInputValue }: HeroProps) => {
  const router = useRouter()
  const textInput = useRef<HTMLInputElement>(null)
  return (
    <Header className="flex">
      <section className="md:w-1/2">
        <Heading priority={1} size="4xl" bold>
          SnippetHub
        </Heading>

        <Heading className="mt-3" priority={2} size="xl">
          A home for snippets across various languages.
        </Heading>

        <SearchInput
          ref={textInput}
          defaultValue={searchInputValue}
          onSubmit={(e) => {
            e.preventDefault()

            const searchValue = textInput.current?.value.trim()
            if (!searchValue) return

            router.push({ pathname: '/search', query: { q: searchValue } })
          }}
          placeholder="Search for a pack..."
        />
      </section>

      <section className="hidden sm:flex flex-grow justify-center items-center mx-4">
        <Image
          src={logo}
          width={170}
          height={170}
          alt="SnippetHub logo"
          aria-hidden
        />
      </section>
    </Header>
  )
}

Hero.defaultProps = {
  searchInputValue: '',
}

export default Hero
