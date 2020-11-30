import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Featured from './Featured';
import Screenings from './screenings/Screenings';
import DateSelector from './DateSelector';
import 'react-datepicker/dist/react-datepicker.css';
import { data, loadImage, isValidDate } from './helpers';
import ScreeningsEditor from './submit/ScreeningsEditor';
import { showBoilerplate } from './submit/helpers';
import SeriesEditor from './submit/SeriesEditor';
import Expand from './submit/Expand';
import MoviesEditor from './submit/MoviesEditor';
import VenueEditor from './submit/VenueEditor';
import FeaturedEditor from './submit/FeaturedEditor';

const Home = () => {
  const isSubmit = false;
  let newDate = new Date();
  const params = useParams();
  if (params.id && isValidDate(params.id)) {
    newDate = new Date(`${params.id} 00:00:00`);
  }
  const [showtimes, setShowtimes] = useState([]);
  const [featured, setFeatured] = useState(data);
  const [isLoading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(newDate);
  const [expand, setExpand] = useState(false);
  const [serExpand, setSerExpand] = useState(false);
  const [movExpand, setMovExpand] = useState(false);
  const [featExpand, setFeatExpand] = useState(false);

  const dateChange = (date) => {
    setSelectedDate(date);
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
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    const fetchRecommended = () => {
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
            setFeatured(data);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    fetchRecommended();
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
      <Featured featured={featured} today={selectedDate} />
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
      <h2 className="screenings-title">
        {dates.today.format('dddd, MMMM D YYYY')}
      </h2>
      <Screenings
        venues={showtimes}
        today={dates.today}
        submit={isSubmit}
        dates={dates}
      />
    </div>
  );
};

export default Home;
