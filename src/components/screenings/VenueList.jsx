import React from 'react';
import { Link } from 'react-router-dom';
import ShowsList from './ShowsList';

const VenueList = (props) => {
  const { venue, submit, today } = props;
  const venueUrl = `/venues/${venue.id}`;

  return (
    <div className="screenings-venues">
      <div className="venue-block">
        <h3>
          <Link to={venueUrl}>{venue.venue}</Link>
        </h3>
        {/* <h3>{venue.venue}</h3> */}
        <div className="venue-address">{venue.address}</div>
      </div>
      <div className="venue-shows">
        {venue.shows.map((item) => (
          <ShowsList
            show={item}
            today={today}
            submit={submit}
            key={item.film}
          />
        ))}
      </div>
    </div>
  );
};
export default VenueList;
