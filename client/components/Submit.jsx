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
        name: '',
        startdate: moment(),
        enddate: moment(),
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
          <form>
            <div className="submit">
              <h3>Submit Movie</h3>
              <div>
                ID:
                <div>
                <input type="text" />
                </div>
              </div>
              <input type="submit" value="Submit Movie" />
            </div>
          </form>

          <form>
            <div className="submit">
              <h3>Series</h3>
              <div>
                Name:
                <div>
                  <input type="text" />
                </div>
              </div>
              <div>
                Start Date:
                <DatePicker
                  selected={series.startdate}
                  onChange={this.seriesStartChange.bind(this)}
                />
              </div>
              <div>
                End Date:
                <DatePicker
                  selected={series.enddate}
                  onChange={this.seriesEndChange.bind(this)}
                />
              </div>
              <input type="submit" value="Submit Series" />
            </div>
          </form>


          <form>
            <div className="submit">
              <h3>Screening</h3>
              <div>
                Start Date:
                <DatePicker
                  selected={screening.startdate}
                  onChange={this.screeningStartChange.bind(this)}
                />
              </div>
              <div>
                End Date:
                <DatePicker
                  selected={screening.startdate}
                  onChange={this.screeningEndChange.bind(this)}
                />
              </div>
              <div>
                  Format:
                  <select>
                    <option value="grapefruit">DCP</option>
                    <option value="lime">35mm</option>
                    <option value="coconut">16mm</option>
                    <option value="mango">70mm</option>
                    <option value="mango">DV</option>
                    <option value="mango">VHS</option>
                  </select>
              </div>
              <div>
                URL:
                <div>
                  <input type="text" />
                </div>
              </div>
              <div>
                Screening Note:
                <div>
                  <textarea />
                </div>
              </div>
                <div>
                  <h4>Select Venue</h4>
                </div>
                <select>
                  <option>The Castro Theater</option>
                  <option>Roxie Theater</option>
                  <option>Pacific Film Archive</option>
                  <option>Artists Television Access</option>
                </select>
              <div>
                <h4>Showtimes</h4>
              </div>
              <input type="submit" value="Submit Screening" />
            </div>
          </form>
        </div>
    );
  }
}

export default Submit;
