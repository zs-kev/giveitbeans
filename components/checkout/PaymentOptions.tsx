'use client';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { FC, useEffect, useState } from 'react';

interface PaymentOptionsProps {
  setPaymentOption: (id: number) => void;
}

interface PaymentMethod {
  id: number;
  title: string;
  enabled: boolean;
}

const PaymentOptions: FC<PaymentOptionsProps> = ({ setPaymentOption }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const api = new WooCommerceRestApi({
      url: 'https://giveitbeans.cloudaccess.host/',
      consumerKey: process.env.NEXT_PUBLIC_WOO_LIVE_CONSUMER!,
      consumerSecret: process.env.NEXT_PUBLIC_WOO_LIVE_SECRET!,
      version: 'wc/v3',
    });

    api
      .get('payment_gateways')
      .then((response) => {
        setPaymentMethods(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          'Something went wrong tying to fetch the payment options. Please try reloading the page.'
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="pb-5">Payment Options</h2>
      {isLoading ? (
        <p>Fetching payment options...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {paymentMethods.map((method) => {
            if (method.enabled) {
              return (
                <div
                  key={method.id}
                  className="flex items-center justify-between gap-5"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => {
                      setSelectedMethod(method.id);
                      setPaymentOption(method.id);
                    }}
                  />
                  <label className="flex items-center justify-between w-full">
                    <p>{method.title}</p>
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

export default PaymentOptions;
