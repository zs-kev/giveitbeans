import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-darkpattern">
      <div className="py-16 md:py-24 lg:py-32 max-w-4xl mx-auto px-6 md:px-8 lg:px-0">
        <p className="font-Guy text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-white text-center">
          Quality coffee sourced globally
        </p>
      </div>
      <hr className="max-w-screen-2xl border-muted mx-6 md:mx-8 2xl:mx-auto " />
      <div className="pt-12 md:pt-16 lg:pt-24 pb-16 px-6 md:px-8 lg:px-0">
        <Image
          src="/assets/logo/logo-vertical-white.svg"
          alt="Give it beans"
          width={153}
          height={87}
          className="mx-auto pb-10 md:pb-14"
        />
        <div className="flex items-center justify-center flex-col sm:flex-row">
          <Link href={''}>Terms & Conditions</Link>
          <Link href={''} className="mx-10">
            Privacy Policy
          </Link>
          <p className="text-muted text-base">
            &copy; Give It Beans {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
