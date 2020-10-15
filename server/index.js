const express = require('express');
const path = require('path');

const app = express();
const get = require('../database/get');
const post = require('../database/post');
const put = require('../database/put');

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(express.json());

// Read

app.get('/recommended/:id', get.getRecommendedOnDate);

app.get('/showtimes/:id', get.getShowtimesOnDate);

app.get('/venues/', get.getVenues);

app.get('/series/', get.getSeries);

app.get('/movies/', get.getMovies);

app.get('/screenings/', get.getScreenings);

app.get('/showtime-hours/:id', get.getShowtimeHours);

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

app.put('/screenings-series/', put.editScreeningsSeries);

app.put('/showtimes/', put.editShowtimes);

app.put('/movies/', put.editMovies);

// Delete

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
