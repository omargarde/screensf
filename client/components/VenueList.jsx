import React from 'react';
import ShowsList from './ShowsList.jsx';

const VenueList = (props) => (
  <div className="screenings-venues">
    <h2>{props.venue.venue}</h2>
    <div className = "venue-shows">
      {props.venue.shows.map(item => (
        <ShowsList show={item} key={item.film} />
      ))}
    </div>
  </div>
)

export default VenueList;