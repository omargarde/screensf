const digitsList = (first, last, label) => {
  const digits = [];
  let i = first;
  while (i <= last) {
    const item = {};
    item.id = i;
    item[label] = `${i}`;
    if (i < 10) item[label] = `0${i}`;
    digits.push(item);
    i += 1;
  }
  return digits;
};

const showBoilerplate = {
  alt_title: '',
  director: '',
  end_date: '',
  film: '',
  format: 'DCP',
  movie_id: '',
  release_date: '',
  runtime: '',
  screening_id: '',
  screening_note: '',
  screening_url: '',
  series: '',
  series_url: '',
  series_id: 1,
  showtimes: [],
  showtimes_hide: '',
  showtimesid: [],
  start_date: '',
  venue: '',
  venue_address: '',
  venueshorttitle: '',
  year: '',
  submit: true,
  use_alt: 0,
  canceled: 0,
};

const dateHandle = (date) => {
  if (date === null) {
    return '';
  } else if (date === '') {
    return null;
  } else {
    return date.split('T')[0];
  }
}

module.exports = {
  digitsList,
  showBoilerplate,
  dateHandle,
};
