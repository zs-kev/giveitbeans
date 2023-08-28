'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainPages: { page: string; path: string }[] = [
  { page: 'Shop', path: '/shop' },
  { page: 'Subscription', path: '/subscription' },
  { page: 'Learn', path: '/learn' },
];

const iconPages: { page: string; path: string; icon: string }[] = [
  { page: 'Contact', path: '/contact', icon: '' },
  { page: 'Store Locator', path: '/store-locator', icon: '' },
];

function Header() {
  const currentRoute = usePathname();
  return (
    <header>
      <nav>
        <Link href={'/'}>
          <Image
            src="/assets/logo/logo-dark.svg"
            alt="Give it beans"
            width={207}
            height={37}
          />
        </Link>
        <div>
          {mainPages.map(({ page, path }) => (
            <Link href={path} key={page}>
              {page}
            </Link>
          ))}
        </div>
        <div>
          {iconPages.map(({ page, path }) => (
            <Link href={path} key={page}>
              {page}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
