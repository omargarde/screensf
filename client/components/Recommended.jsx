import React from 'react';
import ShowsList from './ShowsList.jsx';


const Recommended = props => (
  <div className="featured">
    <img
      src={props.featured.image}
      className="featured-image"
      alt="featured"
    />
    <h3>Featured Showtime</h3>
    <div className="featured-details">
      <div className="featured-showtime">
        <h4>{props.featured.venue}</h4>
        <ShowsList show={props.featured} />
      </div>
      <div className="featured-article">
        {props.featured.article.short}
        <div className="writer">
         {props.featured.writer}
        </div>
      </div>
    </div>
  </div>
);

export default Recommended;
