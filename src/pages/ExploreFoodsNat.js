import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Card, FormControl,
  CardContent, MenuItem,
  CardMedia, InputLabel,
  Grid, Typography, Select } from '@mui/material';
import AllHeader from '../components/AllHeader';
import useNationality from '../hooks/useNationality';
import useFilterNation from '../hooks/useFilterNation';
import BottomNav from '../components/mui/BottomNav';

export default function ExploreFoodsNat({ history: { location } }) {
  const [nationalities] = useNationality();
  const [nation, setnation] = useState('');
  const [mealsNation] = useFilterNation(nation);
  const history = useHistory();

  return (
    <div>
      <AllHeader actPage={ location.pathname } title="Explore Nationalities" />
      <FormControl sx={ { m: 1, minWidth: 80 } }>
        <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={ nation }
          onChange={ ({ target }) => setnation(target.value) }
          autoWidth
          label="Country"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="All">
            All
          </MenuItem>
          {nationalities && nationalities.map(({ strArea }, i) => (
            <MenuItem
              data-testid={ `${strArea}-option` }
              value={ strArea }
              key={ i }
            >
              {strArea}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <select
        data-testid="explore-by-nationality-dropdown"
        value={ nation }
        onChange={ ({ target }) => setnation(target.value) }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        {nationalities && nationalities.map(({ strArea }, i) => (
          <option
            value={ strArea }
            data-testid={ `${strArea}-option` }
            key={ i }
          >
            {strArea}
          </option>
        ))}
      </select> */}
      <Grid
        container
        spacing={ 1 }
        justifyContent="center"
        minWidth="300px"
        sx={ { mb: 10 } }
      >
        { mealsNation && mealsNation
          .map(({ idMeal, strMeal, strMealThumb }, i) => (

            <Grid
              key={ idMeal }
              item
              minWidth="120px"
              style={ { textAlign: 'center' } }
            >
              <Card
                sx={ { maxWidth: 160, height: 160, bgcolor: '#fdf8f6' } }
                data-testid={ `${i}-recipe-card` }
                onClick={ () => history.push(`/foods/${idMeal}`) }
                aria-hidden="true"
                className="card__recipes"
                role="button"
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={ strMealThumb }
                  alt="thumbnail food"
                  data-testid={ `${i}-card-img` }
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    { strMeal.length > +'24'
                      ? `${strMeal.slice(0, +'24')}...` : strMeal}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <BottomNav />
    </div>
  );
}

ExploreFoodsNat.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
