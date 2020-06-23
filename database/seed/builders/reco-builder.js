const fs = require('fs');
const csv = require('csv-parser');

const venues = [];

fs.createReadStream('../data/recommended.csv')
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
    const importer = fs.createWriteStream('../sql/recommended.sql', {
      flags: 'a',
    });
    venues.forEach((row) => importer.write(`${row}\n`));
    importer.end();
  });
