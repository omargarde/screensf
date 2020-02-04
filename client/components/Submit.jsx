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
      },
      showtimes: [],
      featuredfilm: [],
    };
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

  seriesStartChange(date) {
    const { series } = this.state;
    series.startdate = date;
    this.setState({ series: series });
  }

  seriesEndChange(date) {
    const { series } = this.state;
    series.enddate = date;
    this.setState({ series: series });
  }

  screeningStartChange(date) {
    const { screening } = this.state;
    screening.startdate = date;
    this.setState({ screening: screening });
  }

  screeningEndChange(date) {
    const { screening } = this.state;
    screening.enddate = date;
    this.setState({ screening: screening });
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
              <input type="text" />
            </label>
          <label>
            Start Date:
            <DatePicker
              selected={series.startdate}
              onChange={this.seriesStartChange.bind(this)}
            />
          </label>
          <label>
            End Date:
            <DatePicker
              selected={series.enddate}
              onChange={this.seriesEndChange.bind(this)}
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
            <input type="text" />
          </label>
          <label>
            Series ID:
            <input type="text" />
          </label>
          <label>
            Start Date:
            <DatePicker
              selected={screening.startdate}
              onChange={this.screeningStartChange.bind(this)}
            />
          </label>
          <label>
            End Date:
            <DatePicker
              selected={screening.enddate}
              onChange={this.screeningEndChange.bind(this)}
            />
          </label>
          <label>
            Format:
            <select>
              <option value="grapefruit">DCP</option>
              <option value="lime">35mm</option>
              <option value="coconut">16mm</option>
              <option value="mango">70mm</option>
              <option value="mango">DV</option>
              <option value="mango">VHS</option>
            </select>
          </label>
          <label>
            URL:
            <input type="text" />
          </label>
          <label>
            Screening Note:
            <textarea />
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
