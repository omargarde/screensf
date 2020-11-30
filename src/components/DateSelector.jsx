import React from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';

const DateSelector = (props) => {
  const { handleDateChange, dates } = props;
  return (
    <span className="dates">
      <Link
        to={`${dates.todaysDate.format('YYYY-MM-DD')}`}
        onClick={() => handleDateChange(dates.todaysDate.toDate())}
      >
        <div className="ssf-button">Today</div>
      </Link>
      <Link to="/">
        <div className="date-calendar">
          <DatePicker
            selected={dates.today.toDate()}
            onChange={handleDateChange}
          />
        </div>
      </Link>
      <Link
        to={`${dates.yesterday.format('YYYY-MM-DD')}`}
        onClick={() => handleDateChange(dates.yesterday.toDate())}
      >
        <div className="ssf-button">Previous</div>
      </Link>
      <Link
        to={`${dates.tomorrow.format('YYYY-MM-DD')}`}
        onClick={() => handleDateChange(dates.tomorrow.toDate())}
      >
        <div className="ssf-button">Next</div>
      </Link>
    </span>
  );
};

export default DateSelector;
