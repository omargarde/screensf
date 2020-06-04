import React from 'react';
import VenueList from './VenueList.jsx';

const Screenings = props => (
  <div>
    <h2 className="screenings-title">
      Showtimes
    </h2>
    {props.venues.map(item => (
      <VenueList venue={item} key={item.venue} />
    ))}
  </div>
);

export default Screenings;
