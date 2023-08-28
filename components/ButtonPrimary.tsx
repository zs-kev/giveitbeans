import { ArrowDownRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { Button } from './ui/Button';

interface ButtonPrimaryProps {
  link: string;
  icon?: ReactNode;
  children: string;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  link,
  icon = <ArrowDownRightIcon />,
  children,
}) => {
  return (
    <Button asChild>
      <Link
        href={link}
        className="pl-8 py-4 group ease-in-out duration-300 relative z-50"
      >
        {children}
        <span className="w-14 h-14 p-3 ml-6 rounded-full bg-accent ease-in-out duration-300 group-hover:-rotate-45">
          {icon}
        </span>
      </Link>
    </Button>
  );
};

export default ButtonPrimary;
