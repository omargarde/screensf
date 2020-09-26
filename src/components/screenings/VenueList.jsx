import React from 'react';
import ScreeningsEditor from '../submit/ScreeningsEditor';
import ShowsList from './ShowsList';

const VenueList = (props) => {
  const { venue, submit, today } = props;
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
            key={item.film}
          />
        ))}
        <div className="shows-film">
          <ScreeningsEditor today={today} submit={submit} />
        </div>
      </div>
    </div>
  );
};
export default VenueList;
