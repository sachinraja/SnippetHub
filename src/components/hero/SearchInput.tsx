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
      <div className="flex justify-between mt-10 w-5/6 focus-within:w-full transition-all">
        <form
          className="inline-flex flex-grow bg-carbon-900 rounded-md focus-within:ring-2 focus-within:ring-carbon-500 shadow-md transition-all duration-500"
          onSubmit={onSubmit}
        >
          <input
            ref={ref}
            autoComplete="off"
            className="w-full text-xl bg-carbon-900 rounded-md border-0 focus:ring-0"
            placeholder={placeholder}
            type="text"
            defaultValue={defaultValue}
          />
          <button type="submit" name="Search">
            <div className="inline-flex items-center p-2 hover:bg-carbon-500 rounded-md transition-colors duration-300 cursor-pointer">
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
