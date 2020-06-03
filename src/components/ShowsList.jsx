import React from 'react';
import PropTypes from 'prop-types';
import Showtime from './Showtime.jsx';

const ShowsList = ({ show }) => (
  <div className="shows-film">
    {show.series ? <div className="film-series">{show.series}</div> : ''}
    <div className="film-title">{show.film}</div>
    <div className="film-details">
      {show.director ? <span>{show.director}</span> : ''}
      {show.year ? <span>{show.year}</span> : ''}
      {show.runtime ? <span>{show.runtime} min</span> : ''}
      {show.format ? <span>{show.format}</span> : ''}
    </div>
    {show.screening_note ? <div className="film-note">{show.screening_note}</div> : ''}
    <div className="showtimes">{show.showtimes.map(showtime => (
        <Showtime showtime={showtime} key={showtime} />
      ))}
    </div>
  </div>
);

ShowsList.propTypes = {
  show: PropTypes.shape,
};

ShowsList.defaultProps = {
  show: '',
};


export default ShowsList;
