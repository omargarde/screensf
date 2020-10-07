import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Featured from './Featured';
import Screenings from './screenings/Screenings';
import DateSelector from './DateSelector';
import 'react-datepicker/dist/react-datepicker.css';
import { data, loadImage, editShowtimes } from './helpers';
import ScreeningsEditor from './submit/ScreeningsEditor';
import { showBoilerplate } from './submit/helpers';
import SeriesEditor from './submit/SeriesEditor';
import Expand from './submit/Expand';

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
      serExpand: false,
      theaters: '',
    };
    this.fetchFrontPage();
    this.dateChange = this.dateChange.bind(this);
    this.expandChange = this.expandChange.bind(this);
    this.serExpandChange = this.serExpandChange.bind(this);
  }

  dateChange(date) {
    this.setState(
      {
        selectedDate: date,
      },
      this.fetchFrontPage,
    );
  }

  expandChange() {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  serExpandChange() {
    const { serExpand } = this.state;
    this.setState({ serExpand: !serExpand });
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
    const { selectedDate, isSubmit } = this.state;
    const query = `/showtimes/${moment(selectedDate).format('YYYY-MM-DD')}`;
    this.setState({ isLoading: true });
    axios({
      method: 'get',
      url: query,
    })
      .then((response) => {
        if (isSubmit) {
          this.setState({ showtimes: response.data, isLoading: false });
        } else {
          this.setState({
            showtimes: editShowtimes(response.data),
            isLoading: false,
          });
        }
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
      serExpand,
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
        <Expand
          handleExpand={this.expandChange}
          expand={expand}
          submit={isSubmit}
          title="Add Screening"
        />
        {expand && (
          <ScreeningsEditor show={showBoilerplate} theaters={theaters} />
        )}
        <Expand
          handleExpand={this.serExpandChange}
          expand={serExpand}
          submit={isSubmit}
          title="Series Editor"
        />
        {serExpand && <SeriesEditor show={showBoilerplate} />}
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
