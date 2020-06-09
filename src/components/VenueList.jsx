import React from 'react';
import ShowsList from './ShowsList.jsx';

const VenueList = props => (
  <div className="screenings-venues">
    <h3>
      {props.venue.venue}
    </h3>
    <div className="venue-shows">
      {props.venue.shows.map(item => (
        <ShowsList show={item} key={item.film} />
      ))}
    </div>
  </div>
);

export default VenueList;