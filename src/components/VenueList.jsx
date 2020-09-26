import React, { useState } from 'react';
import ShowsList from './ShowsList';

const VenueList = (props) => {
  const { venue, submit, today } = props;
  const [expand, setExpand] = useState(false);
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
          {submit ? (
            <div>
              <div>New Screening</div>
              <button
                type="button"
                className="submit-showtime"
                onClick={() => setExpand(!expand)}
              >
                {expand ? '-' : '+'}
              </button>
              <div>{expand ? 'Expanded' : ''}</div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
export default VenueList;
