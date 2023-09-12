import { CartItem } from '@/context/CartContext';
import Image from 'next/image';
import { FC } from 'react';

interface OrderSummeryProps {
  cartItems: CartItem[];
  shippingCost: number;
}

const OrderSummery: FC<OrderSummeryProps> = ({ cartItems, shippingCost }) => {
  const calculateSubTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.productInfo.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubTotal();
  const vat = subtotal * 0.15;
  const total = subtotal + shippingCost;

  return (
    <div>
      <h2>Order Summery</h2>
      <div>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.productInfo.name} className="flex items-center">
                <Image
                  src={item.productInfo.image}
                  width={86}
                  height={305}
                  alt={item.productInfo.name}
                />
                <div className="pr-6">
                  <p>{item.productInfo.name}</p>
                  <p>{item.quantity}</p>
                </div>
                <p>R{item.productInfo.price}</p>
              </div>
            ))}
            <div>
              <div>
                <p>Subtotal:</p>
                <p>R{subtotal}</p>
              </div>
              <div>
                <p>VAT (15%):</p>
                <p>R{vat.toFixed(2)}</p>
              </div>
              <div>
                <p>Shipping:</p>
                <p>R{shippingCost.toFixed(2)}</p>
              </div>
              <div>
                <p>Total:</p>
                <p>R{total.toFixed(2)}</p>
              </div>
            </div>
          </>
        ) : (
          <div>Your cart is empty.</div>
        )}
      </div>
    </div>
  );
};

export default OrderSummery;
