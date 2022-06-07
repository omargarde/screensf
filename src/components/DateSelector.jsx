import React from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';

const DateSelector = (props) => {
  const { handleDateChange, dates } = props;
  const todayClass = "ssf-button ssf-button-today"
  return (
    <span className="dates">
      <Link
        to={`${dates.todaysDate.format('YYYY-MM-DD')}`}
        onClick={() => handleDateChange(dates.todaysDate.format('YYYY-MM-DD'))}
      >
        <div className={todayClass}>Today</div>
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
        onClick={() => handleDateChange(dates.yesterday.format('YYYY-MM-DD'))}
      >
        <div className="ssf-button">Previous</div>
      </Link>
      <Link
        to={`${dates.tomorrow.format('YYYY-MM-DD')}`}
        onClick={() => handleDateChange(dates.tomorrow.format('YYYY-MM-DD'))}
      >
        <div className="ssf-button">Next</div>
      </Link>
    </span>
  );
};

export default DateSelector;
