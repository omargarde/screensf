import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const DateSelector = props => (
  <span className="dates">
    <button
      type="button"
      className="today-button"
      onClick={() => props.handleDateChange(props.dates.today)}
    >
      {props.dates.today.format('ddd MMM D')}
    </button>
    <button
      type="button"
      onClick={() => props.handleDateChange(props.dates.tomorrow)}
    >
      {props.dates.tomorrow.format('ddd MMM D')}
    </button>
    <button
      type="button"
      onClick={() => props.handleDateChange(props.dates.todayPlusTwo)}
    >
      {props.dates.todayPlusTwo.format('ddd MMM D')}
    </button>
    <button
      type="button"
      onClick={() => props.handleDateChange(props.dates.todayPlusThree)}
    >
      {props.dates.todayPlusThree.format('ddd MMM D')}
    </button>
    <button
      type="button"
      onClick={() => props.handleDateChange(props.dates.todayPlusFour)}
    >
      {props.dates.todayPlusFour.format('ddd MMM D')}
    </button>
    <button
      type="button"
      onClick={() => props.handleDateChange(props.dates.todayPlusFive)}
    >
      {props.dates.todayPlusFive.format('ddd MMM D')}
    </button>
    <button
      type="button"
      onClick={() => props.handleDateChange(props.dates.todayPlusSix)}
    >
      {props.dates.todayPlusSix.format('ddd MMM D')}
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
