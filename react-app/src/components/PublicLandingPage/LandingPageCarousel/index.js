import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import Image from 'material-ui-image';
import esports_stadium_img from './esports_stadium.jpeg';

export default function LandingPageCarousel(props) {
  var items = [
    {
      image: esports_stadium_img,
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
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <Image src={props.image} />
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
