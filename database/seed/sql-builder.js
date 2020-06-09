const fs = require('fs');
const csv = require('csv-parser');
// const moment = require('moment');

const movies = [];
const venues = [];
const screenings = [];
const showtimes = [];
const series = [];

// movies
fs.createReadStream('movies.csv')
  .pipe(csv())
  .on('data', (data) => {
    movies.push(
      'INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES',
    );
    movies.push(
      `    (${data.id}, $$${data.title}$$, $$${data.director}$$, ${data.year}, ${data.runtime}, $$${data.synopsis}$$);`,
    );
  })
  .on('end', () => {
    const importer = fs.createWriteStream('./importer.sql', { flags: 'a' });
    movies.forEach((row) => importer.write(`${row}\n`));
    importer.end();
  });
// venues

fs.createReadStream('venues.csv')
  .pipe(csv())
  .on('data', (data) => {
    venues.push(
      'INSERT INTO venues (id, title, short_title, city, venue_description, address, currently_open) VALUES',
    );
    venues.push(
      `    (${data.id}, $$${data.title}$$, $$${data.short_title}$$, $$${data.city}$$, $$${data.venue_description}$$, $$${data.address}$$, ${data.currently_open});`,
    );
  })
  .on('end', () => {
    const importer = fs.createWriteStream('./importer.sql', { flags: 'a' });
    venues.forEach((row) => importer.write(`${row}\n`));
    importer.end();
  });

// screenings

fs.createReadStream('screenings.csv')
  .pipe(csv())
  .on('data', (data) => {
    screenings.push(
      'INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note, canceled) VALUES',
    );
    screenings.push(
      `    (${data.id}, ${data.movies_id}, ${data.venues_id}, $$${data.screening_url}$$, $$${data.start_date}$$, $$${data.end_date}$$, $$${data.format}$$, $$${data.screening_note}$$, ${data.canceled});`,
    );

    // need to associate with series
    series.push(
      'INSERT INTO screenings_series (screenings_id, series_id) VALUES',
    );
    series.push(`    (${data.screen_val}, ${data.series_id});`);

    // needs to create showtime for every day from start date to end date
    // let showdate = moment(data.start_date);
    // const enddate = moment(data.end_date);

    // while (showdate.isSameOrBefore(enddate)) {
    //   // need to convert showdate .format('YYYY-MM-DD')
    //   if (data.showtime1) {
    //     showtimes.push(
    //       'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note, canceled) VALUES',
    //     );
    //     showtimes.push(
    //       `    (DEFAULT, ${data.screen_val}, $$${showdate} ${data.showtime1}:00-8:00$$, $$${data.showtime_note1}$$, 0);`,
    //     );
    //   }
    //   if (data.showtime2) {
    //     showtimes.push(
    //       'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES',
    //     );
    //     showtimes.push(
    //       `    (DEFAULT, ${data.screen_val}, $$${showdate} ${data.showtime2}:00-8:00$$, $$${data.showtime_note2}$$, 0);`,
    //     );
    //   }
    //   if (data.showtime3) {
    //     showtimes.push(
    //       'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES',
    //     );
    //     showtimes.push(
    //       `    (DEFAULT, ${data.screen_val}, $$${showdate} ${data.showtime3}:00-8:00$$, $$${data.showtime_note3}$$, 0);`,
    //     );
    //   }
    //   if (data.showtime4) {
    //     showtimes.push(
    //       'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES');
    //     showtimes.push(
    //       `    (DEFAULT, ${data.screen_val}, $$${showdate} ${data.showtime4}:00-8:00$$, $$${data.showtime_note4}$$, 0);`,
    //     );
    //   }
    //   if (data.showtime5) {
    //     showtimes.push(
    //       'INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES',
    //     );
    //     showtimes.push(
    //       `    (DEFAULT, ${data.screen_val}, $$${showdate} ${data.showtime5}:00-8:00$$, $$${data.showtime_note5}$$, 0);`,
    //     );
    //   }
    //   showdate = moment(showdate).add(1, 'days');
    // }
  })
  .on('end', () => {
    const importer = fs.createWriteStream('./importer.sql', { flags: 'a' });
    screenings.forEach((row) => importer.write(`${row}\n`));
    showtimes.forEach((row) => importer.write(`${row}\n`));
    series.forEach((row) => importer.write(`${row}\n`));
    importer.end();
  });

// recommended

fs.createReadStream('recommended.csv')
  .pipe(csv())
  .on('data', (data) => {
    const article = data.article.slice(1, -1);
    venues.push(
      'INSERT INTO featured_films (id, screenings_id, ondate, featured_image, author, article) VALUES',
    );
    venues.push(
      `    (${data.id}, ${data.screenings_id}, $$${data.ondate}$$, $$${data.featured_image}$$, $$${data.author}$$, $$${article}$$);`,
    );
  })
  .on('end', () => {
    const importer = fs.createWriteStream('./importer.sql', { flags: 'a' });
    venues.forEach((row) => importer.write(`${row}\n`));
    importer.end();
  });
