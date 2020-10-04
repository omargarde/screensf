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
  format: '',
  movie_id: '',
  release_date: '',
  runtime: '',
  screening_id: '',
  screening_note: '',
  screening_url: '',
  series: '',
  series_url: '',
  series_id: '',
  showtimes: [],
  showtimes_hide: '',
  showtimesid: [],
  start_date: '',
  venue: '',
  venue_address: '',
  venueshorttitle: '',
  year: '',
};

module.exports = {
  digitsList,
  showBoilerplate,
};
