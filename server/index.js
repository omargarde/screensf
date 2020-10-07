const express = require('express');
const path = require('path');

const app = express();
const db = require('../database/database');
const post = require('../database/post');
const put = require('../database/put');

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(express.json());

// Read

app.get('/recommended/:id', db.getRecommendedOnDate);

app.get('/showtimes/:id', db.getShowtimesOnDate);

app.get('/venues/', db.getVenues);

app.get('/series/', db.getSeries);

// Create
app.post('/movies/', post.postMovie);

app.post('/series/', post.postSeries);

app.post('/venues/', post.postVenue);

app.post('/screenings/', post.postScreening);

app.post('/showtimes/', post.postShowtimes);

app.post('/screenings-series/', post.postScreeningsSeries);

app.post('/venues-series/', post.postVenuesSeries);

// Update
app.put('/series/', put.editSeries);

app.put('/screenings/', put.editScreening);

// Delete

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
