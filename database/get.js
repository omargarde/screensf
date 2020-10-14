const screensf = require('./database.js');
const read = require('./sql/read');

const getYear = (releaseDate) => {
  if (releaseDate === null) return '';
  return releaseDate.getFullYear();
};

const getRecommendedOnDate = (req, res) => {
  const today = req.params.id;
  const query = {
    text: read.recommendedOnDate,
    values: [today],
  };
  screensf.client
    .query(query)
    .then((data) => {
      if (data.rows[0]) {
        const featuredData = data.rows[0];
        res.send(JSON.stringify(featuredData));
        res.end();
      }
      res.end();
    })
    .catch((error) => {
      res.end(error);
    });
};

const getShowtimesOnDate = (req, res) => {
  const today = req.params.id;
  const query = {
    text: read.showtimesOnDate,
    values: [today],
  };
  screensf.client
    .query(query)
    .then((data) => {
      if (data.rows) {
        const { rows } = data;
        const showsByVenue = {};
        for (let i = 0; i < rows.length; i += 1) {
          const venueTitle = rows[i].venue;
          const venueAddress = rows[i].venue_address.split(',');
          const shortAddress = `${venueAddress[0]}, ${venueAddress[1]}`;

          if (!showsByVenue[venueTitle]) {
            showsByVenue[venueTitle] = {
              venue: venueTitle,
              address: shortAddress,
              shows: [],
            };
          }
          const showData = rows[i];
          showData.year = getYear(showData.release_date);
          showsByVenue[venueTitle].shows.push(showData);
        }

        const showsFinal = {};
        Object.keys(showsByVenue).forEach((item) => {
          showsFinal[item] = showsByVenue[item];
        });
        const showsStr = JSON.stringify(Object.values(showsFinal));
        res.send(showsStr);
      }
      res.end();
    })
    .catch((error) => {
      console.log('error', error);
      res.end(error);
    });
};

const getVenues = (req, res) => {
  const query = {
    text: read.getVenues,
  };
  screensf.client
    .query(query)
    .then((data) => {
      res.send(JSON.stringify(data.rows));
      res.end();
    })
    .catch((error) => {
      res.end(error);
    });
};

const getSeries = (req, res) => {
  const query = {
    text: read.getSeries,
  };
  screensf.client
    .query(query)
    .then((data) => {
      res.send(JSON.stringify(data.rows));
      res.end();
    })
    .catch((error) => {
      res.end(error);
    });
};

const getMovies = (req, res) => {
  const query = {
    text: read.getMovies,
  };
  screensf.client
    .query(query)
    .then((data) => {
      res.send(JSON.stringify(data.rows));
      res.end();
    })
    .catch((error) => {
      res.end(error);
    });
};

const getScreenings = (req, res) => {
  const query = {
    text: read.getScreenings,
  };
  screensf.client
    .query(query)
    .then((data) => {
      res.send(JSON.stringify(data.rows));
      res.end();
    })
    .catch((error) => {
      res.end(error);
    });
};

const getShowtimeHours = (req, res) => {
  const showId = req.params.id;
  const query = {
    text: read.getShowtimeHours,
    values: [showId],
  };
  screensf.client
    .query(query)
    .then((data) => {
      const rows = JSON.stringify(data.rows);
      res.send(rows);
      res.end();
    })
    .catch((error) => {
      res.end(error);
    });
};

module.exports = {
  getShowtimesOnDate,
  getRecommendedOnDate,
  getVenues,
  getSeries,
  getMovies,
  getScreenings,
  getShowtimeHours,
};
