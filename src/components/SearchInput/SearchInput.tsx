import { FormEventHandler, forwardRef } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

interface SearchInputProps {
  defaultValue?: string
  onSubmit?: FormEventHandler<HTMLFormElement>
  placeholder: string
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ defaultValue, onSubmit, placeholder }: SearchInputProps, ref) => {
    return (
      <div className="mt-10 flex justify-between w-5/6 focus-within:w-full transition-all">
        <form
          className="bg-carbon-900 focus-within:ring-carbon-500 focus-within:ring-2 shadow-md rounded-md inline-flex flex-grow transition-all duration-500"
          onSubmit={onSubmit}
        >
          <input
            ref={ref}
            autoComplete="off"
            className="text-xl bg-carbon-900 rounded-md w-full border-0 focus:ring-0"
            id="search"
            name="search"
            placeholder={placeholder}
            type="text"
            defaultValue={defaultValue}
          />
          <button type="submit" name="Search">
            <div className="inline-flex items-center hover:bg-carbon-500 p-2 cursor-pointer transition-colors duration-300 rounded-md">
              <SearchIcon height={35} width={35} />
            </div>
          </button>
        </form>
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

SearchInput.defaultProps = {
  defaultValue: '',
  onSubmit: undefined,
}

export default SearchInput
