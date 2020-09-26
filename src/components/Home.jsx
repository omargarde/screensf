import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Featured from './Featured';
import Screenings from './screenings/Screenings';
import DateSelector from './DateSelector';
import 'react-datepicker/dist/react-datepicker.css';
import boilerplate from './boilerplate';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showtimes: [],
      featured: boilerplate.data,
      isLoading: true,
      isSubmit: true,
      today: new Date(),
      selectedDate: new Date(),
      loading: boilerplate.loading,
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
          this.setState({ featured: boilerplate.data });
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

  render() {
    const {
      today,
      selectedDate,
      featured,
      isLoading,
      isSubmit,
      showtimes,
      loading,
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
        <Screenings
          venues={showtimes}
          today={moment(selectedDate).format('YYYY-MM-DD')}
          submit={isSubmit}
        />
      </div>
    );
  }
}

export default Home;
