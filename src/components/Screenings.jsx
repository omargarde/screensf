import React from 'react';
import moment from 'moment';
import VenueList from './VenueList';

const Screenings = (props) => {
  const { venues, today } = props;
  return (
    <div>
      <h2 className="screenings-title">
        {moment(today).format('dddd, MMMM D YYYY')}
      </h2>
      {venues.map((item) => (
        <VenueList venue={item} key={item.venue} />
      ))}
    </div>
  );
};

export default Screenings;
