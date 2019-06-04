const pgp = require('pg-promise')();
const moment = require('moment');

const db = pgp('postgres://localhost:5432/screensf');
const exampleFeature = require('./exampleFeature');

const fetchRecommended = (date) => {
  for (let i = 0; i < exampleFeature.length; i += 1) {
    if (exampleFeature[i].date === date) {
      return exampleFeature[i];
    }
  }
  return null;
};

const findRecommendedOnDate = (req, res) => {
  db.query(`SELECT 
    featured_films.featured_image AS image,
    featured_films.author AS writer,
    featured_films.article,
    venues.title AS venue,
    venues.short_title AS venueShortTitle,
    movies.title AS film,
    movies.director,
    movies.year,
    movies.duration,
    string_agg(DISTINCT series.title, ', ') AS series,
    screenings.screening_url,
    string_agg(DISTINCT showtimes.id::character varying, ', ') AS showtimesId,
    string_agg(DISTINCT showtimes.showtime, ', ') AS showtimes,
    screenings.format,
    screenings.screening_note
    FROM 
    featured_films
    INNER JOIN screenings ON featured_films.screenings_id=screenings.id
    INNER JOIN movies ON screenings.movies_id=movies.id
    INNER JOIN venues ON screenings.venues_id=venues.id
    INNER JOIN series_screenings ON screenings.id = series_screenings.screenings_id
    INNER JOIN series ON series.id = series_screenings.series_id 
    INNER JOIN showtimes ON showtimes.screenings_id = screenings.id
    WHERE 
    featured_films.ondate = $/today/
    GROUP BY
    featured_films.featured_image,
    featured_films.author,
    featured_films.article,
    venues.title,
    movies.title,
    movies.director,
    movies.year,
    movies.duration,
    venues.short_title,
    screenings.screening_url,
    screenings.format,
    screenings.screening_note;`, { today: req.params.id })
    .then((data) => {
      console.log('recomended film data', data);
      const featuredData = data[0];
      const showtimes = featuredData.showtimes.split(',');
      featuredData.showtimes = showtimes;
      res.send(JSON.stringify(featuredData));
      res.end();
    })
    .catch((error) => {
      console.error(error);
    });
};


const findShowtimesOnDate = (req, res) => {
  db.query(`SELECT 
    venues.title AS venue,
    venues.short_title AS venueShortTitle,
    movies.title AS film,
    movies.director,
    movies.year,
    movies.duration,
    string_agg(DISTINCT series.title, ', ') AS series,
    screenings.screening_url,
    string_agg(DISTINCT showtimes.id::character varying, ', ') AS showtimesId,
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
    screenings.screening_note;`, { today: req.params.id })
    .then((data) => {
      const showsByVenue = {};

      for (let i = 0; i < data.length; i += 1) {
        const venueTitle = data[i].venue;
        if (!showsByVenue[venueTitle]) {
          showsByVenue[venueTitle] = {
            venue: venueTitle,
            shows: [],
          };
        }

        const showData = data[i];
        const showtimesArr = showData.showtimes.split(',');

        for (let x = 0; x < showtimesArr.length; x += 1) {
          const formatDate = moment(showtimesArr[x]).format('h:mm A');
          showtimesArr[x] = formatDate;
        }

        showData.showtimes = showtimesArr;
        showsByVenue[venueTitle].shows.push(showData);
      }

      res.send(JSON.stringify(Object.values(showsByVenue)));
      res.end();
    })
    .catch((error) => {
      console.error(error);
    });
};


module.exports = { fetchRecommended, findShowtimesOnDate, findRecommendedOnDate };
