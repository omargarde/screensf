const express = require('express');
const path = require('path');
const app = express();
const db = require('../database/database.js');
const moment = require('moment');

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/recommended/:id', (req, res) => {
  const items = db.fetchRecommended(req.params.id);
  res.send(JSON.stringify(items));
  res.end();
});

app.get('/showtimes/:id', (req, res) => {
  const items = db.fetchShowtimes(req.params.id);
  db.findShowtimesOnDate(moment(req.params.id, 'MMDDYYYY').format('YYYY-MM-DD'));
  res.send(JSON.stringify(items));
  res.end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
