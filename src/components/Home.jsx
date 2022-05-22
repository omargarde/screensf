/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Featured from './Featured';
import Screenings from './screenings/Screenings';
import DateSelector from './DateSelector';
import 'react-datepicker/dist/react-datepicker.css';
import { featWelcome, loadImage } from './helpers';
import ScreeningsEditor from './submit/ScreeningsEditor';
import { showBoilerplate } from './submit/helpers';
import SeriesEditor from './submit/SeriesEditor';
import Expand from './submit/Expand';
import MoviesEditor from './submit/MoviesEditor';
import VenueEditor from './submit/VenueEditor';
import FeaturedEditor from './submit/FeaturedEditor';

const Home = () => {
  const isSubmit = true;
  const params = useParams();
  const selected = (sDate) => {
    const newDate = moment(`${sDate} 00:00`, 'YYYY-MM-DD HH:mm').toDate();
    if (!isNaN(newDate)) {
      return newDate;
    }
    return new Date();
  };
  const [showtimes, setShowtimes] = useState([]);
  const [featured, setFeatured] = useState(featWelcome);
  const [featIndex, setFeatIndex] = useState(Math.floor(Math.random() * 5));
  const [isLoading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(selected(params.id));
  const [expand, setExpand] = useState(false);
  const [serExpand, setSerExpand] = useState(false);
  const [movExpand, setMovExpand] = useState(false);
  const [featExpand, setFeatExpand] = useState(false);
  const [shows, setShows] = useState([]);
  const [virtual, setVirtual] = useState([]);

  const dateChange = (date) => {
    if (!isNaN(date)) {
      setSelectedDate(date);
    } else {
      setSelectedDate(selected(date));
    }
    setLoading(true);
  };

  useEffect(() => {
    const fetchShowtimes = () => {
      const thisDay = moment(selectedDate).format('YYYY-MM-DD');
      const nextDay = moment(new Date(selectedDate))
        .add(1, 'days')
        .format('YYYY-MM-DD');
      let query = `api/showtimes/${thisDay}-${nextDay}`;
      if (isSubmit) query = `api/showtimes-submit/${thisDay}-${nextDay}`;
      axios({
        method: 'get',
        url: query,
      })
        .then((response) => {
          setShowtimes(response.data);
          setLoading(false);
          const show = [];
          const virtScr = [];
          response.data.forEach((item) => {
            if (item.shows.length > 0) {
              show.push(item.shows);
            }
            if (item.virtualScreenings.length > 0) {
              virtScr.push(item.virtualScreenings);
            }
          });
          setShows(show);
          setVirtual(virtScr);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    const fetchFeatured = () => {
      const thisDay = moment(selectedDate).format('YYYY-MM-DD');
      const nextDay = moment(new Date(selectedDate))
        .add(1, 'days')
        .format('YYYY-MM-DD');
      const query = `api/recommended/${thisDay}-${nextDay}`;
      axios({
        method: 'get',
        url: query,
      })
        .then((response) => {
          if (response.data) {
            setFeatured(response.data);
          } else {
            setFeatured(featWelcome);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    fetchFeatured();
    fetchShowtimes();
  }, [isSubmit, selectedDate]);

  const dates = {
    yesterday: moment(new Date(selectedDate)).subtract(1, 'days'),
    today: moment(new Date(selectedDate)),
    tomorrow: moment(new Date(selectedDate)).add(1, 'days'),
    todaysDate: moment(new Date()),
  };
  if (isLoading)
    return (
      <div className="loading">
        <img src={loadImage} alt="loading" />
      </div>
    );
  return (
    <div>
      <DateSelector
        dates={dates}
        onChange={dateChange}
        handleDateChange={dateChange}
      />
      <Featured
        featured={featured} 
        today={selectedDate}
        featIndex={featIndex}
        setFeatIndex={setFeatIndex}
      />
      <Expand
        handleExpand={setFeatExpand}
        expand={featExpand}
        submit={isSubmit}
        title="Featured Editor"
      />
      {featExpand && <FeaturedEditor />}
      <Expand
        handleExpand={setExpand}
        expand={expand}
        submit={isSubmit}
        title="Screening Editor"
      />
      {expand && <ScreeningsEditor show={showBoilerplate} />}
      <Expand
        handleExpand={setSerExpand}
        expand={serExpand}
        submit={isSubmit}
        title="Series and Venue Editors"
      />
      {serExpand && <SeriesEditor show={showBoilerplate} />}
      {serExpand && <VenueEditor />}
      <Expand
        handleExpand={setMovExpand}
        expand={movExpand}
        submit={isSubmit}
        title="Movie Editor"
      />
      {movExpand && <MoviesEditor />}
      <Screenings
        venues={showtimes}
        submit={isSubmit}
        dates={dates}
        shows={shows}
        virtual={virtual}
      />
      <div className="bottom-space" />
    </div>
  );
};

export default Home;
