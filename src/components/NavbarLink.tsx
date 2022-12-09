import { IconType } from 'react-icons/lib';
import { Link } from 'react-router-dom';

type NavbarLinkProps = {
  children: React.ReactNode;
};

function NavbarLink({ children }: NavbarLinkProps) {
  return (
    <div className='border border-gray-300 flex gap-2 items-center p-2 rounded-md hover:text-white hover:bg-emerald-600'>
      {children}
    </div>
  );
}

export default NavbarLink;
