const fs = require('fs');
const csv = require('csv-parser');

const venues = [];

fs.createReadStream('../data/venues.csv')
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
    const importer = fs.createWriteStream('../sql/venues.sql', { flags: 'a' });
    venues.forEach((row) => importer.write(`${row}\n`));
    importer.end();
  });
