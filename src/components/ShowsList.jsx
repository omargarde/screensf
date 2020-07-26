/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import Showtime from './Showtime';

const ShowsList = ({ show }) => (
  <div className="shows-film">
    <div className="film-series">
      <a
        href={show.series_url}
        target="_blank"
        rel="noreferrer"
        aria-describedby="new-window-2"
      >
        {show.series}
      </a>
    </div>
    <div className="film-title">
      <a
        href={show.screening_url}
        target="_blank"
        rel="noreferrer"
        aria-describedby="new-window-2"
      >
        {show.film ? show.film : show.alt_title}
      </a>
    </div>
    <div className="film-details">
      <div>{show.director}</div>
      <div>{show.year}</div>
      {show.runtime ? <div>{show.runtime}min</div> : ''}
      <div>{show.format}</div>
    </div>
    <div className="film-note">{show.screening_note}</div>
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
    runtime: PropTypes.number,
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
