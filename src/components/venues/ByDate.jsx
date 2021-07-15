import React from 'react';
import ShowsList from '../screenings/ShowsList';

const ByDate = (props) => {
  const { shows } = props;
  delete shows.date;
  const showsArr = Object.values(shows);

  if (shows.length === 0) return '';

  return (
    <div className="venue-shows">
      {showsArr.map((item) => (
        <ShowsList show={item} submit={false} key={item.alt_title} />
      ))}
    </div>
  );
};
export default ByDate;
