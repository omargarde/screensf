import React from 'react';
import ShowsList from './ShowsList.jsx';


const Recommended = props => (
  <div className="featured">
    <img
      src={props.featured.image}
      className="featured-image"
      alt="featured"
    />
    <div className="featured-details">
      <div className="featured-showtime">
        <ShowsList show={props.featured} />
      </div>
      <div className="featured-article">
        {props.featured.article.short}
        <div className="writer">
         - {props.featured.writer}
        </div>
      </div>
    </div>
  </div>
);

export default Recommended;
