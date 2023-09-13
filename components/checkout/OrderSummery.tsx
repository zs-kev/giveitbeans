import { CartItem, useCart } from '@/context/CartContext';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';
import { FC } from 'react';

interface OrderSummeryProps {
  cartItems: CartItem[];
  shippingCost: number;
}

const OrderSummery: FC<OrderSummeryProps> = ({ cartItems, shippingCost }) => {
  const { cartTotal } = useCart();

  const vat = cartTotal * 0.15;
  const total = cartTotal + shippingCost;

  return (
    <div>
      <h2 className="pb-5">Order Summery</h2>
      <div>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div
                key={`${item.productInfo.name}-${index}`}
                className="flex items-start gap-4"
              >
                <Image
                  src={item.productInfo.image}
                  width={86}
                  height={305}
                  alt={item.productInfo.name}
                />
                <div className="flex items-start justify-between w-full">
                  <div className="pr-6">
                    <p className="font-Guy text-2xl">{item.productInfo.name}</p>
                    <p className="text-base -mt-2">Quantity: {item.quantity}</p>
                  </div>
                  <p>R{item.productInfo.price}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <Divider />
              <div className="flex items-start justify-between">
                <p>Subtotal:</p>
                <p>R{cartTotal}</p>
              </div>
              <div className="flex items-start justify-between">
                <p>VAT (15%):</p>
                <p>R{vat.toFixed(2)}</p>
              </div>
              <div className="flex items-start justify-between">
                <p>Shipping:</p>
                <p>R{shippingCost.toFixed(2)}</p>
              </div>
              <Divider />
              <div className="flex items-start justify-between">
                <p className="font-Guy">Total:</p>
                <p className="font-Guy">R{total.toFixed(2)}</p>
              </div>
              <Divider />
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
