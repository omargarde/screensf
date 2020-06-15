/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import Showtime from './Showtime';

const ShowsList = ({ show }) => (
  <div className="shows-film">
    {show.series ? <div className="film-series">{show.series}</div> : ''}
    <div className="film-title">
      <a
        href={show.screening_url}
        target="_blank"
        rel="noreferrer"
        aria-describedby="new-window-2"
      >
        {show.film}
      </a>
    </div>
    <div className="film-details">
      {show.director ? <div>{show.director}</div> : ''}
      {show.year ? <div>{show.year}</div> : ''}
      {show.runtime ? <div>{show.runtime} min</div> : ''}
      {show.format ? <div>{show.format}</div> : ''}
    </div>
    {show.screening_note ? (
      <div className="film-note">{show.screening_note}</div>
    ) : (
      ''
    )}
    <div className="showtimes">
      {show.showtimes.map((showtime) => (
        <Showtime showtime={showtime} key={showtime} />
      ))}
    </div>
  </div>
);

ShowsList.propTypes = {
  show: PropTypes.shape({
    film: PropTypes.string,
    director: PropTypes.string,
    runtime: PropTypes.string,
    format: PropTypes.string,
    screening_note: PropTypes.string,
    showtimes: PropTypes.array,
    showtimes_display: PropTypes.array,
    showtimesid: PropTypes.string,
  }),
};

ShowsList.defaultProps = {
  show: '',
};

export default ShowsList;
