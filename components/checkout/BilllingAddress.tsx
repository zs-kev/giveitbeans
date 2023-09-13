'use client';

import { UserContext } from '@/context/UserContext';
import { defaultAddress } from '@/lib/utils/addressConstraints';
import { DefaultAddress } from '@/types';
import { Checkbox } from '@nextui-org/react';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { FC, useContext, useEffect, useState } from 'react';
import AddressForm from './AddressForm';

interface BillingAddressProps {
  shippingAddress: typeof defaultAddress;
}

const BillingAddress: FC<BillingAddressProps> = ({ shippingAddress }) => {
  const [address, setAddress] = useState(defaultAddress);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false);
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
            const { billing } = userDetails;
            setAddress((prevState) => ({ ...prevState, ...billing }));
            if (isUserLoggedIn && addressesAreEqual(shippingAddress, billing)) {
              setUseShippingAsBilling(true);
            }
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
  }, [isUserLoggedIn, currentUserEmail]);

  const addressesAreEqual = (addr1: DefaultAddress, addr2: DefaultAddress) => {
    return Object.keys(defaultAddress).every(
      (key) =>
        addr1[key as keyof DefaultAddress] !== '' &&
        addr1[key as keyof DefaultAddress] ===
          addr2[key as keyof DefaultAddress]
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseShippingAsBilling(e.target.checked);
    if (e.target.checked) {
      setAddress(shippingAddress);
    } else {
      setAddress(defaultAddress);
    }
  };

  return (
    <>
      <div className="flex items-end justify-between pb-5">
        <h2>Billing Address</h2>
        <p>*Required</p>
      </div>
      <div>
        <Checkbox
          checked={useShippingAsBilling}
          onChange={handleCheckboxChange}
          className="mb-4"
        >
          Same as Shipping Address
        </Checkbox>
      </div>
      {isLoading ? (
        <p>Loading Billing Details</p>
      ) : (
        <AddressForm addressData={address} />
      )}
    </>
  );
};

export default BillingAddress;
