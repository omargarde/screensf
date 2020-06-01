const fs = require('fs');
const csv = require('csv-parser');





const movies = [];
const venues = [];
const screenings = [];
const showtimes = [];

// movies
fs.createReadStream('movies.csv')
  .pipe(csv())
  .on('data', (data) => {
    movies.push('INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES')
    movies.push(
        '    (' + data.id + ', $$' + data.title + '$$, $$' + data.director + '$$, ' + data.year + ', ' + data.runtime + ', $$' + data.synopsis + '$$);'
    )
  })
  .on('end', () => {
    const importer = fs.createWriteStream('./importer.sql', { flags: 'a' });
    movies.forEach(row => importer.write(row + '\n'))
    importer.end();

    console.log('Movies successfully processed');
  });

//venues

fs.createReadStream('venues.csv')
  .pipe(csv())
  .on('data', (data) => {
    venues.push('INSERT INTO venues (id, title, short_title, city, venue_description, address, currently_open) VALUES')
    venues.push(
        '    (' + data.id + ', $$' + data.title + '$$, $$' + data.short_title + '$$, $$' + data.city + '$$, $$' + data.venue_description + '$$, ' + ' $$' + data.address + '$$, ' + data.currently_open + ');'
    )
  })
  .on('end', () => {
    const importer = fs.createWriteStream('./importer.sql', { flags: 'a' });
    venues.forEach(row => importer.write(row + '\n'))
    importer.end();

    console.log('Venues successfully processed');
  });



//screenings

fs.createReadStream('screenings.csv')
  .pipe(csv())
  .on('data', (data) => {
    screenings.push('INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES')
    screenings.push(
        '    (' + data.id + ', ' + data.movies_id + ', ' + data.venues_id + ', $$' + data.screening_url + '$$, $$' + data.start_date + '$$, $$' + data.end_date + '$$, $$' + data.format + '$$, $$' + data.screening_note + '$$ );'
    )
    showtimes.push('INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES')
    showtimes.push(
        '    (DEFAULT, ' + data.screen_val + ', $$' + data.start_date + ' ' + data.showtime1 + ':00-8:00$$, $$' + data.showtime_note1 + '$$);'
    )
  })
  .on('end', () => {
    const importer = fs.createWriteStream('./importer.sql', { flags: 'a' });
    screenings.forEach(row => importer.write(row + '\n'))
    showtimes.forEach(row => importer.write(row + '\n'))
    importer.end();

    console.log('Screenings and showtimes successfully processed');
  });


// importer.write
