const pgp = require('pg-promise')();
const exampleData = require('./exampleData');
const exampleFeature = require('./exampleFeature');
const db = pgp('postgres://localhost:5432/screensf');

const fetchShowtimes = (date) => {
  const nest = {};

  for (let i = 0; i < exampleData.length; i += 1) {
    if (exampleData[i].date === date) {
      if (!nest[exampleData[i].venue]) {
        nest[exampleData[i].venue] = {
          venue: exampleData[i].venue,
          shows: [],
        };
      }

      const showArray = nest[exampleData[i].venue].shows;
      let match = 0;

      for (let x = 0; x < showArray.length; x += 1) {
        if (showArray[x].film === exampleData[i].film) {
          showArray[x].showtimes.push(exampleData[i].showtime);
          match += 1;
        }
      }

      if (!match) {
        const show = exampleData[i];
        show.showtimes = [exampleData[i].showtime];
        nest[exampleData[i].venue].shows.push(show);
      }
    }
  }
  return Object.values(nest);
};


const fetchRecommended = (date) => {
  for (let i = 0; i < exampleFeature.length; i += 1) {
    if (exampleFeature[i].date === date) {
      return exampleFeature[i];
    }
  }
};


const findShowtimesOnDate = (date) => {
  db.query(`SELECT 
    venues.title AS venue_title,
    venues.short_title AS venue_short_title,
    movies.title,
    movies.director,
    movies.year,
    movies.duration,
    string_agg(DISTINCT series.title, ', ') AS series_title,
    screenings.screening_url,
    string_agg(DISTINCT showtimes.id::character varying, ', ') AS showtimes_id,
    string_agg(DISTINCT showtimes.showtime, ', ') AS showtimes,
    screenings.format,
    screenings.screening_note
    FROM
    screenings
    INNER JOIN movies ON screenings.movies_id=movies.id
    INNER JOIN venues ON screenings.venues_id=venues.id
    INNER JOIN series_screenings ON screenings.id = series_screenings.screenings_id
    INNER JOIN series ON series.id = series_screenings.series_id 
    INNER JOIN showtimes ON showtimes.screenings_id = screenings.id
    WHERE
    screenings.start_date <= $/today/ AND screenings.end_date >= $/today/
    GROUP BY
    venues.title,
    movies.title,
    movies.director,
    movies.year,
    movies.duration,
    venues.short_title,
    screenings.screening_url,
    screenings.format,
    screenings.screening_note;`, { today: date })
    .then((data) => {
      console.log(JSON.stringify(data));
    })
    .catch((error) => {
      console.log('Error', error);
    });
};


module.exports = { fetchShowtimes, fetchRecommended, findShowtimesOnDate };
