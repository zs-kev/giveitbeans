'use client';

import { Input } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setFormSubmitted(true);

    if (isFormValid()) {
      // Make the API call or other form submission logic here.
    }
  };
  const passwordError = formSubmitted && !password ? 'invalid' : 'valid';
  const emailError = formSubmitted && !email ? 'invalid' : 'valid';

  const isFormValid = () => {
    return email && validateEmail(email) && password;
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email: string) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validationState = useMemo(() => {
    if (email === '') return undefined;

    return validateEmail(email) ? 'valid' : 'invalid';
  }, [email]);

  return (
    <div>
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
          validationState === 'invalid'
            ? 'danger'
            : undefined || emailError === 'invalid'
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
