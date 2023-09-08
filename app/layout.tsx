import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/global-reset.css';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Give It Beans',
  description: 'Experience speciality coffee like never before',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-lightpattern">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
