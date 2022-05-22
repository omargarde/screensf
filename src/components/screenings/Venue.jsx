import React from 'react';
import { Link } from 'react-router-dom';
import ShowsList from './ShowsList';

const Venue = (props) => {
  const { venue, submit, dates, shows } = props;
  const venueUrl = `/venues/${venue.venue_uri}`;

  if (shows.length === 0) return '';

  return (
    <div className="screenings-venues">
      <div className="venue-block">
        <h3 className="venue-title">
          <Link to={venueUrl}>{venue.venue}</Link>
        </h3>
        <div className="venue-address">{venue.address}</div>
      </div>
      <div className="venue-shows">
        {shows.map((item) => (
          <ShowsList
            show={item}
            submit={submit}
            dates={dates}
            key={item.screening_id}
          />
        ))}
      </div>
    </div>
  );
};
export default Venue;
