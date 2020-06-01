import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const DateSelector = props => (
  <span className="dates">
    <button
      type="button"
      className="previous-button"
      onClick={() => props.handleDateChange(moment())}
    >
      Today
    </button>
    <button
      type="button"
      className="current-button"
      onClick={() => props.handleDateChange(props.dates.today)}
    >
      {props.dates.today.format('ddd MMM D')}
    </button>
    <button
      type="button"
      className="previous-button"
      onClick={() => props.handleDateChange(props.dates.yesterday)}
    >
      Previous
    </button>
    <button
      type="button"
      className="next-button"
      onClick={() => props.handleDateChange(props.dates.tomorrow)}
    >
      Next
    </button>
    <div className="date-calendar">
      <DatePicker
        selected={props.today}
        onChange={props.handleDateChange}
      />
    </div>
  </span>
);

export default DateSelector;
