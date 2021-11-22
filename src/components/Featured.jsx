import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ShowsList from './screenings/ShowsList';


const Featured = (props) => {
  const { featured, today } = props;
  const images = [
    'https://storage.googleapis.com/filmcans/featured/true-romance.jpg',
    'https://storage.googleapis.com/filmcans/featured/stranger-than-paradise.jpg',
    'https://storage.googleapis.com/filmcans/featured/goodbye-dragon-inn.jpg',
    'https://storage.googleapis.com/filmcans/featured/gremlins.jpg',
    'https://storage.googleapis.com/filmcans/featured/inglorious-basterds.jpg',
  ];
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    const selectImage = (min, max, excluded) => {
      var n = Math.floor(Math.random() * (max-min) + min);
      if (n >= excluded) n++;
      setIndex(n);
    }
    selectImage(0,3,index);
  },[])
  
  return (
    <div className="featured">
      <div className="featured-image">
        {featured.welcome ? 
        <img src={images[index]} className="featured-image" alt="featured" /> :
        <img src={featured.image} className="featured-image" alt="featured" /> 
        }
      </div>
      <h3>
        {featured.welcome ? 'Welcome to SF Bay Film' : 'Featured Film for '}
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
