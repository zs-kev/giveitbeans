import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-darkpattern">
      <div>
        <p className="font-Guy text-8xl text-white text-center">
          Quality coffee sourced globally
        </p>
      </div>
      <div>
        <Image
          src="/assets/logo/Logo-vertical-white.svg"
          alt="Give it beans"
          width={153}
          height={87}
          className="mx-auto"
        />
        <div className="flex items-center justify-center">
          <Link href={''}>Terms & Conditions</Link>
          <Link href={''}>Privacy Policy</Link>
          <p className="text-muted text-base">
            &copy; Give It Beans {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
