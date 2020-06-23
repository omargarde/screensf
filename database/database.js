const { Client } = require('pg');
const moment = require('moment');

const client = new Client({
  // host: `localhost`,
  // user: process.env.USER,
  // database: 'screensf',
  host: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

const normalizeShowtimes = (showtimes, showtimesHide, date) => {
  const newTimes = [];
  if (showtimes === null) return newTimes;
  const today = new Date(`${date} 00:00:00-8:00`);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const times = showtimes.split(',');
  for (let x = 0; x < times.length; x += 1) {
    const showtime = new Date(times[x]);
    if (showtime >= today && showtime < tomorrow && showtimesHide[x] === 0) {
      newTimes.push(moment(times[x], 'YYYY-MM-DD HH:mm:ss').format('h:mm A'));
    }
  }
  return newTimes;
};

const getYear = (releaseDate) => {
  if (releaseDate === null) return '';
  return releaseDate.getFullYear();
}

const getRecommendedOnDate = (req, res) => {
  const today = req.params.id;
  const query = {
    text: `SELECT 
    featured_films.featured_image AS image,
    featured_films.author AS writer,
    featured_films.article,
    venues.title AS venue,
    venues.short_title AS venueShortTitle,
    venues.address AS venue_address,
    movies.title AS film,
    movies.director,
    movies.release_date,
    movies.runtime,
    string_agg(DISTINCT series.title, ', ') AS series,
    screenings.id,
    screenings.alt_title,
    screenings.screening_url,
    string_agg(DISTINCT showtimes.id::character varying, ', ') AS showtimesId,
    string_agg(DISTINCT showtimes.showtime, ', ') AS showtimes,
    array_agg(showtimes.hide) AS showtimes_hide,
    screenings.format,
    screenings.screening_note
    FROM 
    featured_films
    INNER JOIN screenings ON featured_films.screenings_id=screenings.id
    INNER JOIN movies ON screenings.movies_id=movies.id
    INNER JOIN venues ON screenings.venues_id=venues.id
    INNER JOIN screenings_series ON screenings.id = screenings_series.screenings_id
    INNER JOIN series ON series.id = screenings_series.series_id 
    LEFT JOIN showtimes ON showtimes.screenings_id = screenings.id
    WHERE 
    featured_films.ondate = $1
    GROUP BY
    featured_films.featured_image,
    featured_films.author,
    featured_films.article,
    venues.title,
    movies.title,
    movies.director,
    movies.release_date,
    movies.runtime,
    venues.short_title,
    venues.address,
    screenings.id,
    screenings.alt_title,
    screenings.screening_url,
    screenings.format,
    screenings.screening_note;`,
    values: [today],
  };
  client
    .query(query)
    .then((data) => {
      if (data.rows[0]) {
        const featuredData = data.rows[0];
        featuredData.showtimes = normalizeShowtimes(
          featuredData.showtimes,
          featuredData.showtimes_hide,
          req.params.id,
        );
        res.send(JSON.stringify(featuredData));
        res.end();
      }
      res.end();
    })
    .catch((error) => {
      res.end(error);
    });
};

const getShowtimesOnDate = (req, res) => {
  const today = req.params.id;
  const query = {
    text: `SELECT 
    venues.title AS venue,
    venues.short_title AS venueShortTitle,
    venues.address AS venue_address,
    movies.title AS film,
    movies.director,
    movies.release_date,
    movies.runtime,
    string_agg(DISTINCT series.title, ', ') AS series,
    screenings.alt_title,
    screenings.screening_url,
    string_agg(DISTINCT showtimes.id::character varying, ', ') AS showtimesId,
    string_agg(DISTINCT showtimes.showtime, ', ') AS showtimes,
    array_agg(showtimes.hide) AS showtimes_hide,
    screenings.format,
    screenings.screening_note
    FROM
    screenings
    INNER JOIN movies ON screenings.movies_id=movies.id
    INNER JOIN venues ON screenings.venues_id=venues.id
    INNER JOIN screenings_series ON screenings.id = screenings_series.screenings_id
    INNER JOIN series ON series.id = screenings_series.series_id 
    LEFT JOIN showtimes ON showtimes.screenings_id = screenings.id
    WHERE
    screenings.start_date <= $1 AND screenings.end_date >= $1 AND screenings.canceled = 0
    GROUP BY
    venues.title,
    movies.title,
    movies.director,
    movies.release_date,
    movies.runtime,
    venues.short_title,
    venues.address,
    screenings.alt_title,
    screenings.screening_url,
    screenings.format,
    screenings.screening_note;`,
    values: [today],
  };

  client
    .query(query)
    .then((data) => {
      if (data.rows) {
        const { rows } = data;
        const showsByVenue = {};
        for (let i = 0; i < rows.length; i += 1) {
          const venueTitle = rows[i].venue;
          const venueAddress = rows[i].venue_address.split(',');
          const shortAddress = `${venueAddress[0]}, ${venueAddress[1]}`;
          if (!showsByVenue[venueTitle]) {
            showsByVenue[venueTitle] = {
              venue: venueTitle,
              address: shortAddress,
              shows: [],
            };
          }
          const showData = rows[i];
          showData.showtimes = normalizeShowtimes(
            rows[i].showtimes,
            rows[i].showtimes_hide,
            today,
          );
          showData.year = getYear(showData.release_date);
          if (
            showData.showtimes.length > 0 ||
            showData.format === 'Virtual Screening'
          ) {
            showsByVenue[venueTitle].shows.push(showData);
          }
        }
        const showsFinal = {};
        Object.keys(showsByVenue).forEach((item) => {
          if (showsByVenue[item].shows.length > 0) {
            showsFinal[item] = showsByVenue[item];
          }
        });
        const showsStr = JSON.stringify(Object.values(showsFinal));
        res.send(showsStr);
      }
      res.end();
    })
    .catch((error) => {
      console.log('error', error);
      res.end(error);
    });
};

module.exports = {
  getShowtimesOnDate,
  getRecommendedOnDate,
};
