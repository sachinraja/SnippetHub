import { useRef } from 'react'
import { useRouter } from 'next/dist/client/router'
import Header from '@components/Header/Header'
import Heading from '@components/Heading/Heading'
import Image from 'next/image'
import SearchInput from '@components/SearchInput/SearchInput'

interface HeroProps {
  searchInputValue?: string
}
const Hero = ({ searchInputValue }: HeroProps) => {
  const router = useRouter()
  const textInput = useRef<HTMLInputElement>(null)

  return (
    <Header>
      <section className="md:w-1/2">
        <Heading priority={1} size={4} bold>
          <span>SnippetHub</span>
        </Heading>

        <Heading className="mt-3" priority={2} size={1}>
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
          placeholder="Search for a snippet..."
        />
      </section>

      <section className="md:w-1/2">
        <div className="relative h-full">
          <Image src="/logo.svg" layout="fill" aria-hidden />
        </div>
      </section>
    </Header>
  )
}

Hero.defaultProps = {
  searchInputValue: '',
}

export default Hero
