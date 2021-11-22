const screensf = require('./database.js');
const read = require('../sql/read');

const fixShowtimes = (showtimes, today, tomorrow) => {
  const result = [];
  showtimes.forEach((show) => {
    if (show.id && show.hide === 0) {
      const date = show.showtime.slice(0, 10);
      const hour = Number(show.showtime.slice(11, 13));
      if (date === today && hour > 3) {
        result.push(show);
      } else if (hour < 3 && date === tomorrow) {
        result.push(show);
      }
    }
  });
  return result;
};

const getRecommendedOnDate = (req, res) => {
  const text = req.params.id;
  const today = text.slice(0, 10);
  const tomorrow = text.slice(11, 21);
  const query = {
    text: read.recommendedOnDate,
    values: [today],
  };
  screensf.client
    .query(query)
    .then((data) => {
      if (data.rows[0]) {
        const featuredData = data.rows[0];
        featuredData.showtimes = fixShowtimes(
          featuredData.showtimes,
          today,
          tomorrow,
        );
        res.send(JSON.stringify(featuredData));
        res.end();
      }
      res.end();
    })
    .catch((error) => {
      res.end(error);
    });
};

const getShowtimesSubmit = (req, res) => {
  const text = req.params.id;
  const today = text.slice(0, 10);
  const tomorrow = text.slice(11, 21);
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
              id: rows[i].venue_id,
              shows: [],
              virtualScreenings: [],
              venue_uri: rows[i].venue_uri,
            };
          }
          const showData = rows[i];
          showData.showtimes = fixShowtimes(
            showData.showtimes,
            today,
            tomorrow,
          );

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

const getShowtimesOnDate = (req, res) => {
  const text = req.params.id;
  const today = text.slice(0, 10);
  const tomorrow = text.slice(11, 21);
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

          if (!showsByVenue[venueTitle]) {
            const venueAddress = rows[i].venue_address.split(',');
            const shortAddress = `${venueAddress[0]}, ${venueAddress[1]}`;
            showsByVenue[venueTitle] = {
              venue: venueTitle,
              address: shortAddress,
              id: rows[i].venue_id,
              shows: [],
              virtualScreenings: [],
              venue_uri: rows[i].venue_uri,
            };
          }
          const showData = rows[i];
          showData.showtimes = fixShowtimes(
            showData.showtimes,
            today,
            tomorrow,
          );
          if (showData.showtimes.length > 0) {
            showsByVenue[venueTitle].shows.push(showData);
          } else if (showData.format === 'Virtual Screening') {
            showsByVenue[venueTitle].virtualScreenings.push(showData);
          }
        }
        const showsFinal = {};
        Object.keys(showsByVenue).forEach((item) => {
          if (
            showsByVenue[item].shows.length > 0 ||
            showsByVenue[item].virtualScreenings.length > 0
          ) {
            showsFinal[item] = showsByVenue[item];
          }
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

const getShowtimesByVenue = (req, res) => {
  const { venId, today } = req.params;
  const query = {
    text: read.getShowtimesByVenue,
    values: [today, venId],
  };
  screensf.client
    .query(query)
    .then((data) => {
      const { rows } = data;
      const showByDate = {};
      rows.forEach((showtime) => {
        if (!showByDate[showtime.date]) {
          showByDate[showtime.date] = {};
          showByDate[showtime.date].date = showtime.date.toJSON().slice(0, 10);
        }
        if (!showByDate[showtime.date][showtime.screening_id]) {
          showByDate[showtime.date][showtime.screening_id] = showtime;
        } else {
          // TO DO: Clean this up so that showtimes are arranged correctly
          // first movie should be listed first, everything else follows
          showByDate[showtime.date][showtime.screening_id].showtimes.push(
            showtime.showtimes[0],
          );
        }
      });
      res.send(JSON.stringify(Object.values(showByDate)));
      res.end();
    })
    .catch((error) => {
      console.log(error, 'There was an error');
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

const getVenue = (req, res) => {
  const venUri = req.params.id;
  const query = {
    text: read.getVenue,
    values: [venUri],
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
    values: [req.params.id],
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

const getFeatured = (req, res) => {
  const query = {
    text: read.getFeatured,
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
  getShowtimesSubmit,
  getRecommendedOnDate,
  getVenues,
  getVenue,
  getSeries,
  getMovies,
  getScreenings,
  getShowtimeHours,
  getFeatured,
  getShowtimesByVenue,
};
