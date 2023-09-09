'use client';

import { MapPinIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import {
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

const mainPages: { page: string; path: string }[] = [
  { page: 'Shop', path: '/shop' },
  { page: 'Subscription', path: '/subscription' },
  { page: 'Learn', path: '/learn' },
  { page: 'Conact', path: '/contact' },
];

const iconPages: {
  page: string;
  path: string;
  icon: ReactNode;
  customClass?: string;
}[] = [
  {
    page: 'Cart',
    path: '/cart',
    icon: <ShoppingCartIcon className="w-4" />,
  },
  {
    page: 'Store Locator',
    path: '/location',
    icon: <MapPinIcon className="w-4" />,
    customClass: 'hidden md:flex',
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const currentRoute = usePathname();
  return (
    //   <header>
    //     <motion.nav
    //       variants={{
    //         hidden: { opacity: 0, y: 25 },
    //         visible: { opacity: 1, y: 0 },
    //       }}
    //       initial="hidden"
    //       animate="visible"
    //       transition={{ duration: 0.5 }}
    //       className="flex items-center justify-between max-w-screen-2xl mx-6 md:mx-8 2xl:mx-auto py-16"
    //     >
    //       <Link href={'/'}>
    //         <Image
    //           src="/assets/logo/logo-dark.svg"
    //           alt="Give it beans"
    //           width={207}
    //           height={37}
    //           priority
    //         />
    //       </Link>
    //       <div className="hidden sm:flex items-center gap-10">
    //         {mainPages.map(({ page, path }) => (
    //           <Link href={path} key={page}>
    //             {page}
    //           </Link>
    //         ))}
    //       </div>
    //       <div className="hidden lg:flex items-center gap-5">
    //         {iconPages.map(({ page, path, icon }) => (
    //           <Link
    //             href={path}
    //             key={page}
    //             className="text-primary flex items-center gap-2"
    //           >
    //             {icon}
    //             {page}
    //           </Link>
    //         ))}
    //       </div>
    //     </motion.nav>
    //   </header>
    // );
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      position="static"
      className="py-6 z-50 bg-lightpattern"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href={'/'}>
            <Image
              src="/assets/logo/logo-dark.svg"
              alt="Give it beans"
              width={207}
              height={37}
              priority
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {mainPages.map(({ page, path }) => (
          <NavbarItem key={page}>
            <Link href={path}>{page}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {iconPages.map(({ page, path, icon, customClass }) => (
          <NavbarItem key={page}>
            <Link
              href={path}
              className={`text-primary flex items-center gap-2 ${customClass}`}
            >
              {icon}
              {page}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu className="mt-6 bg-lightpattern">
        {mainPages.map(({ page, path }) => (
          <NavbarMenuItem key={page}>
            <Link href={path}>{page}</Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link href={iconPages[1].path}>{iconPages[1].page}</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
