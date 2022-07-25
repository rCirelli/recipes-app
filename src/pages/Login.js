import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import LoginInput from '../components/inputs/LoginInput';

const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);
  const [hasToBeRedirect, setHasToBeRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: emailInput }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    setHasToBeRedirect(true);
  }

  const isEmailValid = () => /\S+@\S+\.\S+/.test(emailInput);

  useEffect(() => {
    const formatEmail = /\S+@\S+\.\S+/;
    if (formatEmail.test(emailInput) && passwordLength > MIN_PASSWORD_LENGTH) {
      setIsBtnDisable(false);
    } else {
      setIsBtnDisable(true);
    }
  }, [passwordLength, emailInput]);

  const handleEmail = ({ target }) => {
    setEmailInput(target.value);
  };

  const handlePassword = ({ target }) => {
    setPasswordLength(target.value.length);
  };

  return (

    hasToBeRedirect
      ? (
        <Redirect to="/foods" />
      )
      : (
        <div
          className="w-screen h-screen flex flex-col justify-center items-center
            bg-slate-200"
        >
          <div className="bg-slate-100 rounded-lg px-7 pt-4 pb-8 drop-shadow-md">
            <form
              className="flex flex-col justify-center items-center gap-4"
              onSubmit={ handleSubmit }
            >
              <LoginInput
                id="email-input"
                type="email"
                label="Email"
                placeholder="Email"
                value={ emailInput }
                handleInput={ handleEmail }
                validStyle={ isEmailValid() ? 'emerald-500' : 'red-600' }
              />
              <LoginInput
                id="password-input"
                type="password"
                label="Password"
                placeholder="Password"
                handleInput={ handlePassword }
                validStyle={
                  passwordLength <= MIN_PASSWORD_LENGTH ? 'red-600' : 'emerald-500'
                }
              />
              <button
                disabled={ isBtnDisable }
                data-testid="login-submit-btn"
                type="submit"
                className="bg-emerald-500 w-full py-2 text-lg rounded-lg mt-5
                text-slate-200 font-medium tracking-wider active:bg-emerald-600
                drop-shadow active:drop-shadow-xl disabled:bg-slate-600/30"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )
  );
}

export default Login;
