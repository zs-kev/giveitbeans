'use client';

import { CartProvider } from '@/context/CartContext';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <CartProvider>{children}</CartProvider>
    </NextUIProvider>
  );
}
