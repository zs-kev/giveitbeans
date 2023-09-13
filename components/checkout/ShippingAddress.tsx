'use client';

import { UserContext } from '@/context/UserContext';
import { defaultAddress } from '@/lib/utils/addressConstraints';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { FC, useContext, useEffect, useState } from 'react';
import AddressForm from './AddressForm';

interface ShippingAddressProps {
  onShippingAddressChange: (address: typeof defaultAddress) => void;
}

const ShippingAddress: FC<ShippingAddressProps> = ({
  onShippingAddressChange,
}) => {
  const [address, setAddress] = useState(defaultAddress);
  const [isLoading, setIsLoading] = useState(false);
  const { isUserLoggedIn, currentUserEmail } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    if (isUserLoggedIn) {
      const api = new WooCommerceRestApi({
        url: 'https://giveitbeans.cloudaccess.host/',
        consumerKey: process.env.NEXT_PUBLIC_WOO_LIVE_CONSUMER!,
        consumerSecret: process.env.NEXT_PUBLIC_WOO_LIVE_SECRET!,
        version: 'wc/v3',
      });

      api
        .get('customers', { email: currentUserEmail })
        .then((response) => {
          const userDetails = response.data[0];
          if (userDetails) {
            const { shipping } = userDetails;
            setAddress((prevState) => ({ ...prevState, ...shipping }));
            onShippingAddressChange(address);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
    onShippingAddressChange(address);
  }, [isUserLoggedIn, currentUserEmail]);

  const handleAddressChange = (
    key: keyof typeof defaultAddress,
    value: string
  ) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
    onShippingAddressChange({ ...address, [key]: value });
  };

  return (
    <>
      <div className="flex items-end justify-between pb-5">
        <h2>Shipping Address</h2>
        <p>*Required</p>
      </div>
      {isLoading ? (
        <p>Loading Shipping Details</p>
      ) : (
        <AddressForm
          addressData={address}
          onAddressChange={handleAddressChange}
        />
      )}
    </>
  );
};

export default ShippingAddress;
