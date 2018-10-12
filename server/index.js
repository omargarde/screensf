const express = require('express');
const path = require('path');
const app = express();
const db = require('../database/database.js');

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/recommended/:id', function(req, res) {
  const items = db.fetchRecommended(req.params.id);
  res.send(JSON.stringify(items));
  res.end();
});

app.get('/showtimes/:id', function (req, res) {
  const items = db.fetchShowtimes(req.params.id);
  res.send(JSON.stringify(items));
  res.end();
});

app.listen(3000, console.log('app is running on 3000'));
