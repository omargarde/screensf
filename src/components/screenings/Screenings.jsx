import React from 'react';
import Venue from './Venue';

const Screenings = (props) => {
  const { venues, submit, dates } = props;
  let { showtimes, screeningsNote } = '';
  if (venues.length === 0)
    screeningsNote = 'There are no showtimes for this date.';
  return (
    <div>
      <h2 className="screenings-title">{showtimes}</h2>
      {venues.map((item) => (
        <Venue
          venue={item}
          submit={submit}
          dates={dates}
          shows={item.shows}
          key={item.venue}
        />
      ))}
      <div className="screenings-note">{screeningsNote}</div>
    </div>
  );
};

export default Screenings;
