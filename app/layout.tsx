import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import '@/styles/global-reset.css';
import '@/styles/globals.css';
import type { Metadata } from 'next';

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
    <CartProvider>
      <html lang="en">
        <body className="bg-lightpattern">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </CartProvider>
  );
}
