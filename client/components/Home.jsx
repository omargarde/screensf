import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Recommended from './Recommended.jsx';
import Screenings from './Screenings.jsx';
import DateSelector from './DateSelector.jsx';
import 'react-datepicker/dist/react-datepicker.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showtimes: [],
      featured: null,
      selectedDate: moment(),
    };

    this.dateChange = this.dateChange.bind(this);
  }

  componentDidMount() {
    this.fetchFrontPage();
  }

  dateChange(date) {
    const formatDate = moment(date);

    this.setState({
      selectedDate: formatDate,
    }, this.fetchFrontPage);
  }

  fetchFrontPage() {
    this.fetchRecommended();
    this.fetchShowtimes();
  }

  fetchRecommended() {
    this.setState({ featured: null });
    const { selectedDate } = this.state;
    const query = `/recommended/${selectedDate.format('YYYY-MM-DD')}`;

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
    const query = `/showtimes/${selectedDate.format('YYYY-MM-DD')}`;

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
    const {
      selectedDate,
      featured,
      showtimes,
    } = this.state;

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
          handleDateChange={this.dateChange.bind(this)}
        />
        {featured ? <Recommended featured={featured} today={selectedDate} /> : ''}
        <Screenings venues={showtimes} />

      </div>
    );
  }
}

export default Home;
