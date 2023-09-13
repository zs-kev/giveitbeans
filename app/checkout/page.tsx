'use client';

import BillingAddress from '@/components/checkout/BilllingAddress';
import OrderSummery from '@/components/checkout/OrderSummery';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import ShippingAddress from '@/components/checkout/ShippingAddress';
import ShippingMethods from '@/components/checkout/ShippingMethods';
import Login from '@/components/userAccount/Login';
import Signup from '@/components/userAccount/Signup';
import { useCart } from '@/context/CartContext';
import { UserContext } from '@/context/UserContext';
import { defaultAddress } from '@/lib/utils/addressConstraints';
import { Button, Checkbox, Divider, Input } from '@nextui-org/react';
import { useContext, useMemo, useState } from 'react';

const CheckoutPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingAddress, setShippingAddress] = useState(defaultAddress);
  const [billingAddress, setBillingAddress] = useState(defaultAddress);
  const [paymentOption, setPaymentOption] = useState(0);

  const {
    isUserLoggedIn,
    loginUser,
    logoutUser,
    currentUserEmail,
    setCurrentUserEmail,
  } = useContext(UserContext);

  const { cart } = useCart();

  const emailError = formSubmitted && !guestEmail ? 'invalid' : 'valid';

  const validateEmail = (guestEmail: string) =>
    guestEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validationState = useMemo(() => {
    if (guestEmail === '') return undefined;

    return validateEmail(guestEmail) ? 'valid' : 'invalid';
  }, [guestEmail]);

  const handleSignOut = () => {
    logoutUser();
    setCurrentUserEmail('');
  };

  console.log(shippingCost);
  console.log(shippingAddress);
  console.log(billingAddress);
  console.log(paymentOption);

  return (
    <section className="md:pt-6 lg:pt-10 xl:pt-14 text-left px-6 md:px-8 lg:px-0 maxWidth">
      <h1 className="text-left">Checkout</h1>
      <div className="flex flex-col md:flex-row justify-center gap-10 pt-6 lg:pt-10 xl:pt-14 md:pb-6 lg:pb-10 xl:pb-28">
        <div className="md:w-1/2 bg-white rounded-2xl p-10 sm:p-14 flex flex-col gap-10">
          <div>
            <div className="flex items-end justify-between pb-5">
              <h2>Customer Info</h2>
              <p>*Required</p>
            </div>
            <div>
              {isGuest ? (
                <>
                  <Input
                    isRequired
                    variant="bordered"
                    labelPlacement="inside"
                    isClearable
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={guestEmail}
                    color={
                      validationState === 'invalid'
                        ? 'danger'
                        : undefined || emailError === 'invalid'
                        ? 'danger'
                        : undefined
                    }
                    errorMessage={
                      (validationState === 'invalid' &&
                        'Please enter a valid email') ||
                      (emailError === 'invalid' && 'This field is required')
                    }
                    onValueChange={setGuestEmail}
                  />
                </>
              ) : (
                <>
                  {isUserLoggedIn ? (
                    <>
                      <p>
                        Welcome back! You are now logged in as{' '}
                        {currentUserEmail}
                      </p>
                      <p>
                        Not you?{' '}
                        <button onClick={handleSignOut}>Sign Out</button>
                      </p>
                    </>
                  ) : (
                    <>
                      {showLogin ? (
                        <Login
                          onUserLogin={(email) => {
                            loginUser();
                            setCurrentUserEmail(email); // <-- Set the user email on successful login
                          }}
                        />
                      ) : (
                        <Signup
                          onUserRegistered={(email) => {
                            loginUser();
                            setCurrentUserEmail(email); // <-- Set the user email on successful sign-up
                          }}
                        />
                      )}
                      {showLogin ? (
                        <p className="font-Zilla text-sm mt-2">
                          Dont have an account?
                          <button
                            onClick={() => setShowLogin(false)}
                            className="hover:text-secondary ease-in-out duration-300"
                          >
                            Sign Up
                          </button>
                        </p>
                      ) : (
                        <p className="font-Zilla text-sm mt-2">
                          Already have an account?
                          <button
                            onClick={() => setShowLogin(true)}
                            className="hover:text-secondary ease-in-out duration-300"
                          >
                            Login
                          </button>
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
              <Checkbox
                checked={isGuest}
                onChange={(e) => setIsGuest(e.target.checked)}
                className="mt-4"
              >
                Checkout as Guest
              </Checkbox>
            </div>
          </div>
          <Divider />
          <div>
            <ShippingAddress onShippingAddressChange={setShippingAddress} />
          </div>
          <Divider />
          <div>
            <ShippingMethods setShippingCost={setShippingCost} />
          </div>
          <Divider />
          <div>
            <BillingAddress
              shippingAddress={shippingAddress}
              onBillingAddressChange={setBillingAddress}
            />
          </div>
        </div>
        <div className="md:w-1/2 p-10 sm:p-14 flex flex-col gap-5">
          <OrderSummery cartItems={cart} shippingCost={shippingCost} />
          <PaymentOptions setPaymentOption={setPaymentOption} />
          <Button
            radius="full"
            fullWidth
            className="bg-secondary text-white font-Zilla text-base hover:bg-accent"
          >
            Pay Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
