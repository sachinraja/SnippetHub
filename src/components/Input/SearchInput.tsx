import TextInput from './TextInput';

interface SearchInputProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  return (
    <div className="mt-10 flex justify-between">
      <div className="bg-carbon-900 focus-within:ring-carbon-500 focus-within:ring-2 rounded-md inline-flex flex-grow transition-all ease-in-out duration-500">
        <TextInput id="search" placeholder={placeholder}>
          <div className="inline-flex items-center p-2">
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
        </TextInput>
      </div>
    </div>
  );
};

export default SearchInput;
