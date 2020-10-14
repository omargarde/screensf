import React, { useState } from 'react';
import ShowsList from './ShowsList';

const VenueList = (props) => {
  const { venue, submit, today, theaters, dates } = props;
  const [showCount, setShowCount] = useState(1);
  const showCounter = (value) => {
    setShowCount(showCount + value);
  };

  // could use API vs. counter

  if (showCount === 0) return '';

  return (
    <div className="screenings-venues">
      <div className="venue-block">
        <h3>{venue.venue}</h3>
        <div className="venue-address">{venue.address}</div>
      </div>
      <div className="venue-shows">
        {venue.shows.map((item) => (
          <ShowsList
            show={item}
            today={today}
            submit={submit}
            theaters={theaters}
            setShow={showCounter}
            dates={dates}
            key={item.film}
          />
        ))}
      </div>
    </div>
  );
};
export default VenueList;
