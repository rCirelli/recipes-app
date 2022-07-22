import React from 'react';
import PropTypes from 'prop-types';

function LoginInput({ id, type, label, placeholder, value, handleInput, validStyle }) {
  return (
    <label
      htmlFor="email-input"
      className="flex flex-col items-start"
    >
      <input
        className={ `px-2 py-2  bg-slate-100 peer order-2 outline-none
      transition-all placeholder:focus:text-slate-600/0 text-${validStyle}
      placeholder:text-slate-400 border-b-2 border-slate-500 w-full
      placeholder:italic focus:rounded-lg focus:bg-slate-200
      focus:border-b-slate-400 focus:drop-shadow-md focus:border-b-${validStyle}` }
        value={ value }
        onChange={ handleInput }
        id={ id }
        type={ type }
        data-testid={ id }
        placeholder={ placeholder }
      />
      <p
        className="block translate-x-2 text-sm text-thin text-slate-600/0
      translate-y-8 tracking-wider order-1 peer-focus:translate-y-[0.20rem]
      transition-all outline-none peer-focus:text-slate-700 text-[0.95rem]
      pointer-events-none"
      >
        { label }
      </p>

    </label>
  );
}

export default LoginInput;

LoginInput.defaultProps = {
  value: undefined,
  validStyle: 'slate-500',
};

LoginInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  validStyle: PropTypes.string,
};
