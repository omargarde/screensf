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
import SeriesEditor from './submit/SeriesEditor';
import Expand from './submit/Expand';
import MoviesEditor from './submit/MoviesEditor';
import VenueEditor from './submit/VenueEditor';
import FeaturedEditor from './submit/FeaturedEditor';

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
      movExpand: false,
      featExpand: false,
    };
    this.fetchFrontPage();
    this.dateChange = this.dateChange.bind(this);
    this.expandChange = this.expandChange.bind(this);
    this.serExpandChange = this.serExpandChange.bind(this);
    this.movExpandChange = this.movExpandChange.bind(this);
    this.featExpandChange = this.featExpandChange.bind(this);
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

  movExpandChange() {
    const { movExpand } = this.state;
    this.setState({ movExpand: !movExpand });
  }

  featExpandChange() {
    const { featExpand } = this.state;
    this.setState({ featExpand: !featExpand });
  }

  fetchFrontPage() {
    this.fetchRecommended();
    this.fetchShowtimes();
  }

  fetchRecommended() {
    const { selectedDate } = this.state;
    const thisDay = moment(selectedDate).format('YYYY-MM-DD');
    const nextDay = moment(new Date(selectedDate))
      .add(1, 'days')
      .format('YYYY-MM-DD');
    const query = `/recommended/${thisDay}-${nextDay}`;
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
    const thisDay = moment(selectedDate).format('YYYY-MM-DD');
    const nextDay = moment(new Date(selectedDate))
      .add(1, 'days')
      .format('YYYY-MM-DD');
    let query = `/showtimes/${thisDay}-${nextDay}`;
    if (isSubmit) query = `/showtimes-submit/${thisDay}-${nextDay}`;
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
      movExpand,
      featExpand,
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
          handleExpand={this.featExpandChange}
          expand={featExpand}
          submit={isSubmit}
          title="Add Featured"
        />
        {featExpand && <FeaturedEditor />}
        <Expand
          handleExpand={this.expandChange}
          expand={expand}
          submit={isSubmit}
          title="Add Screening"
        />
        {expand && <ScreeningsEditor show={showBoilerplate} />}
        <Expand
          handleExpand={this.serExpandChange}
          expand={serExpand}
          submit={isSubmit}
          title="Series and Venue Editors"
        />
        {serExpand && <SeriesEditor show={showBoilerplate} />}
        {serExpand && <VenueEditor />}
        <Expand
          handleExpand={this.movExpandChange}
          expand={movExpand}
          submit={isSubmit}
          title="Movie Editor"
        />
        {movExpand && <MoviesEditor />}
        <Screenings
          venues={showtimes}
          today={moment(selectedDate).format('YYYY-MM-DD')}
          submit={isSubmit}
          dates={dates}
        />
      </div>
    );
  }
}

export default Home;
