const express = require('express');
const path = require('path');
const app = express();
const db = require('../database/database.js');

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/recommended/:id', (req, res) => {
  const items = db.fetchRecommended(req.params.id);
  res.send(JSON.stringify(items));
  res.end();
});

app.get('/showtimes/:id', db.findShowtimesOnDate);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
