import React from 'react';
import Showtime from './Showtime.jsx';

const ShowsList = (props) => (
  <div className="shows-film">

    {props.show.series ? <div className="film-series">{props.show.series}</div> : ''}
    <div className="film-title">{props.show.film}</div>
    <div className="film-details">
      {props.show.director ? <span>{props.show.director}</span> : ''}
      {props.show.year ? <span>{props.show.year}</span> : ''}
      {props.show.trt ? <span>{props.show.trt} min</span> : ''}
      {props.show.format ? <span>{props.show.format}</span> : ''}
    </div>
    {props.show.note ? <div className="film-note">{props.show.note}</div> : ''}
    <div className="showtimes">{props.show.showtimes.map(showtime => (
        <Showtime showtime={showtime} key={showtime} />
      ))}
    </div>
  </div>
)

export default ShowsList;
