interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const Paragraph = ({ children, className }: ParagraphProps) => {
  return <p className={`${className}`}>{children}</p>;
};

Paragraph.defaultProps = {
  className: '',
};

export default Paragraph;
