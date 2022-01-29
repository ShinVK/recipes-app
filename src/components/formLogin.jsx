import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Mycontext';
import { setLocalStorage } from '../services/localStorage';

export default function FormLogin() {
  const history = useHistory();
  const { stateHook: { setactPage } } = useContext(MyContext);

  const [disableValue, setDisabledValue] = useState(true);

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formValue;

  const changeButton = () => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minValuePassword = 5;
    const emailTest = emailRegex.test(email);
    const isDisabled = !(password.length >= minValuePassword && emailTest);
    setDisabledValue(isDisabled);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    changeButton();
  };

  const handleClick = () => {
    setLocalStorage('user', email);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('mealsToken', 1);
    setactPage('food');
    history.push('/foods');
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          onChange={ handleChange }
          value={ email }
          id="email"
          type="email"
          name="email"
        />
      </label>
      Password
      <label htmlFor="senha">
        <input
          data-testid="password-input"
          onChange={ handleChange }
          value={ password }
          type="password"
          id="password"
          name="password"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        name="button"
        id="button"
        onClick={ handleClick }
        disabled={ disableValue }
      >
        Enter
      </button>
    </form>
  );
}
