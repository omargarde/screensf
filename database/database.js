const { Client } = require('pg');
const moment = require('moment');
const read = require('./sql/read');

const client = new Client({
  host: `localhost`,
  user: process.env.USER,
  database: 'screensf',
  // host: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  // user: process.env.DB_USER,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASS,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const normalizeShowtimes = (showtimes, showtimesHide, date) => {
  const newTimes = [];
  if (showtimes === null) return newTimes;
  const times = showtimes.split(',');
  const today = new Date(`${date} 00:00:00-8:00`);
  const tomorrow = addDays(today, 1);
  for (let x = 0; x < times.length; x += 1) {
    const showtime = new Date(times[x]);
    if (showtime >= today && showtime < tomorrow && showtimesHide[x] === 0) {
      newTimes.push(moment(times[x], 'YYYY-MM-DD HH:mm:ss').format('h:mm A'));
    }
  }
  return newTimes;
};

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
  client
    .query(query)
    .then((data) => {
      if (data.rows[0]) {
        const featuredData = data.rows[0];
        featuredData.showtimes = normalizeShowtimes(
          featuredData.showtimes,
          featuredData.showtimes_hide,
          today,
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

const getShowtimesOnDate = (req, res) => {
  const today = req.params.id;
  const query = {
    text: read.showtimesOnDate,
    values: [today],
  };
  client
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
          showData.showtimes = normalizeShowtimes(
            rows[i].showtimes,
            rows[i].showtimes_hide,
            today,
          );
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
  client
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
  client
    .query(query)
    .then((data) => {
      res.send(JSON.stringify(data.rows));
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
  client,
};
