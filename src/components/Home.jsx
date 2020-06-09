import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Featured from './Featured';
import Screenings from './Screenings';
import DateSelector from './DateSelector';
import 'react-datepicker/dist/react-datepicker.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showtimes: [],
      featured: null,
      today: new Date(),
      selectedDate: new Date(),
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
    this.setState({ featured: null });
    const { selectedDate } = this.state;
    const query = `/recommended/${moment(selectedDate).format('YYYY-MM-DD')}`;

    axios({
      method: 'get',
      url: query,
    })
      .then((response) => {
        this.setState({ featured: response.data });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  fetchShowtimes() {
    const { selectedDate } = this.state;
    const query = `/showtimes/${moment(selectedDate).format('YYYY-MM-DD')}`;

    axios({
      method: 'get',
      url: query,
    })
      .then((response) => {
        this.setState({ showtimes: response.data });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  render() {
    const { today, selectedDate, featured, showtimes } = this.state;

    const dates = {
      yesterday: moment(new Date(selectedDate)).subtract(1, 'days'),
      today: moment(new Date(selectedDate)),
      tomorrow: moment(new Date(selectedDate)).add(1, 'days'),
    };

    return (
      <div>
        <DateSelector
          today={selectedDate}
          dates={dates}
          selected={today}
          onChange={this.dateChange}
          handleDateChange={this.dateChange.bind(this)}
        />
        {featured ? <Featured featured={featured} today={selectedDate} /> : ''}
        <Screenings venues={showtimes} />
      </div>
    );
  }
}

export default Home;
