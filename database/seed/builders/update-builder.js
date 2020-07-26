const fs = require('fs');
const csv = require('csv-parser');

const updates = [];

fs.createReadStream('../data/updates.csv')
  .pipe(csv())
  .on('data', (data) => {
    updates.push(
      `UPDATE screenings SET end_date = $$${data.end_date}$$ WHERE id = ${data.screen_val};`,
    );
  })
  .on('end', () => {
    const importer = fs.createWriteStream('../sql/updates.sql', {
      flags: 'a',
    });
    updates.forEach((row) => importer.write(`${row}\n`));
    importer.end();
  });
