import React from 'react';
import moment from 'moment';
import ShowsList from './ShowsList';

const Featured = (props) => {
  const { featured, today } = props;
  return (
    <div className="featured">
      <img src={featured.image} className="featured-image" alt="featured" />
      <h3>Featured Film for { moment(today).format('dddd, MMMM D YYYY') }</h3>
      <div className="featured-details">
        <div className="featured-showtime">
          <h4>{featured.venue}</h4>
          <ShowsList show={featured} />
        </div>
        <div className="featured-article">
          {featured.article}
          <div className="writer">{featured.writer}</div>
        </div>
      </div>
    </div>
  );
}
export default Featured;
