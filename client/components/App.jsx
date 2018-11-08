import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import Recommended from './Recommended.jsx';
import Screenings from './Screenings.jsx';
import 'react-datepicker/dist/react-datepicker.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showtimes: [],
      featured: null,
      startDate: moment('07152018', 'MMDDYYYY'),
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
      startDate: date,
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
      url: '/recommended/' + this.state.startDate.format('MMDDYYYY'),
    })
      .then((response) => {
        this.setState({ featured: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchShowtimes() {
    axios({
      method: 'get',
      url: '/showtimes/' + this.state.startDate.format('MMDDYYYY'),
    })
      .then((response) => {
        this.setState({ showtimes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
.,.,.nn
  render() {
    return (
      <div>
        <div className="nav">
          <h2>
            Screen SF
          </h2>
        </div>
        <div className="wrapper">
          <div className="date-calendar">
            <DatePicker
              selected={this.state.startDate}
              onSelect={this.dateChange}
            />
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
