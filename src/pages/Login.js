import React, { useState, useEffect } from 'react';

const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: emailInput }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  }

  useEffect(() => {
    const formatEmail = /\S+@\S+\.\S+/;
    if (formatEmail.test(emailInput) && passwordLength > MIN_PASSWORD_LENGTH) {
      setIsBtnDisable(false);
    } else {
      setIsBtnDisable(true);
    }
  }, [passwordLength, emailInput]);

  function handleEmail({ target }) {
    setEmailInput(target.value);
  }

  function handlePassword({ target }) {
    setPasswordLength(target.value.length);
  }

  return (
    <div className="bg-slate-200">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={ handleSubmit }
      >
        <label htmlFor="email-input">
          Insira seu e-mail
          <input
            value={ emailInput }
            onChange={ handleEmail }
            id="email-input"
            type="email"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password-input">
          Insira sua senha
          <input
            onChange={ handlePassword }
            id="password-input"
            type="password"
            data-testid="password-input"
          />
        </label>
        <button
          disabled={ isBtnDisable }
          data-testid="login-submit-btn"
          type="submit"
        >
          Enter

        </button>
      </form>
    </div>
  );
}

export default Login;
