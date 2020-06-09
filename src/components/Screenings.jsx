import React from 'react';
import VenueList from './VenueList';

const Screenings = (props) => {
  const { venues } = props;
  return (
    <div>
      <h2 className="screenings-title">Showtimes</h2>
      {venues.map((item) => (
        <VenueList venue={item} key={item.venue} />
      ))}
    </div>
  );
};

export default Screenings;
