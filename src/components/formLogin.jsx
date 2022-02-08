import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import test from '../images/recipesAppV1.png';
// import MyContext from '../context/Mycontext';
import { setLocalStorage } from '../services/localStorage';

export default function FormLogin() {
  const history = useHistory();
  // const { stateHook: { setactPage } } = useContext(MyContext);

  const [disableValue, setDisabledValue] = useState(true);

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formValue;

  const changeButton = () => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minValuePassword = 6;
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
    setLocalStorage('user', JSON.stringify({ email }));
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('mealsToken', 1);
    history.push('/foods');
  };

  return (
    <Container>
      <Box
        sx={ {
          bgcolor: 'background',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        } }
      >
        <img src={ test } alt="Logo de comida" width="200px" />
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          data-testid="email-input"
          onChange={ handleChange }
          value={ email }
          name="email"
        />

        <TextField
          margin="normal"
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          data-testid="password-input"
          onChange={ handleChange }
          value={ password }
          name="password"
          type="password"
        />

        <Button
          data-testid="login-submit-btn"
          type="button"
          name="button"
          id="button"
          onClick={ handleClick }
          disabled={ disableValue }
          variant="contained"
          color="primary"
        >
          Enter
        </Button>
      </Box>
    </Container>
  );
}
