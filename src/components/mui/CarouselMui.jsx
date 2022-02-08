/* eslint-disable react/no-multi-comp */
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import PropTypes from 'prop-types';

function Item(props) {
  const { item: { name, description } } = props;
  return (
    <Paper>
      <h2>{name}</h2>
      <p>{description}</p>

      <Button className="CheckButton">
        Check it out!
      </Button>
    </Paper>
  );
}

export default function CarouselMui() {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
  ];

  return (
    <Carousel>
      {
        items.map((item, i) => <Item key={ i } item={ item } />)
      }
    </Carousel>
  );
}

Item.propTypes = {
  item: PropTypes.objectOf(Object).isRequired,
};
