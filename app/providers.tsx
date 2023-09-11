'use client';

import { CartProvider } from '@/context/CartContext';
import UserProvider from '@/context/UserContext';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </NextUIProvider>
  );
}
