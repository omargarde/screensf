import React from 'react';
import Venue from './Venue';

const Screenings = (props) => {
  const { venues, submit, dates, shows, virtual } = props;
  let { showtimes, virtualScreenings, screeningsNote } = '';
  if (shows.length > 0) showtimes = 'Showtimes';
  if (virtual.length > 0) virtualScreenings = 'Virtual Screenings';
  if (virtual.length === 0 && shows.length === 0)
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
      <h2 className="screenings-title">{virtualScreenings}</h2>
      {venues.map((item) => (
        <Venue
          venue={item}
          submit={submit}
          dates={dates}
          shows={item.virtualScreenings}
          key={item.venue}
        />
      ))}
      <div className="screenings-note">{screeningsNote}</div>
    </div>
  );
};

export default Screenings;
