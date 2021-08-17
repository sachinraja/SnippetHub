export type PageNumbersProps = {
  range: number
  max?: number
  className?: string
  constructHref: (index: number) => string
  onPageClick: (index: number) => void
}

const PageNumbers = ({
  range,
  max,
  className,
  constructHref,
  onPageClick,
}: PageNumbersProps) => {
  let normalizedRange = range

  if (max) {
    // no point in doing it on the last one
    normalizedRange = range - 1 > max ? max : range
  }

  const classNames =
    'p-2 w-full text-xl text-center text-carbon-300 bg-carbon-700 rounded-md'

  const hoverClassNames = `${classNames} hover:bg-carbon-600 transition-colors`

  return (
    <div className={`flex flex-row space-x-4 w-full ${className}`}>
      {Array.from({ length: normalizedRange }).map((_, index) => {
        const href = constructHref(index)
        return (
          // we don't use the <Link> component here because
          // we don't need prefetching on hover, the link
          // should only work if the user clicks in a new tab
          <a
            href={href}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={hoverClassNames}
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

      {normalizedRange < range && (
        <>
          <div className={classNames}>...</div>
          <a
            href={constructHref(range - 1)}
            className={hoverClassNames}
            onClick={(e) => {
              e.preventDefault()

              onPageClick(range - 1)
            }}
          >
            {range}
          </a>
        </>
      )}
    </div>
  )
}

PageNumbers.defaultProps = {
  className: '',
}

export default PageNumbers
