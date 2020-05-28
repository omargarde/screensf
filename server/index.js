const express = require('express');
const path = require('path');
const app = express();
const db = require('../database/database.js');
const post = require('../database/post.js');

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Read

app.get('/recommended/:id', db.getRecommendedOnDate);

app.get('/showtimes/:id', db.getShowtimesOnDate);

// Create
app.post('/movies/', post.postMovie);

app.post('/series/', post.postSeries);

app.post('/venues/', post.postVenue);

app.post('/screenings/', post.postScreening);

app.post('/showtimes/', post.postShowtimes);

app.post('/screenings-series/', post.postScreeningsSeries);

app.post('/venues-series/', post.postVenuesSeries);

// Update

// Delete

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
