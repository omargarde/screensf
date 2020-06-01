const { Client } = require('pg')
const moment = require('moment');

const client = new Client({
  // host:  `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  host: `localhost`,
  user: process.env.USER,
  database: 'screensf',
  // user: process.env.DB_USER,
  // database: process.env.DB_NAME,
  // database: 'screensf'
  // password: process.env.DB_PASS,
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

const normalizeShowtimes = (showtimes) => {
  const normalizedTimes = showtimes.split(',');
  for (let x = 0; x < normalizedTimes.length; x += 1) {
    normalizedTimes[x] = moment(normalizedTimes[x], 'YYYY-MM-DD HH:mm:ss').format('h:mm A');
  }
  return normalizedTimes;
};

const getRecommendedOnDate = (req, res) => {
  const recquery = {
    text: `SELECT 
    featured_films.featured_image AS image,
    featured_films.author AS writer,
    featured_films.article,
    venues.title AS venue,
    venues.short_title AS venueShortTitle,
    movies.title AS film,
    movies.director,
    movies.year,
    movies.runtime,
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
    featured_films.ondate = $1
    GROUP BY
    featured_films.featured_image,
    featured_films.author,
    featured_films.article,
    venues.title,
    movies.title,
    movies.director,
    movies.year,
    movies.runtime,
    venues.short_title,
    screenings.screening_url,
    screenings.format,
    screenings.screening_note;`,
    values: [req.params.id],
  }
  client.query(recquery)
    .then((data) => {
      if (data.rows[0]) {
        const featuredData = data.rows[0];
        featuredData.showtimes = normalizeShowtimes(featuredData.showtimes);
        res.send(JSON.stringify(featuredData));
        res.end();  
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
    
};


const getShowtimesOnDate = (req, res) => {
  const today = req.params.id
  const tomorrow = moment(req.params.id).add(1,'days').format('YYYY-MM-DD')
  const query = {
    text: `SELECT 
    venues.title AS venue,
    venues.short_title AS venueShortTitle,
    movies.title AS film,
    movies.director,
    movies.year,
    movies.runtime,
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
    showtimes.showtime >= $1 AND showtimes.showtime < $2 AND screenings.canceled = 0
    GROUP BY
    venues.title,
    movies.title,
    movies.director,
    movies.year,
    movies.runtime,
    venues.short_title,
    screenings.screening_url,
    screenings.format,
    screenings.screening_note;`,
    values: [today, tomorrow],
  }

  client.query(query)
    .then((data) => {
      if (data.rows) {
        const rows = data.rows;
        const showsByVenue = {};
        for (let i = 0; i < rows.length ; i += 1) {
          const venueTitle = rows[i].venue;
          if (!showsByVenue[venueTitle]) {
            showsByVenue[venueTitle] = {
              venue: venueTitle,
              shows: [],
            };
          }
          const showData = rows[i];
          showData.showtimes = normalizeShowtimes(rows[i].showtimes);
          showsByVenue[venueTitle].shows.push(rows[i]);
        }
        res.send(JSON.stringify(Object.values(showsByVenue)));
      }
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
      res.end()
    });
};

module.exports = {
  getShowtimesOnDate,
  getRecommendedOnDate,
};
