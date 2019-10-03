import React from 'react';
import DatePicker from 'react-datepicker';


// movies
// series
// venues
// screenings
// showtimes
// screenings_series
// venues_series
// featured_films
// a movie that plays several venues is not considered the same screening,
// it is considered a different screening of the same film in the same series.

function Submit() {
  return (
    <div className="submit">
      <form>
        <div className="submit-movie">
          <label>
            Movie:
            <input type="text" />
          </label>
        </div>
        <div className="submit-series">
          <div>
            <label>
              Series Name:
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              Start Date:
              <DatePicker />
            </label>
          </div>
          <div>
            <label>
              End Date:
              <DatePicker />
            </label>
          </div>
        </div>
        <div className="submit-screening">
          This is where we submit screening information
          <div>
            <label>
              Start Date:
              <DatePicker />
            </label>
          </div>
          <div>
            <label>
              End Date:
              <DatePicker />
            </label>
          </div>
          <div>
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
          </div>
          <div>
            <label>
              URL: 
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              Screening Note: 
              <textarea />
            </label>
          </div>
        </div>
        <div className="submit-showtimes">
          Showtimes Picker
        </div>
        <div className="submit-venue">
          <select>
            <option>The Castro Theater</option>
            <option>Roxie Theater</option>
            <option>Pacific Film Archive</option>
            <option>Artists Television Access</option>
          </select>
        </div>
        <input type="submit" value="Submit Showtime" />
      </form>
    </div>
  );
}

export default Submit;
