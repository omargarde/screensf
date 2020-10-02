import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Showtime from './Showtime';
import ShowtimesEditor from '../submit/ShowtimesEditor';
import ScreeningsEditor from '../submit/ScreeningsEditor';
import { theMovieAPI } from '../../../keys';

const ShowsList = (props) => {
  const { show, submit, today, theaters } = props;
  const [expand, setExpand] = useState(false);
  const [runtime, setRuntime] = useState('');
  const movieId = show.movie_id;
  const [movieData, setMovieData] = useState('');
  const [director, setDirector] = useState(show.director);

  const getCrew = (data, title) => {
    const crewman = [];
    data.credits.crew.forEach((crew) => {
      if (crew.job === title) {
        crewman.push(`${crew.name}`);
      }
    });
    return crewman.join(', ');
  }

  useEffect(() => {
    if (movieId > 1) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${theMovieAPI}&append_to_response=credits`,
      })
        .then((response) => {
          setMovieData(response.data);
          setDirector(getCrew(response.data, 'Director'));
          if (response.data.runtime > 0) {
            setRuntime(`${response.data.runtime}min`);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  });

  return (
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
          {movieData.title ? movieData.title : show.alt_title}
        </a>
      </div>
      <div className="film-details">
        <div>{director}</div>
        <div>{show.year}</div>
        <div>{runtime}</div>
        <div>{show.format}</div>
      </div>
      <div className="film-note">{show.screening_note}</div>
      <div className="showtimes">
        {show.showtimes.map((showtime) => (
          <Showtime showtime={showtime} key={showtime} />
        ))}
        {submit && (
          <span>
            <ShowtimesEditor today={today} show={show} submit={submit} />
          </span>
        )}
        {submit && (
          <div className="film-title">
            Edit Screening
            <button
              type="button"
              className="submit-screening-button"
              onClick={() => setExpand(!expand)}
            >
              {expand ? '-' : '+'}
            </button>
          </div>
        )}
        {expand && (
          <div>
            <ScreeningsEditor
              today={today}
              show={show}
              submit={submit}
              theaters={theaters}
            />
          </div>
        )}
      </div>
    </div>
  );
};

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
