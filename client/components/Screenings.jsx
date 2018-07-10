import React from 'react';
import VenueList from './VenueList.jsx';

const Screenings = (props) => (
  <div>
    {props.venues.map(item => (
      <VenueList venue={item} key={item.venue} />
    ))}
  </div>
)

export default Screenings;