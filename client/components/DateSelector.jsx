import React from 'react';
import DatePicker from 'react-datepicker';

const DateSelector = props => (
  <span className="dates">
    <button
      type="button"
      className="today-button"
    >
      {props.dates.today}
    </button>
    <button
      type="button"
    >
      {props.dates.tomorrow}
    </button>
    <button type="button">
      {props.dates.todayPlusTwo}
    </button>
    <button type="button">
      {props.dates.todayPlusThree}
    </button>
    <button type="button">
      {props.dates.todayPlusFour}
    </button>
    <button type="button">
      {props.dates.todayPlusFive}
    </button>
    <button type="button">
      {props.dates.todayPlusSix}
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
