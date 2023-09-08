'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  product: any;
  quantity: number;
  variationId: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: any, quantity: number, variationId: number) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, quantity: number, variationId: number) => {
    const newCartItem = {
      product,
      quantity,
      variationId,
    };

    const existingCartItemIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id && item.variationId === variationId
    );

    if (existingCartItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingCartItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, newCartItem]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};