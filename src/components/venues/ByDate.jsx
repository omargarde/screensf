import React from 'react';
import ShowsList from '../screenings/ShowsList';

const ByDate = (props) => {
  const { shows } = props;
  if (shows.length === 0) return '';

  return (
    <div className="venue-shows">
      {shows.map((item) => (
        <ShowsList show={item} submit={false} key={item.alt_title} />
      ))}
    </div>
  );
};
export default ByDate;
