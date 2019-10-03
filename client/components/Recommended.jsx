import React from 'react';
import ShowsList from './ShowsList.jsx';


const Recommended = props => (
  <div className="featured">
    <img
      src={props.featured.image}
      className="featured-image"
      alt="featured"
    />
    <h3>
      Featured Film for {props.today.format('dddd, MMMM D YYYY')}
    </h3>
    <div className="featured-details">
      <div className="featured-showtime">
        <h4>{props.featured.venue}</h4>
        <ShowsList show={props.featured} />
      </div>
      <div className="featured-article">
        {props.featured.article}
        <div className="writer">
          {props.featured.writer}
        </div>
      </div>
    </div>
  </div>
);

export default Recommended;
