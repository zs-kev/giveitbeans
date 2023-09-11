'use client';

import Login from '@/components/userAccount/Login';
import Signup from '@/components/userAccount/Signup';
import { Input } from '@nextui-org/react';
import { useMemo, useState } from 'react';

const CheckoutPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLogginOut, setIsLogginOut] = useState(false);

  const emailError = formSubmitted && !guestEmail ? 'invalid' : 'valid';

  const validateEmail = (guestEmail: string) =>
    guestEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validationState = useMemo(() => {
    if (guestEmail === '') return undefined;

    return validateEmail(guestEmail) ? 'valid' : 'invalid';
  }, [guestEmail]);

  const handleSignOut = () => {
    setIsLogginOut(true);
    localStorage.removeItem('jwt_token');
    setIsUserLoggedIn(false);
    setUserEmail('');
    setIsLogginOut(false);
  };

  return (
    <section className="md:pt-6 lg:pt-10 xl:pt-14 text-left px-6 md:px-8 lg:px-0 maxWidth">
      <h1 className="text-left">Checkout</h1>
      <div>
        <h2>Customer Info</h2>
        <p>*Required</p>
        <div>
          {isGuest ? (
            <>
              <Input
                isRequired
                variant="bordered"
                labelPlacement="outside"
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
                  <p>Welcome back! You are now logged in as {userEmail}</p>
                  <p>
                    Not you? <button onClick={handleSignOut}>Sign Out</button>
                  </p>
                </>
              ) : (
                <>
                  {showLogin ? (
                    <Login
                      onUserLogin={(email) => {
                        setIsUserLoggedIn(true);
                        setUserEmail(email); // <-- Set the user email on successful login
                      }}
                    />
                  ) : (
                    <Signup
                      onUserRegistered={(email) => {
                        setIsUserLoggedIn(true);
                        setUserEmail(email); // <-- Set the user email on successful sign-up
                      }}
                    />
                  )}
                  {showLogin ? (
                    <p>
                      Dont have an account?
                      <button onClick={() => setShowLogin(false)}>
                        Sign Up
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already have an account?
                      <button onClick={() => setShowLogin(true)}>Login</button>
                    </p>
                  )}
                </>
              )}
            </>
          )}
          <input
            type="checkbox"
            checked={isGuest}
            onChange={(e) => setIsGuest(e.target.checked)}
          />
          <label>Checkout as Guest</label>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
