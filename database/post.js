const screensf = require('./database.js');

const postMovie = (req, res) => {
  screensf.client
    .query(
      `INSERT INTO 
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
      },
    )
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
  screensf.client
    .query(
      `INSERT INTO 
      series 
      (id, title) 
      VALUES 
      (DEFAULT, $/title/);`,
      {
        title: req.body.title,
      },
    )
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
  screensf.client
    .query(
      `INSERT INTO 
      venues 
      (id, title, short_title, city) 
      VALUES 
      (DEFAULT, $/title/, $/short_title/, $/city/);`,
      {
        title: req.body.title,
        short_title: req.body.short_title,
        city: req.body.city,
      },
    )
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
  screensf.client
    .query(
      `INSERT INTO 
      screenings 
      (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) 
      VALUES 
      (DEFAULT, $1, $2, $3, $4, $4, $5, $6);`,
      [
        req.body.movies_id,
        req.body.venues_id,
        req.body.screening_url,
        req.body.start_date,
        req.body.end_date,
        req.body.format,
        req.body.screening_note,
      ],
    )
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
  screensf.client
    .query(
      `INSERT INTO 
      showtimes 
      (id, screenings_id, showtime, showtime_note, canceled, hide)
      VALUES 
      (DEFAULT, $1, $2, $3, $4, $5);`,
      [
        req.body.screenings_id,
        req.body.showtime,
        req.body.showtime_note,
        req.body.canceled,
        req.body.hide,
      ],
    )
    .then(() => {
      console.log('successful showtime post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postScreeningsSeries = (req, res) => {
  screensf.client
    .query(
      `INSERT INTO 
      screenings_series
      (id, screenings_id, series_id)
      VALUES 
      (DEFAULT, $/screenings_id/, $/series_id/);`,
      {
        screenings_id: req.body.screenings_id,
        series_id: req.body.series_id,
      },
    )
    .then(() => {
      console.log('successful screening post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postVenuesSeries = (req, res) => {
  screensf.client
    .query(
      `INSERT INTO 
      venues_series 
      (id, venues_id, series_id)
      VALUES 
      (DEFAULT, $/venues_id/, $/series_id/);`,
      {
        venues_id: req.body.venues_id,
        series_id: req.body.series_id,
      },
    )
    .then(() => {
      console.log('successful venue post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
    });

  res.end();
};

const postFeaturedScreening = (req, res) => {
  screensf.client
    .query(
      `INSERT INTO 
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
      },
    )
    .then(() => {
      console.log('successful featured screening post');
      res.end();
    })
    .catch((error) => {
      throw new Error(error);
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
  postFeaturedScreening,
};
