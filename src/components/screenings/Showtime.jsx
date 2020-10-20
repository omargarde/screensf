import React from 'react';
import PropTypes from 'prop-types';

const Showtime = (props) => {
  const { showtime } = props;
  let showTimeHour = showtime.showtime.slice(11, 13);
  const showTimeMinute = showtime.showtime.slice(14, 16);
  let amPm = 'AM';
  if (Number(showTimeHour) > 12) {
    showTimeHour = `${Number(showTimeHour) - 12}`;
    amPm = 'PM';
  }
  if (showTimeHour === '12') amPm = 'PM';
  if (showTimeHour === '00') showTimeHour = '12';
  return (
    <span className="showtime">
      {showTimeHour}
      {':'}
      {showTimeMinute}
      {` `}
      {amPm}
    </span>
  );
};

Showtime.propTypes = {
  showtime: PropTypes.object,
};

Showtime.defaultProps = {
  showtime: '',
};

export default Showtime;
