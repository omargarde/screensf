const express = require('express');
const path = require('path');

const app = express();
const db = require('../database/database.js');

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/recommended/:id', db.getRecommendedOnDate);

app.get('/showtimes/:id', db.getShowtimesOnDate);

app.post('/movies/', db.postMovie);

app.post('/series/', db.postSeries);

app.post('/venues/', db.postVenue);

app.post('/screenings/', db.postScreening);

app.post('/showtimes/', db.postShowtimes);

app.post('/screenings-series/', db.postScreeningsSeries);

app.post('/venues-series/', db.postVenuesSeries);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
