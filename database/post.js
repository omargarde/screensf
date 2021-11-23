const screensf = require('./database.js');

const postMovie = (req, res, next) => {
  screensf.client
    .query(
      `INSERT INTO 
      movies 
      (id, title, director, release_date, runtime, synopsis) 
      VALUES 
      ($1, $2, $3, $4, $5, $6);`,
      [
        req.body.id,
        req.body.title,
        req.body.director,
        req.body.release_date,
        req.body.runtime,
        req.body.synopsis,
      ],
    )
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });

  res.end();
};

const postSeries = (req, res, next) => {
  screensf.client
    .query(
      `INSERT INTO 
      series 
      (id, title, start_date, end_date, series_description, series_url) 
      VALUES 
      (DEFAULT, $1, $2, $3, $4, $5 );`,
      [
        req.body.title,
        req.body.start_date,
        req.body.end_date,
        req.body.series_description,
        req.body.series_url,
      ],
    )
    .then(() => {
      console.log('successful series post');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });

  res.end();
};

const postVenue = (req, res, next) => {
  screensf.client
    .query(
      `INSERT INTO 
      venues 
      (id, title, short_title, region, venue_description, address, img, venue_url, venue_uri, currently_open) 
      VALUES 
      (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [
        req.body.title,
        req.body.short_title,
        req.body.region,
        req.body.venue_description,
        req.body.address,
        req.body.img,
        req.body.venue_url,
        req.body.venue_uri,
        req.body.currently_open,
      ],
    )
    .then(() => {
      console.log('successful post');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });

  res.end();
};

const postScreening = (req, res, next) => {
  screensf.client
    .query(
      `INSERT INTO 
      screenings 
      (id, movies_id, venues_id, alt_title, screening_url, start_date, end_date, format, screening_note, canceled)
      VALUES 
      (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING
      id; 
      `,
      [
        req.body.movies_id,
        req.body.venues_id,
        req.body.alt_title,
        req.body.screening_url,
        req.body.start_date,
        req.body.end_date,
        req.body.format,
        req.body.screening_note,
        req.body.canceled,
      ],
    )
    .then((response) => {
      console.log('successful post');
      res.send(JSON.stringify(response.rows[0]));
    })
    .catch((error) => {
      return next(error);
    });
};

const postShowtimes = (req, res, next) => {
  screensf.client
    .query(
      `INSERT INTO 
      showtimes 
      (id, screenings_id, showtime, showtime_note, canceled, in_person, hide)
      VALUES 
      (DEFAULT, $1, $2, $3, $4, $5, $6);`,
      [
        req.body.screenings_id,
        req.body.showtime,
        req.body.showtime_note,
        req.body.canceled,
        req.body.in_person,
        req.body.hide,
      ],
    )
    .then(() => {
      console.log('successful showtime post');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });

  res.end();
};

const postScreeningsSeries = (req, res, next) => {
  screensf.client
    .query(
      `INSERT INTO 
      screenings_series
      (id, screenings_id, series_id)
      VALUES 
      (DEFAULT, $1, $2);`,
      [req.body.screenings_id, req.body.series_id],
    )
    .then(() => {
      console.log('successful screening series post');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });

  res.end();
};

const postVenuesSeries = (req, res, next) => {
  screensf.client
    .query(
      `INSERT INTO 
      venues_series 
      (id, venues_id, series_id)
      VALUES 
      (DEFAULT, $/venues_id/, $/series_id/);`,
      [req.body.venues_id, req.body.series_id],
    )
    .then(() => {
      console.log('successful venue post');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });

  res.end();
};

const postFeatured = (req, res, next) => {
  screensf.client
    .query(
      `INSERT INTO 
        featured_films
        (id, screenings_id, ondate, featured_image, author, article)
        VALUES 
        (DEFAULT, $1, $2, $3, $4, $5);`,
      [
        req.body.screenings_id,
        req.body.ondate,
        req.body.featured_image,
        req.body.author,
        req.body.article,
      ],
    )
    .then(() => {
      console.log('successful featured film post');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });

  res.end();
};

module.exports = {
  postMovie,
  postSeries,
  postVenue,
  postScreening,
  postShowtimes,
  postScreeningsSeries,
  postVenuesSeries,
  postFeatured,
};
