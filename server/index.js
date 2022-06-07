const express = require('express');
const path = require('path');

const app = express();
const get = require('../database/get');
const post = require('../database/post');
const put = require('../database/put');

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use(express.json());

const sendApp = (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../dist/'),
  });
};

// Read

app.get('/api/recommended/:id', get.getRecommendedOnDate);

app.get('/api/showtimes/:id', get.getShowtimesOnDate);

app.get(
  '/api/showtimes-venue/venUri/:venUri/today/:today',
  get.getShowtimesByVenue,
);

app.get(
  '/api/showtimes-series/serUri/:serUri/today/:today/prev/:prev',
  get.getShowtimesBySeries,
);

app.get('/api/showtimes-onfilm/today/:today/', get.getShowtimesOnFilm);


app.get('/api/showtimes-submit/:id', get.getShowtimesSubmit);

app.get('/api/venues/', get.getVenues);

app.get('/api/venue/:id', get.getVenue);

app.get('/api/series/', get.getSeries);

app.get('/api/series/:id', get.getSeriesByUri);

app.get('/api/movies/', get.getMovies);

app.get('/api/screenings/:id', get.getScreenings);

app.get('/api/showtime-hours/:id', get.getShowtimeHours);

app.get('/api/featured/', get.getFeatured);

// Create

app.post('/api/movies/', post.postMovie);

app.post('/api/series/', post.postSeries);

app.post('/api/venues/', post.postVenue);

app.post('/api/screenings/', post.postScreening);

app.post('/api/showtimes/', post.postShowtimes);

app.post('/api/screenings-series/', post.postScreeningsSeries);

app.post('/api/venues-series/', post.postVenuesSeries);

app.post('/api/featured/', post.postFeatured);

// Update

app.put('/api/series/', put.editSeries);

app.put('/api/screenings/', put.editScreening);

app.put('/api/screenings-series/', put.editScreeningsSeries);

app.put('/api/showtimes/', put.editShowtimes);

app.put('/api/movies/', put.editMovies);

app.put('/api/venues/', put.editVenue);

app.put('/api/featured/', put.editFeatured);

// Delete

// Routes

app.get('/venues/*', sendApp);

app.get('/*', sendApp);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
