import { FormEventHandler, forwardRef } from 'react'
import TextInput from './TextInput'

interface SearchInputProps {
  placeholder: string
  onSubmit?: FormEventHandler<HTMLFormElement>
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder, onSubmit }: SearchInputProps, ref) => {
    return (
      <div className="mt-10 flex justify-between">
        <form
          className="bg-carbon-900 focus-within:ring-carbon-500 focus-within:ring-2 rounded-md inline-flex flex-grow transition-all duration-500"
          onSubmit={onSubmit}
        >
          <TextInput id="search" placeholder={placeholder} ref={ref}>
            <button type="submit">
              <div className="inline-flex items-center hover:bg-carbon-500 p-2 cursor-pointer transition-colors duration-300 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={35}
                  height={35}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </button>
          </TextInput>
        </form>
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

SearchInput.defaultProps = {
  onSubmit: undefined,
}

export default SearchInput
