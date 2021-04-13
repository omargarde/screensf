import React from 'react';
import Venue from './Venue';

const Screenings = (props) => {
  const { venues, submit, dates } = props;
  return (
    <div>
      <h2 className="screenings-title">Showtimes</h2>
      {venues.map((item) => (
        <Venue
          venue={item}
          submit={submit}
          dates={dates}
          shows={item.shows}
          key={item.venue}
        />
      ))}
      <h2 className="screenings-title">Virtual Screenings</h2>
      <div className="screenings-note">
        Virtual Screenings are ongoing unless otherwise noted
      </div>
      {venues.map((item) => (
        <Venue
          venue={item}
          submit={submit}
          dates={dates}
          shows={item.virtualScreenings}
          key={item.venue}
        />
      ))}
    </div>
  );
};

export default Screenings;
