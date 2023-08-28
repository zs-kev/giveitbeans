'use client';

import Image from 'next/image';
import Link from 'next/link';

// const mainPages: { page: string; path: string }[] = [
//   { page: 'Shop', path: '/shop' },
//   { page: 'Subscription', path: '/subscription' },
//   { page: 'Learn', path: '/learn' },
//   { page: 'Conact', path: '/contact' },
// ];

// const iconPages: { page: string; path: string; icon: ReactNode }[] = [
//   {
//     page: 'Cart',
//     path: '/cart',
//     icon: <ShoppingCartIcon className="w-4" />,
//   },
//   {
//     page: 'Store Locator',
//     path: '/store-locator',
//     icon: <MapPinIcon className="w-4" />,
//   },
// ];

function Header() {
  // const currentRoute = usePathname();
  return (
    <header>
      <nav className="flex items-center justify-between max-w-screen-2xl mx-6 md:mx-8 2xl:mx-auto py-16">
        <Link href={'/'}>
          <Image
            src="/assets/logo/logo-dark.svg"
            alt="Give it beans"
            width={207}
            height={37}
          />
        </Link>
        {/* <div className="flex items-center gap-10">
          {mainPages.map(({ page, path }) => (
            <Link href={path} key={page}>
              {page}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {iconPages.map(({ page, path, icon }) => (
            <Link
              href={path}
              key={page}
              className="text-primary flex items-center gap-2"
            >
              {icon}
              {page}
            </Link>
          ))}
        </div> */}
      </nav>
    </header>
  );
}

export default Header;
