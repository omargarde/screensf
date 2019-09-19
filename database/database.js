const pgp = require('pg-promise')();
const moment = require('moment');

const db = pgp('postgres://localhost:5432/screensf');

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

const postMovie = (req, res) => {
  db.query(`
    INSERT INTO 
    movies 
    (id, title, director, year, duration) 
    VALUES 
    ($/id/, $/title/, $/director/, $/year/, $/duration/);`,
  {
    id: req.body.id,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    duration: req.body.duration,
  })
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postSeries = (req, res) => {
  db.query(`
    INSERT INTO 
    series 
    (id, title) 
    VALUES 
    (DEFAULT, $/title/);`,
  {
    title: req.body.title,
  })
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postVenue = (req, res) => {
  db.query(`
    INSERT INTO 
    venues 
    (id, title, short_title, city) 
    VALUES 
    (DEFAULT, $/title/, $/short_title/, $/city/);`,
  {
    title: req.body.title,
    short_title: req.body.short_title,
    city: req.body.city,
  })
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postScreening = (req, res) => {
  db.query(`
    INSERT INTO 
    screenings 
    (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) 
    VALUES 
    (DEFAULT, $/movies_id/, $/venues_id/, $/screening_url/, $/start_date/, $/end_date/, $/format/, $/screening_note/);`,
  {
    movies_id: req.body.movies_id,
    venues_id: req.body.venues_id,
    screening_url: req.body.screening_url,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    format: req.body.format,
    screening_note: req.body.screening_note,
  })
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postShowtimes = (req, res) => {
  db.query(`
    INSERT INTO 
    showtimes 
    (id, screenings_id, showtime, showtime_note)
    VALUES 
    (DEFAULT, $/screenings_id/, $/showtime/, $/showtime_note/);`,
  {
    screenings_id: req.body.screenings_id,
    showtime: req.body.showtime,
    showtime_note: req.body.showtime_note,
  })
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postScreeningsSeries = (req, res) => {
  db.query(`
    INSERT INTO 
    screenings_series
    (id, screenings_id, series_id)
    VALUES 
    (DEFAULT, $/screenings_id/, $/series_id/);`,
  {
    screenings_id: req.body.screenings_id,
    series_id: req.body.series_id,
  })
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postVenuesSeries = (req, res) => {
  db.query(`
    INSERT INTO 
    venues_series 
    (id, venues_id, series_id)
    VALUES 
    (DEFAULT, $/venues_id/, $/series_id/);`,
  {
    venues_id: req.body.venues_id,
    series_id: req.body.series_id,
  })
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};


const postFeaturedScreening = (req, res) => {
  db.query(`
    INSERT INTO 
    featured_films
    (id, screenings_id, ondate, featured_image, author, article)
    VALUES 
    (DEFAULT, $/screenings_id/, $/ondate/, $/featured_image/, $/author/, $/article/);`,
  {
    screenings_id: req.body.screenings_id,
    ondate: req.body.ondate,
    featured_image: req.body.featured_image,
    author: req.body.author,
    article: req.body.article,
  })
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

module.exports = {
  getShowtimesOnDate,
  getRecommendedOnDate,
  postMovie,
  postSeries,
  postVenue,
  postScreening,
  postShowtimes,
  postScreeningsSeries,
  postVenuesSeries,
  postFeaturedScreening,
};
