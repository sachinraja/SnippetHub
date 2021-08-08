export type PageNumbersProps = {
  range: number
  className?: string
  constructHref: (index: number) => string
  onPageClick: (index: number) => void
}

const PageNumbers = ({
  range,
  className,
  constructHref,
  onPageClick,
}: PageNumbersProps) => (
  <div className={`flex flex-row space-x-4 w-full ${className}`}>
    {Array.from({ length: range }).map((_, index) => {
      const href = constructHref(index)
      return (
        // we don't use the <Link> component here because
        // we don't need prefetching on hover, the link
        // should only work if the user clicks in a new tab
        <a
          href={href}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="p-2 w-full text-xl text-center text-carbon-300 bg-carbon-700 hover:bg-carbon-600 rounded-md transition-colors"
          onClick={(e) => {
            // allow user to open in new tab but optimize for button click
            e.preventDefault()

            onPageClick(index)
          }}
        >
          {index + 1}
        </a>
      )
    })}
  </div>
)

PageNumbers.defaultProps = {
  className: '',
}

export default PageNumbers
