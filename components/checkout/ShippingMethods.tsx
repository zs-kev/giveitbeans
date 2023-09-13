'use client';

import { useCart } from '@/context/CartContext';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { FC, useEffect, useState } from 'react';

interface ShippingMethodsProps {
  setShippingCost: (cost: number) => void;
}

interface ShippingMethod {
  id: number;
  title: string;
  method_id: string;
  settings: {
    cost?: {
      value: string;
    };
    min_amount?: {
      value: string;
    };
    requires?: {
      value: 'either' | 'coupon' | 'min_amount';
    };
  };
}

const ShippingMethods: FC<ShippingMethodsProps> = ({ setShippingCost }) => {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { cartTotal } = useCart();

  const isFreeShipping = () => {
    return cartTotal >= 699.99;
  };

  const [selectedMethod, setSelectedMethod] = useState(
    isFreeShipping() ? 'free_shipping' : 'flat_rate'
  );

  useEffect(() => {
    setIsLoading(true);
    const api = new WooCommerceRestApi({
      url: 'https://giveitbeans.cloudaccess.host/',
      consumerKey: process.env.NEXT_PUBLIC_WOO_LIVE_CONSUMER!,
      consumerSecret: process.env.NEXT_PUBLIC_WOO_LIVE_SECRET!,
      version: 'wc/v3',
    });

    api
      .get('shipping/zones/1/methods')
      .then((response) => {
        setShippingMethods(response.data);

        // Default to flat rate or free if allowed
        const defaultShippingId = isFreeShipping()
          ? 'free_shipping'
          : 'flat_rate';
        const defaultMethod = response.data.find(
          (method: { method_id: string }) =>
            method.method_id === defaultShippingId
        );
        if (defaultMethod) {
          setSelectedMethod(defaultMethod.method_id);
          const defaultCost = defaultMethod.settings.cost?.value
            ? parseFloat(defaultMethod.settings.cost.value)
            : 0;
          setShippingCost(defaultCost);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          'Something went wrong tying to fetch the shipping options. Please try reloading the page.'
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="pb-5">Shipping Method</h2>
      {isLoading ? (
        <p>Fetching shipping options...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {shippingMethods.map((method) => {
            if (method.method_id === 'free_shipping' && isFreeShipping()) {
              return (
                <div
                  key={method.id}
                  className="flex items-center justify-between gap-5"
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={method.method_id}
                    checked={selectedMethod === method.method_id}
                    disabled={
                      !isFreeShipping() && method.method_id === 'free_shipping'
                    }
                    onChange={() => {
                      setSelectedMethod(method.method_id);
                      const cost = method.settings.cost
                        ? parseFloat(method.settings.cost.value)
                        : 0;
                      setShippingCost(cost);
                    }}
                  />
                  <label className="flex items-center justify-between w-full">
                    <p>{method.title}</p>
                    <p>R0.00</p>
                  </label>
                </div>
              );
            } else {
              const cost = method.settings.cost?.value
                ? parseFloat(method.settings.cost.value)
                : 0;
              return (
                <div
                  key={method.id}
                  className="flex items-center justify-between gap-5"
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={method.method_id}
                    checked={selectedMethod === method.method_id}
                    disabled={
                      !isFreeShipping() && method.method_id === 'free_shipping'
                    }
                    onChange={() => {
                      setSelectedMethod(method.method_id);
                      const cost = method.settings.cost?.value
                        ? parseFloat(method.settings.cost.value)
                        : 0;
                      setShippingCost(cost);
                    }}
                  />
                  <label className="flex items-center justify-between w-full">
                    <p>{method.title}</p>
                    <p>R{cost.toFixed(2)}</p>
                  </label>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default ShippingMethods;
