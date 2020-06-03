import React from 'react';
import PropTypes from 'prop-types';

const Showtime = ({ showtime }) => (
  <span className="showtime">
    {showtime}
  </span>
);

Showtime.propTypes = {
  showtime: PropTypes.string,
};

Showtime.defaultProps = {
  showtime: '',
};

export default Showtime;
