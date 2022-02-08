import {
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
  Container,
  Button,
  TextField } from '@mui/material';
import PropTypes from 'prop-types';
// import {  } from '@mui/material';
import React, { useContext, useState } from 'react';
import MyContext from '../context/Mycontext';

// import fetchFoodAPI from '../services/fetchAPI';

function SearchHeader({ page }) {
  const [radioButton, setradioButton] = useState();
  const [searchInput, setSearchInput] = useState('');

  const handleChangeRadio = ({ target }) => {
    const { name, value } = target;
    setradioButton({ [name]: value });
  };

  const { stateHook: { onClickSearch } } = useContext(MyContext);

  return (
    <Container>
      <form>
        <TextField
          type="text"
          variant="standard"
          value={ searchInput }
          data-testid="search-input"
          onChange={ ({ target }) => setSearchInput(target.value) }
        />
        <FormControl>
          <FormLabel id="option-type-radio">Escolha uma opção</FormLabel>
          <RadioGroup
            row
            aria-labelledby="option-type-radio"
            name="searchRadio"
            onClick={ (e) => handleChangeRadio(e) }
          >
            <FormControlLabel
              value="radio1"
              control={ <Radio size="small" /> }
              label={
                <Typography sx={ { fontSize: 12 } }>
                  Ingredientes
                </Typography>
              }
              // sx={ { width: '100px', fontSize: '12px' } }
            />
            <FormControlLabel
              value="radio2"
              control={ <Radio size="small" /> }
              label={
                <Typography sx={ { fontSize: 12 } }>
                  Nome
                </Typography>
              }
              size="small"

            />
            <FormControlLabel
              value="radio3"
              control={ <Radio size="small" /> }
              size="small"
              label={
                <Typography sx={ { fontSize: 12 } }>
                  Primeira letra
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      </form>
      <Button
        variant="contained"
        color="success"
        data-testid="exec-search-btn"
        onClick={ () => onClickSearch(radioButton, searchInput, page) }
        disabled={ !radioButton || !searchInput }
      >
        Procurar
      </Button>
    </Container>
  );
}

SearchHeader.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchHeader;
