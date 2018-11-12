import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Recommended from './Recommended.jsx';
import Screenings from './Screenings.jsx';
import DateSelector from './DateSelector.jsx';
import 'react-datepicker/dist/react-datepicker.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showtimes: [],
      featured: null,
      selectedDate: moment('07152018', 'MMDDYYYY'),
    };

    this.dateChange = this.dateChange.bind(this);
    this.fetchShowtimes = this.fetchShowtimes.bind(this);
    this.fetchRecommended = this.fetchRecommended.bind(this);
  }

  componentDidMount() {
    this.updateComponents();
  }

  dateChange(date) {
    this.setState({
      selectedDate: date,
    }, this.updateComponents);
  }

  updateComponents() {
    this.fetchRecommended();
    this.fetchShowtimes();
  }

  fetchRecommended() {
    this.setState({ featured: null });
    const { selectedDate } = this.state;
    const query = `/recommended/${selectedDate.format('MMDDYYYY')}`;

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
    const query = `/showtimes/${selectedDate.format('MMDDYYYY')}`;

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

<<<<<<< HEAD
=======
    const dates = {
      today: moment(new Date(selectedDate)).format('ddd MMM D'),
      tomorrow: moment(new Date(selectedDate)).add(1, 'days').format('ddd MMM D'),
      todayPlusTwo: moment(new Date(selectedDate)).add(2, 'days').format('ddd MMM D'),
      todayPlusThree: moment(new Date(selectedDate)).add(3, 'days').format('ddd MMM D'),
      todayPlusFour: moment(new Date(selectedDate)).add(4, 'days').format('ddd MMM D'),
      todayPlusFive: moment(new Date(selectedDate)).add(5, 'days').format('ddd MMM D'),
      todayPlusSix: moment(new Date(selectedDate)).add(6, 'days').format('ddd MMM D'),
    };
>>>>>>> 05c03b698c61efed1c9cac0a29394df8e27c945f

    return (
      <div>
        <div className="nav">
          <h2>
            Screen San Francisco
          </h2>
        </div>
        <div className="wrapper">
          <DateSelector
            today={selectedDate}
            dates={dates}
            handleDateChange={this.dateChange.bind(this)}
            />
          {featured ? <Recommended featured={featured} /> : ''}
          <Screenings venues={showtimes} />
        </div>
        <div className="nav">
          <h2>
            Screen San Francisco
          </h2>
        </div>
      </div>
    );
  }
}

export default App;
