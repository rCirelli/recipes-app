import React from 'react';
import Footer from '../components/Footer';

function Login() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="bg-slate-200">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={ handleSubmit }
      >
        <label htmlFor="email-input">
          Insira seu e-mail
          <input id="email-input" type="email" data-testid="email-input" />
        </label>
        <label htmlFor="password-input">
          Insira sua senha
          <input id="password-input" type="password" data-testid="password-input" />
        </label>
        <button data-testid="login-submit-btn" type="submit">Enter</button>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
