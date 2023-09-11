'use client';

import { Input } from '@nextui-org/react';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { useMemo, useState } from 'react';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSignup = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (isFormValid()) {
      const customer = {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      };

      const api = new WooCommerceRestApi({
        url: 'https://giveitbeans.cloudaccess.host/',
        consumerKey: process.env.WOO_LIVE_CONSUMER!,
        consumerSecret: process.env.WOO_LIVE_SECRET!,
        version: 'wc/v3',
      });

      api
        .post('customers', customer)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const passwordsMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const passwordError = formSubmitted && !password ? 'invalid' : 'valid';
  const confirmPasswordError =
    formSubmitted && !confirmPassword ? 'invalid' : 'valid';
  const confirmPasswordMatchError =
    formSubmitted && !passwordsMatch ? 'invalid' : 'valid';
  const firstNameError = formSubmitted && !firstName ? 'invalid' : 'valid';
  const lastNameError = formSubmitted && !lastName ? 'invalid' : 'valid';
  const emailError = formSubmitted && !email ? 'invalid' : 'valid';

  const isFormValid = () => {
    return (
      email &&
      validateEmail(email) &&
      firstName &&
      lastName &&
      password &&
      passwordsMatch
    );
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email: string) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validationState = useMemo(() => {
    if (email === '') return undefined;

    return validateEmail(email) ? 'valid' : 'invalid';
  }, [email]);

  return (
    <form onSubmit={handleSignup}>
      <Input
        isRequired
        variant="bordered"
        labelPlacement="outside"
        isClearable
        type="text"
        label="First Name"
        placeholder="Enter your first name"
        value={firstName}
        color={firstNameError === 'invalid' ? 'danger' : undefined}
        errorMessage={firstNameError === 'invalid' && 'This field is required'}
        onValueChange={setFirstName}
      />
      <Input
        isRequired
        variant="bordered"
        labelPlacement="outside"
        isClearable
        type="text"
        label="Last Name"
        placeholder="Enter your last name"
        value={lastName}
        color={lastNameError === 'invalid' ? 'danger' : undefined}
        errorMessage={lastNameError === 'invalid' && 'This field is required'}
        onValueChange={setLastName}
      />
      <Input
        isRequired
        variant="bordered"
        labelPlacement="outside"
        isClearable
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        color={
          validationState === 'invalid' || emailError === 'invalid'
            ? 'danger'
            : undefined
        }
        errorMessage={
          (validationState === 'invalid' && 'Please enter a valid email') ||
          (emailError === 'invalid' && 'This field is required')
        }
        onValueChange={setEmail}
      />
      <Input
        isRequired
        variant="bordered"
        labelPlacement="outside"
        type={isVisible ? 'text' : 'password'}
        label="Password"
        placeholder="Enter your password"
        value={password}
        onValueChange={setPassword}
        color={passwordError === 'invalid' ? 'danger' : undefined}
        errorMessage={passwordError === 'invalid' && 'This field is required'}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Input
        isRequired
        variant="bordered"
        labelPlacement="outside"
        type={isVisible ? 'text' : 'password'}
        label="Confirm Password"
        placeholder="Enter your password"
        value={confirmPassword}
        onValueChange={setConfirmPassword}
        color={
          confirmPasswordError === 'invalid' ||
          confirmPasswordMatchError === 'invalid'
            ? 'danger'
            : undefined
        }
        errorMessage={
          (confirmPasswordError === 'invalid' && 'This field is required') ||
          (confirmPasswordMatchError === 'invalid' && 'Password does not match')
        }
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
