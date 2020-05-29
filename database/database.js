const pgp = require('pg-promise')();
const moment = require('moment');
const { Client } = require('pg')

const client = new Client({
  host:  `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  port: 5334,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
})

const db = pgp(client);

const normalizeShowtimes = (showtimes) => {
  const normalizedTimes = showtimes.split(',');
  for (let x = 0; x < normalizedTimes.length; x += 1) {
    normalizedTimes[x] = moment(normalizedTimes[x], 'YYYY-MM-DD HH:mm:ss').format('h:mm A');
  }
  return normalizedTimes;
};

const getRecommendedOnDate = (req, res) => {
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
    INNER JOIN screenings_series ON screenings.id = screenings_series.screenings_id
    INNER JOIN series ON series.id = screenings_series.series_id 
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
      const featuredData = data[0];
      featuredData.showtimes = normalizeShowtimes(featuredData.showtimes);
      res.send(JSON.stringify(featuredData));
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });
};


const getShowtimesOnDate = (req, res) => {
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
    INNER JOIN screenings_series ON screenings.id = screenings_series.screenings_id
    INNER JOIN series ON series.id = screenings_series.series_id 
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

        showData.showtimes = normalizeShowtimes(showData.showtimes);
        showsByVenue[venueTitle].shows.push(showData);
      }

      res.send(JSON.stringify(Object.values(showsByVenue)));
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });
};


module.exports = {
  getShowtimesOnDate,
  getRecommendedOnDate,
};
