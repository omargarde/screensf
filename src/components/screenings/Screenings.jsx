import React from 'react';
import VenueList from './VenueList';

const Screenings = (props) => {
  const { venues, today, submit, dates } = props;
  return (
    <div>
      <div>Virtual Screenings are ongoing unless otherwise noted</div>
      {venues.map((item) => (
        <VenueList
          venue={item}
          today={today}
          submit={submit}
          dates={dates}
          key={item.venue}
        />
      ))}
    </div>
  );
};

export default Screenings;
