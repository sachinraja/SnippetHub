import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}
const Header = ({ children }: HeaderProps) => {
  return (
    <div className="bg-gradient-to-b from-carbon-800 to-carbon-900 py-10">
      <div className="mx-12 flex">{children}</div>
    </div>
  );
};

export default Header;
