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
  const HTag = `h${priority}` as keyof JSX.IntrinsicElements;
  const textSizeClass = size === 1 ? 'text-xl' : `text-${size}xl`;
  return (
    <HTag
      className={`${className} ${textSizeClass}${bold ? ' font-bold' : ''}${
        center ? ' text-center' : ''
      }`}
    >
      {children}
    </HTag>
  );
};

Heading.defaultProps = {
  className: '',
};

export default Heading;
