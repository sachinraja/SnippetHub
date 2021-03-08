import type { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  className?: string;
  priority: number;
  size: number;
  bold: boolean;
  center: boolean;
}
const Heading = ({
  children,
  className,
  priority,
  size,
  bold,
  center,
}: HeadingProps) => {
  const Tag = `h${priority}` as keyof JSX.IntrinsicElements;
  const textSizeClass = size === 1 ? 'text-xl' : `text-${size}xl`;
  return (
    <Tag
      className={`${className} ${textSizeClass}${bold ? ' font-bold' : ''}${
        center ? ' text-center' : ''
      }`}
    >
      {children}
    </Tag>
  );
};

Heading.defaultProps = {
  className: '',
};

export default Heading;
