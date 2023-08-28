import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-darkpattern">
      <div>
        <p>Quality coffee sourced globally</p>
      </div>
      <div>
        <div>
          <Link href={''}>Terms & Conditions</Link>
          <Link href={''}>Privacy Policy</Link>
          <p>Give It Beans</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
