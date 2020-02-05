import React from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: 'test',
      series: {
        name: '',
        startdate: moment(),
        enddate: moment(),
      },
      venue: 'test',
      screening: {
        movies_id: 0,
        venues_id: 0,
        screening_url: '',
        startdate: moment(),
        enddate: moment(),
        format: '',
        screening_note: '',
        series_id: 0,
      },
      showtimes: [],
      featuredfilm: [],
    };
  }

  handleScreeningChange(e, key) {
    const { screening } = this.state;
    screening[key] = e;
    this.setState({ screening: screening });
  }

  handleSeriesChange(e, key) {
    const { series } = this.state;
    series[key] = e;
    this.setState({ series: series });
  }

  postMovie() {
    const { movie } = this.state;

    axios(movie)
      .then()
      .catch();
  }

  postSeries() {
    const { series } = this.state;

    axios(series)
      .then()
      .catch();
  }

  postVenue() {
    const { venue } = this.state;

    axios(venue)
      .then()
      .catch();
  }

  postScreening() {
    const { screening } = this.state;
    axios(screening)
      .then()
      .catch();
  }

  postShowtimes() {
    const { showtimes } = this.state;
    axios(showtimes)
      .then()
      .catch();
  }

  postFeaturedFilm() {
    const { featuredfilm } = this.state;
    axios(featuredfilm)
      .then()
      .catch();
  }


  render() {
    const {
      movies,
      series,
      venue,
      screening,
      showtimes,
    } = this.state;

    return (

  <div>
    <div className="submit">
      <h3>Submit Movie</h3>
        <form>
            <label>
              ID:
              <input type="text" />
            </label>
          <label>
            <input type="submit" value="Submit Movie" />
          </label>
        </form>
    </div>

    <div className="submit">
      <form>
          <h3>Submit Series</h3>
            <label>
              Name:
              <input 
                type="text" 
                onChange={e => this.handleSeriesChange(e, 'name')}
              />
            </label>
          <label>
            Start Date:
            <DatePicker
              selected={series.startdate}
              onChange={e => this.handleSeriesChange(e, 'startdate')}
            />
          </label>
          <label>
            End Date:
            <DatePicker
              selected={series.enddate}
              onChange={e => this.handleSeriesChange(e, 'enddate')}
            />
          </label>
          <input type="submit" value="Submit Series" />
      </form>
    </div>

    <div className="submit">
      <h3>Screening</h3>
      <form>
        <label>
          Movie ID:
          <input
            type="text"
            onChange={e => this.handleScreeningChange(e.target.value, 'movies_id')}
          />
        </label>
        <label>
          Series ID:
          <input
            type="text"
            onChange={e => this.handleScreeningChange(e.target.value, 'series_id')}
          />
        </label>
        <label>
          Start Date:
          <DatePicker
            selected={screening.startdate}
            onChange={e => this.handleScreeningChange(e, 'startdate')}
          />
        </label>
        <label>
          End Date:
          <DatePicker
            selected={screening.enddate}
            onChange={e => this.handleScreeningChange(e, 'enddate')}
          />
        </label>
        <label>
          Format:
          <select onChange={e => this.handleScreeningChange(e.target.value, 'format')}>
            <option>DCP</option>
            <option>35mm</option>
            <option>16mm</option>
            <option>70mm</option>
            <option>DV</option>
            <option>VHS</option>
          </select>
        </label>
        <label>
          URL:
          <input
            type="text"
            onChange={e => this.handleScreeningChange(e.target.value, 'screening_url')}
          />
        </label>
        <label>
          Screening Note:
          <input 
            type="text"
            onChange={e => this.handleScreeningChange(e.target.value, 'screening_url')}
          />
        </label>
        <label>
          <h4>Select Venue</h4>
          <select>
            <option>The Castro Theater</option>
            <option>Roxie Theater</option>
            <option>Pacific Film Archive</option>
            <option>Artists Television Access</option>
          </select>
        </label>
         <label>
          <h4>Showtimes</h4>
        <input type="submit" value="Submit Screening" />
      </label>
      </form>
    </div>
  </div>
    );
  }
}

export default Submit;
