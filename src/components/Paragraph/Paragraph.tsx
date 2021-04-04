interface ParagraphProps {
  center?: boolean
  children: React.ReactNode
  className?: string
  size: 1 | 2 | 3 | 4
}

const Paragraph = ({ center, children, className, size }: ParagraphProps) => {
  let textSizeClass: string

  switch (size) {
    default:
      textSizeClass = 'base'
      break
    case 1:
      textSizeClass = 'xs'
      break
    case 2:
      textSizeClass = 'sm'
      break
    case 3:
      textSizeClass = 'base'
      break
    case 4:
      textSizeClass = 'lg'
      break
  }

  return (
    <p
      className={`${className} text-${textSizeClass}${
        center ? ' text-center' : ''
      }`}
    >
      {children}
    </p>
  )
}

Paragraph.defaultProps = {
  center: false,
  className: '',
}

export default Paragraph
