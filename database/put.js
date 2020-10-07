const screensf = require('./database.js');

const editSeries = (req, res) => {
  screensf.client
    .query(
      `UPDATE
      series
      SET title = $2, start_date = $3, end_date = $4, series_description = $5, series_url = $6
      WHERE
      id = $1
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
      console.error(error);
    });
};

const editScreening = (req, res) => {
  screensf.client
    .query(
      `UPDATE
      screenings
      SET 
      movies_id = $2, venues_id = $3, alt_title = $4, screening_url = $5, 
      start_date = $6, end_date = $7, format = $8, screening_note = $9, canceled = $10
      WHERE
      id = $1
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
    .then((r) => {
      console.log('successful edit', r);
      console.log(
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
      );
      res.end();
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  editSeries,
  editScreening,
};
