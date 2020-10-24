import React from 'react';
import moment from 'moment';
import ShowsList from './screenings/ShowsList';

const Featured = (props) => {
  const { featured, today } = props;
  return (
    <div className="featured">
      <div className="featured-image">
        <img src={featured.image} className="featured-image" alt="featured" />
      </div>
      <h3>
        {featured.welcome
          ? 'Welcome to the SF Bay Film Calendar'
          : 'Featured Film for '}
        {featured.welcome ? '' : moment(today).format('dddd, MMMM D YYYY')}
      </h3>
      <div
        className={featured.welcome ? 'welcome-details' : 'featured-details'}
      >
        <div
          className={featured.welcome ? 'welcome-hide' : 'featured-showtime'}
        >
          <h4>{featured.venue}</h4>
          <ShowsList show={featured} />
        </div>
        <div className={featured.welcome ? '' : 'featured-article'}>
          {featured.article}
          <div className="writer">{featured.writer}</div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
