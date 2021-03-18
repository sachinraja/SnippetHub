interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size: 1 | 2 | 3 | 4;
}

const Paragraph = ({ children, className, size }: ParagraphProps) => {
  let textSizeClass: string;

  switch (size) {
    default:
      textSizeClass = 'base';
      break;
    case 1:
      textSizeClass = 'xs';
      break;
    case 2:
      textSizeClass = 'sm';
      break;
    case 3:
      textSizeClass = 'base';
      break;
    case 4:
      textSizeClass = 'lg';
      break;
  }

  return <p className={`${className} text-${textSizeClass}`}>{children}</p>;
};

Paragraph.defaultProps = {
  className: '',
};

export default Paragraph;
