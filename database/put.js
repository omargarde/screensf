const screensf = require('./database.js');

const editSeries = (req, res, next) => {
  screensf.client
    .query(
      `UPDATE
      series
      SET title = $2, start_date = $3, end_date = $4, series_description = $5, series_url = $6
      WHERE
      id = $1;
      `,
      [
        req.body.series_id,
        req.body.title,
        req.body.start_date,
        req.body.end_date,
        req.body.series_description,
        req.body.series_url,
      ],
    )
    .then(() => {
      console.log('successful edit');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });
};

const editScreening = (req, res, next) => {
  screensf.client
    .query(
      `UPDATE
      screenings
      SET 
      movies_id = $2, venues_id = $3, alt_title = $4, screening_url = $5, 
      start_date = $6, end_date = $7, format = $8, screening_note = $9, canceled = $10
      WHERE
      id = $1;
      `,
      [
        req.body.screening_id,
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
    .then(() => {
      console.log('successful edit');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });
};

const editScreeningsSeries = (req, res, next) => {
  screensf.client
    .query(
      `UPDATE
      screenings_series
      SET 
      screenings_id = $1, series_id = $3
      WHERE
      screenings_id = $1 AND series_id = $2;
      `,
      [req.body.screenings_id, req.body.series_id, req.body.new_series],
    )
    .then(() => {
      console.log('successful edit');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });
};

const editShowtimes = (req, res, next) => {
  screensf.client
    .query(
      `UPDATE
      showtimes
      SET 
      showtime = $2, showtime_note = $3, canceled = $4, in_person = $5, hide = $6
      WHERE
      id = $1;
      `,
      [
        req.body.showtime_id,
        req.body.showtime,
        req.body.showtime_note,
        req.body.canceled,
        req.body.in_person,
        req.body.hide,
      ],
    )
    .then(() => {
      console.log('successful edit');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });
};

const editMovies = (req, res, next) => {
  screensf.client
    .query(
      `UPDATE
      movies
      SET 
      title = $2, director = $3, release_date = $4, runtime = $5, synopsis = $6
      WHERE
      id = $1;
      `,
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
      console.log('successful edit');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });
};

const editVenue = (req, res, next) => {
  screensf.client
    .query(
      `UPDATE
      venues
      SET 
      title = $2, short_title = $3, region = $4, venue_description = $5, address = $6, img = $7, venue_url = $8, venue_uri = $9 currently_open = $10
      WHERE
      id = $1;
      `,
      [
        req.body.id,
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
      console.log('successful edit');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });
};

const editFeatured = (req, res, next) => {
  screensf.client
    .query(
      `UPDATE 
      featured_films
      SET
      screenings_id = $2, ondate = $3, featured_image = $4, author = $5, article = $6
      WHERE
      id = $1;
      `,
      [
        req.body.id,
        req.body.screenings_id,
        req.body.ondate,
        req.body.featured_image,
        req.body.author,
        req.body.article,
      ],
    )
    .then(() => {
      console.log('successful featured film edit');
      res.end();
    })
    .catch((error) => {
      return next(error);
    });

  res.end();
};

module.exports = {
  editSeries,
  editScreening,
  editScreeningsSeries,
  editShowtimes,
  editMovies,
  editVenue,
  editFeatured,
};
