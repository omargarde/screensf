/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Showtime from './Showtime';
import ShowtimesEditor from '../submit/ShowtimesEditor';
import ScreeningsEditor from '../submit/ScreeningsEditor';
import { theMovieAPI } from '../../../keys';
import { Link } from 'react-router-dom';

const ShowsList = (props) => {
  const { show, submit, dates } = props;
  const movieId = show.movie_id;
  const screenId = show.screening_id;
  const series_uri = `/series/${show.series_uri}`
  const [expand, setExpand] = useState(false);
  const [runtime, setRuntime] = useState('');
  const [movieData, setMovieData] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const filmFormats = ['35mm', '16mm', '8mm', '70mm'];
  const formats = filmFormats.includes(show.format);

  const getCrew = (data, title) => {
    const crewman = [];
    data.credits.crew.forEach((crew) => {
      if (crew.job === title) {
        crewman.push(`${crew.name}`);
      }
    });
    return crewman.join(', ');
  };

  const getYear = (releaseDate) => {
    return releaseDate.split('-')[0];
  };

  useEffect(() => {
    const getMovieData = () => {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${theMovieAPI}&append_to_response=credits`,
      })
        .then((response) => {
          const { data } = response;
          setMovieData(data);
          setDirector(getCrew(data, 'Director'));
          setYear(getYear(data.release_date));
          if (data.runtime > 0) {
            setRuntime(`${data.runtime}min`);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    if (movieId > 1) {
      getMovieData();
    }
  }, [movieId, screenId, show]);

  function Format (props) {
    if (props.format) {
      return <Link to="/onfilm">{props.show.format}</Link>
    } else {
      return <div>{props.show.format}</div>
    }
  }


  return (
    <div>
      <div className="shows-film">
        <div className="film-series">
          <a
            href={(show.series_uri) ? series_uri : show.series_url}
            rel="noreferrer"
            aria-describedby="new-window-2"
          >
            {show.series}
          </a>
        </div>
        <div className="film-title">
          <a
            href={show.screening_url}
            rel="noreferrer"
            aria-describedby="new-window-2"
          >
            {(show.use_alt === 1 || show.movie_id === 1)  ? show.alt_title : movieData.title}
          </a>
        </div>
        <div className="film-details">
          <div>{director}</div>
          <div>{year}</div>
          <div>{runtime}</div>
          <div>
            <Format 
              show={show}
              format={formats}
            />
          </div>
          <div>{submit && (screenId)}
          </div>
        </div>
        <div className="film-note">{show.screening_note}</div>
        {show.showtimes.map((showtime) => (
          <div className="film-note">{showtime.showtime_note}</div>
        ))}
        <div className="showtimes">
          {show.showtimes.map((showtime) => (
            <Showtime showtime={showtime} key={showtime.id} />
          ))}
          {submit && (
            <span>
              <ShowtimesEditor
                screening={show.screening_id}
                submit={submit}
                dates={dates}
                key={show.screening_id}
              />
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
              <ScreeningsEditor show={show} />
            </div>
          )}
        </div>
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
  }),
};

ShowsList.defaultProps = {
  show: '',
};

export default ShowsList;