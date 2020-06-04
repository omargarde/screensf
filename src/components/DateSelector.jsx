import React from 'react';
import DatePicker from 'react-datepicker';

const DateSelector = props => (
  <span className="dates">
    <button
      type="button"
      className="ssf-button"
      onClick={() => props.handleDateChange(new Date())}
    >
      Today
    </button>
    <div className="date-calendar">
      <DatePicker
        selected={props.today}
        onChange={props.handleDateChange}
      />
    </div>
    <button
      type="button"
      className="ssf-button"
      onClick={() => props.handleDateChange(props.dates.yesterday.toDate())}
    >
      Previous
    </button>
    <button
      type="button"
      className="ssf-button"
      onClick={() => props.handleDateChange(props.dates.tomorrow.toDate())}
    >
      Next
    </button>
  </span>
);

export default DateSelector;
