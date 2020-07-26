const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');

const screenings = [];
const showtimes = [];
const series = [];

fs.createReadStream('../data/screenings.csv')
  .pipe(csv())
  .on('data', (data) => {
    screenings.push(
      'INSERT INTO screenings (id, movies_id, venues_id, alt_title, screening_url, start_date, end_date, format, screening_note, canceled) VALUES',
    );
    screenings.push(
      `    (${data.id}, ${data.movies_id}, ${data.venues_id}, $$${data.movie_title}$$, $$${data.screening_url}$$, $$${data.start_date}$$, $$${data.end_date}$$, $$${data.format}$$, $$${data.screening_note}$$, ${data.canceled});`,
    );

    // need to associate with series
    series.push(
      'INSERT INTO screenings_series (screenings_id, series_id) VALUES',
    );
    series.push(`    (${data.screen_val}, ${data.series_id});`);

    // needs to create showtime for every day from start date to end date
    let showdate = moment(data.start_date);
    const enddate = moment(data.end_date);

    while (showdate.isSameOrBefore(enddate)) {
      // need to convert showdate .format('YYYY-MM-DD')
      const showdateFormat = moment(showdate).format('YYYY-MM-DD');

      if (data.showtime1) {
        showtimes.push(
          'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note, canceled, hide) VALUES',
        );
        showtimes.push(
          `    (DEFAULT, ${data.screen_val}, $$${showdateFormat} ${data.showtime1}:00-8:00$$, $$${data.showtime_note1}$$, 0, 0);`,
        );
      }
      if (data.showtime2) {
        showtimes.push(
          'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES',
        );
        showtimes.push(
          `    (DEFAULT, ${data.screen_val}, $$${showdateFormat} ${data.showtime2}:00-8:00$$, $$${data.showtime_note2}$$, 0);`,
        );
      }
      if (data.showtime3) {
        showtimes.push(
          'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES',
        );
        showtimes.push(
          `    (DEFAULT, ${data.screen_val}, $$${showdateFormat} ${data.showtime3}:00-8:00$$, $$${data.showtime_note3}$$, 0);`,
        );
      }
      if (data.showtime4) {
        showtimes.push(
          'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES',
        );
        showtimes.push(
          `    (DEFAULT, ${data.screen_val}, $$${showdateFormat} ${data.showtime4}:00-8:00$$, $$${data.showtime_note4}$$, 0);`,
        );
      }
      if (data.showtime5) {
        showtimes.push(
          'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES',
        );
        showtimes.push(
          `    (DEFAULT, ${data.screen_val}, $$${showdateFormat} ${data.showtime5}:00-8:00$$, $$${data.showtime_note5}$$, 0);`,
        );
      }
      showdate = moment(showdate).add(1, 'days');
    }
  })
  .on('end', () => {
    const importer = fs.createWriteStream('../sql/screenings.sql', {
      flags: 'a',
    });
    screenings.forEach((row) => importer.write(`${row}\n`));
    showtimes.forEach((row) => importer.write(`${row}\n`));
    series.forEach((row) => importer.write(`${row}\n`));
    importer.end();
  });
