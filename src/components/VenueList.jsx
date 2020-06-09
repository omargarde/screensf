import React from 'react';
import ShowsList from './ShowsList';

const VenueList = (props) => {
  const venue = { props };
  return (
    <div className="screenings-venues">
      <h3>{venue.venue}</h3>
      <div className="venue-shows">
        {venue.shows.map((item) => (
          <ShowsList show={item} key={item.film} />
        ))}
      </div>
    </div>
  );
};
export default VenueList;
