/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Showtime from './Showtime';
import ShowtimesEditor from '../submit/ShowtimesEditor';
import ScreeningsEditor from '../submit/ScreeningsEditor';
import { theMovieAPI } from '../../../keys';

const ShowsList = (props) => {
  const { show, submit, today, theaters, dates, setShow } = props;
  const [expand, setExpand] = useState(false);
  const [runtime, setRuntime] = useState('');
  const movieId = show.movie_id;
  const screenId = show.screening_id;
  const [movieData, setMovieData] = useState('');
  const [director, setDirector] = useState(show.director);
  const [year, setYear] = useState(show.year);
  const [showtimeHours, setShowtimeHours] = useState([]);
  const [todayShowtimes, setTodayShow] = useState([]);
  const [hide, setHide] = useState(true);

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
    const getShowtimesData = () => {
      axios({
        method: 'get',
        url: `/showtime-hours/${screenId}`,
      })
        .then((response) => {
          const { data } = response;
          setShowtimeHours(data);
          const todayShows = [];
          data.forEach((item) => {
            const date = item.showtime.slice(0, 10);
            const showHour = Number(item.showtime.slice(11, 13));
            if (item.hide === 0) {
              if (date === today && showHour > 3) {
                todayShows.push(item);
              } else if (date === dates.tomorrow.format('YYYY-MM-DD')) {
                todayShows.push(item);
              }
            }
          });
          setTodayShow(todayShows);
          if (todayShows.length > 0 || show.format === 'Virtual Screening') {
            setHide(false);
            setShow(1);
          }
          if (!submit) setShow(-1);
          if (submit) setHide(false);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    if (screenId) {
      getShowtimesData();
    }
    if (movieId > 1) {
      getMovieData();
    }
  }, [dates, movieId, screenId, setShowtimeHours, show, today]);

  if (hide) return '';

  return (
    <div>
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
          <div>{year}</div>
          <div>{runtime}</div>
          <div>{show.format}</div>
        </div>
        <div className="film-note">{show.screening_note}</div>
        <div className="showtimes">
          {todayShowtimes.map((showtime) => (
            <Showtime showtime={showtime} key={showtime.id} />
          ))}
          {submit && (
            <span>
              <ShowtimesEditor
                today={today}
                screening={show.screening_id}
                showtimes={showtimeHours}
                submit={submit}
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
