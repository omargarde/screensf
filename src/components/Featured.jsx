import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ShowsList from './screenings/ShowsList';
import { images } from './helpers'

const Featured = (props) => {
  const { featured, today, featIndex, setFeatIndex } = props;

  useEffect(()=>{
    const selectImage = (min, max, excluded) => {
      var n = excluded;
      n++
      if (n > max) n = min;
      setFeatIndex(n);
    }
    selectImage(0,4,featIndex);
  },[today])
  
  return (
    <div className="featured">
      <div className="featured-image">
        {featured.welcome ? 
        <img src={images[featIndex]} className="featured-image" alt="featured" /> :
        <img src={featured.image} className="featured-image" alt="featured" /> 
        }
      </div>
      <h3>
        {featured.welcome ? 'Welcome to SF Bay Film | ' : 'Featured Film for '}
        {moment(today).format('dddd, MMMM D YYYY')}
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
