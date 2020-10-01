import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Featured from './Featured';
import Screenings from './screenings/Screenings';
import DateSelector from './DateSelector';
import 'react-datepicker/dist/react-datepicker.css';
import { data, loadImage } from './helpers';
import ScreeningsEditor from './submit/ScreeningsEditor';
import { showBoilerplate } from './submit/helpers';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showtimes: [],
      featured: data,
      isLoading: true,
      isSubmit: true,
      today: new Date(),
      selectedDate: new Date(),
      loading: loadImage,
      expand: false,
      theaters: '',
    };
    this.fetchFrontPage();
    this.dateChange = this.dateChange.bind(this);
  }

  dateChange(date) {
    this.setState(
      {
        selectedDate: date,
      },
      this.fetchFrontPage,
    );
  }

  fetchFrontPage() {
    this.fetchRecommended();
    this.fetchShowtimes();
    this.fetchVenues();
  }

  fetchRecommended() {
    const { selectedDate } = this.state;
    const query = `/recommended/${moment(selectedDate).format('YYYY-MM-DD')}`;

    axios({
      method: 'get',
      url: query,
    })
      .then((response) => {
        if (response.data) {
          this.setState({ featured: response.data });
        } else {
          this.setState({ featured: data });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  fetchShowtimes() {
    const { selectedDate } = this.state;
    const query = `/showtimes/${moment(selectedDate).format('YYYY-MM-DD')}`;
    this.setState({ isLoading: true });
    axios({
      method: 'get',
      url: query,
    })
      .then((response) => {
        this.setState({ showtimes: response.data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: true });
        throw new Error(error);
      });
  }

  fetchVenues() {
    axios({
      method: 'get',
      url: '/venues/',
    }).then((response) => {
      this.setState({ theaters: response.data });
    });
  }

  render() {
    const {
      today,
      selectedDate,
      featured,
      isLoading,
      isSubmit,
      showtimes,
      loading,
      expand,
      theaters,
    } = this.state;

    const dates = {
      yesterday: moment(new Date(selectedDate)).subtract(1, 'days'),
      today: moment(new Date(selectedDate)),
      tomorrow: moment(new Date(selectedDate)).add(1, 'days'),
    };
    if (isLoading)
      return (
        <div className="loading">
          <img src={loading} alt="loading" />
        </div>
      );
    return (
      <div>
        <DateSelector
          today={selectedDate}
          dates={dates}
          selected={today}
          onChange={this.dateChange}
          handleDateChange={this.dateChange}
        />
        <Featured featured={featured} today={selectedDate} />
        {isSubmit && (
          <div className="film-title">
            Add Screening
            <button
              type="button"
              className="submit-screening-button"
              onClick={() => this.setState({ expand: !expand })}
            >
              {expand ? '-' : '+'}
            </button>
          </div>
        )}
        {expand && (
          <ScreeningsEditor
            show={showBoilerplate}
            submit={isSubmit}
            theaters={theaters}
          />
        )}
        <Screenings
          venues={showtimes}
          today={moment(selectedDate).format('YYYY-MM-DD')}
          submit={isSubmit}
          theaters={theaters}
        />
      </div>
    );
  }
}

export default Home;
