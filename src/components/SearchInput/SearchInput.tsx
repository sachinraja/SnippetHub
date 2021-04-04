import { FormEventHandler, forwardRef, useState } from 'react'

interface SearchInputProps {
  defaultValue?: string
  onSubmit?: FormEventHandler<HTMLFormElement>
  placeholder: string
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ defaultValue, onSubmit, placeholder }: SearchInputProps, ref) => {
    const [value, setValue] = useState(defaultValue)

    return (
      <div className="mt-10 flex justify-between">
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
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder={placeholder}
            type="text"
            value={value}
          />
          <button type="submit">
            <div className="inline-flex items-center hover:bg-carbon-500 p-2 cursor-pointer transition-colors duration-300 rounded-md">
              <svg
                fill="none"
                height={35}
                stroke="currentColor"
                viewBox="0 0 24 24"
                width={35}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
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
