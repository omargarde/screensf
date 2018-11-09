import React from 'react';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';
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

    axios({
      method: 'get',
      url: '/recommended/' + this.state.selectedDate.format('MMDDYYYY'),
    })
      .then((response) => {
        this.setState({ featured: response.data });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  fetchShowtimes() {
    axios({
      method: 'get',
      url: '/showtimes/' + this.state.selectedDate.format('MMDDYYYY'),
    })
      .then((response) => {
        this.setState({ showtimes: response.data });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  render() {
    return (
      <div>
        <div className="nav">
          <h2>
            Screen SF
          </h2>
        </div>
        <div className="wrapper">
          <div className="dates">
            <button>Today</button>
            <button>Tomorrow</button>
            <button>Day After Tomorrow</button>
            <button>Day After Day After Tomorrow</button>
            <div className="date-calendar">
              <DatePicker
                selected={this.state.selectedDate}
                onChange={this.dateChange}
              />
            </div>
          </div>
          {this.state.featured ? <Recommended featured={this.state.featured} /> : ''}
          <Screenings venues={this.state.showtimes} />
        </div>
        <div className="nav">
          <h2>
            Screen SF
          </h2>
        </div>
      </div>
    );
  }
}

export default App;
