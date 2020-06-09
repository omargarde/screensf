import React from 'react';
import DatePicker from 'react-datepicker';

const DateSelector = (props) => {
  const { today, handleDateChange, dates } = props;
  return (
    <span className="dates">
      <button
        type="button"
        className="ssf-button"
        onClick={() => handleDateChange(new Date())}
      >
        Today
      </button>
      <div className="date-calendar">
        <DatePicker selected={today} onChange={handleDateChange} />
      </div>
      <button
        type="button"
        className="ssf-button"
        onClick={() => props.handleDateChange(dates.yesterday.toDate())}
      >
        Previous
      </button>
      <button
        type="button"
        className="ssf-button"
        onClick={() => props.handleDateChange(dates.tomorrow.toDate())}
      >
        Next
      </button>
    </span>
  );
};

export default DateSelector;
