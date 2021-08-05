import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Container from '@components/containers/Container'
import type { ComponentProps, ReactNode } from 'react'

type FAQDisclosureProps = {
  question: string
  answer: ReactNode
}

const FAQDisclosure = ({ question, answer }: FAQDisclosureProps) => {
  const iconProps: ComponentProps<'svg'> = {
    className: 'text-carbon-400',
    'aria-hidden': true,
    width: 35,
  }

  return (
    <Disclosure as="div" className="p-2 bg-carbon-800 rounded-md">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full text-2xl">
            {open ? (
              <ChevronRightIcon {...iconProps} />
            ) : (
              <ChevronDownIcon {...iconProps} />
            )}

            {question}
          </Disclosure.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="-translate-y-8 opacity-0"
            leave="transition duration-75 ease-out"
            leaveFrom="opacity-100"
            leaveTo="transform -translate-y-8 opacity-0"
          >
            <Disclosure.Panel className="text-lg" static>
              {answer}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

const questionsAndAnswers: FAQDisclosureProps[] = [
  {
    question: "Isn't this just Gists?",
    answer: (
      <p>
        SnippetHub focuses on <strong>organization</strong>,{' '}
        <strong>presentation</strong>, and <strong>discoverability</strong>.
        Snippets are organized in packs, each attributed to a user. Packs are
        also displayed in friendly, readable way, accompanied by all relevant
        information. Authors have the ability to describe their packs using a
        short description (displayed on the pack&apos;s card) and a long
        (markdown) description.
      </p>
    ),
  },
]

const faqPage = () => (
  <Container meta={{ title: 'FAQ' }}>
    <section className="m-auto mt-4 w-2/3 md:w-1/2">
      <h1 className="p-2 text-3xl text-center text-white">FAQ</h1>
    </section>

    <div className="flex flex-col mx-6 sm:mx-20 md:mx-44 space-y-4">
      {questionsAndAnswers.map(({ question, answer }) => (
        <FAQDisclosure key={question} question={question} answer={answer} />
      ))}
    </div>
  </Container>
)

export default faqPage
