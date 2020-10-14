import React from 'react';
import moment from 'moment';
import VenueList from './VenueList';

const Screenings = (props) => {
  const { venues, today, submit, theaters, dates } = props;
  return (
    <div>
      <h2 className="screenings-title">
        {moment(today).format('dddd, MMMM D YYYY')}
      </h2>
      {venues.map((item) => (
        <VenueList
          venue={item}
          today={today}
          submit={submit}
          theaters={theaters}
          dates={dates}
          key={item.venue}
        />
      ))}
    </div>
  );
};

export default Screenings;
