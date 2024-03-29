const screensf = require('./database.js');
const read = require('../sql/get');

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
    text: read.submitShowtimesOnDate,
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

const getShowtimesByVenue = (req, res) => {
  const { venUri, today } = req.params;
  let dateTime = `${today} 03:00:00-8:00`;
  const query = {
    text: read.getShowtimesByVenue,
    values: [dateTime, venUri],
  };
  screensf.client
    .query(query)
    .then((data) => {
      const { rows } = data;
      let showByDate = {};
      rows.forEach((showtime) => {
        let showtimeDate = showtime.date.slice(0, 10);
        let hour = showtime.date.slice(11,13);
        if (parseInt(hour) < 4) {
          let today = new Date(showtimeDate)
          today.setDate(today.getDate() - 1);
          showtimeDate = today.toISOString().split('T')[0];
        }
        if (!showByDate[showtimeDate]) {
          showByDate[showtimeDate] = {};
          showByDate[showtimeDate].date = showtimeDate;
          showByDate[showtimeDate].shows = [];
          showByDate[showtimeDate].shows.push(showtime)
        } else {
          let none = 0
          showByDate[showtimeDate].shows.forEach((show) => {
            if (show.screening_id === showtime.screening_id) {
              show.showtimes.push(showtime.showtimes[0]);
              none = 1;
            }
          })
          if (none === 0) showByDate[showtimeDate].shows.push(showtime);
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



const getUpcoming = (rows) => {
  let showByDate = {};
  rows.forEach((showtime) => {
    let showtimeDate = showtime.date.slice(0, 10);

    let hour = showtime.date.slice(11,13);
    if (parseInt(hour) < 4) {
      let today = new Date(showtimeDate)
      today.setDate(today.getDate() - 1);
      showtimeDate = today.toISOString().split('T')[0];
    }

    //create date
    if (!showByDate[showtimeDate]) {
      showByDate[showtimeDate] = {};
      showByDate[showtimeDate].date = showtimeDate;
      showByDate[showtimeDate]['venues'] = {};
    }
    // create venue
    if (!showByDate[showtimeDate]['venues'][showtime.venue]) {
      showByDate[showtimeDate]['venues'][showtime.venue] = {};
      showByDate[showtimeDate]['venues'][showtime.venue].venue = showtime.venue;
      showByDate[showtimeDate]['venues'][showtime.venue].address = showtime.venue_address;
      showByDate[showtimeDate]['venues'][showtime.venue].id = showtime.venue_id;
      showByDate[showtimeDate]['venues'][showtime.venue].venue_uri = showtime.venue_uri;
      showByDate[showtimeDate]['venues'][showtime.venue].shows = [];
      showByDate[showtimeDate]['venues'][showtime.venue].shows.push(showtime)
    } else {
      // look for screening_id at the current venue on the current date
      let none = 0;
      showByDate[showtimeDate]['venues'][showtime.venue].shows.forEach((show) => {
        if (show.screening_id === showtime.screening_id) {
          show.showtimes.push(showtime.showtimes[0]);
          none = 1;
        }
      })
      if (none === 0) showByDate[showtimeDate]['venues'][showtime.venue].shows.push(showtime);
    }
  });
  
  // present venue in array for Screenings component
  for (date in showByDate) {
    const ordered = Object.keys(showByDate[date].venues).sort().reduce((obj, key) => { 
        obj[key] = showByDate[date].venues[key]; 
        return obj;
      },{});
     showByDate[date].venues = Object.values(ordered);
  }
  return showByDate;
};


const getShowtimesOnDate = (req, res) => {
  const text = req.params.id;
  const today = `${text.slice(0, 10)} 03:00:00-8:00`;
  const tomorrow = `${text.slice(11, 21)} 03:00:00-8:00`;
  const query = {
    text: read.showtimesOnDate,
    values: [today, tomorrow],
  };
  screensf.client
    .query(query)
    .then((data) => {
      const { rows } = data;
      const upcoming = getUpcoming(rows);
      const stringified = JSON.stringify(Object.values(upcoming))
      res.send(stringified);
      res.end();
    })
    .catch((error) => {
      console.log('error', error);
      res.end(error);
    });
};

const getShowtimesBySeries = (req, res) => {
  const { serUri, today, prev } = req.params;
  let dateTime = `${today} 03:00:00-8:00`;
  let text = read.getShowtimesBySeries;
  if (prev === "true") text = read.getPrevShowtimesBySeries;
  const query = {
    text: text,
    values: [dateTime, serUri],
  };
  screensf.client
    .query(query)
    .then((data) => {
      const { rows } = data;
      const upcoming = getUpcoming(rows)
      res.send(JSON.stringify(Object.values(upcoming)));
      res.end();
    })
    .catch((error) => {
      console.log(error, 'There was an error');
      res.end(error);
    });
};

const getShowtimesOnFilm = (req, res) => {
  const { today } = req.params;
  let dateTime = `${today} 03:00:00-8:00`;
  let text = read.getShowtimesOnFilm;
  const query = {
    text: text,
    values: [dateTime],
  };
  screensf.client
    .query(query)
    .then((data) => {
      const { rows } = data;
      const upcoming = getUpcoming(rows);
      const stringified = JSON.stringify(Object.values(upcoming))
      res.send(stringified);
      res.end();
    })
    .catch((error) => {
      console.log(error, 'There was an error');
      res.end(error);
    });
};

const getShowtimesInPerson = (req, res) => {
  const { today } = req.params;
  let dateTime = `${today} 03:00:00-8:00`;
  let text = read.getShowtimesInPerson;
  const query = {
    text: text,
    values: [dateTime],
  };
  screensf.client
    .query(query)
    .then((data) => {
      const { rows } = data;
      const upcoming = getUpcoming(rows);
      res.send(JSON.stringify(Object.values(upcoming)));
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

const getSeriesByUri = (req, res) => {
  const serUri = req.params.id;
  const query = {
    text: read.getSeriesByUri,
    values: [serUri],
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

const getAllScreenings = (req, res) => {
  const query = {
    text: read.getAllScreenings,
  };
  screensf.client
    .query(query)
    .then((data) => {
      res.send(JSON.stringify(data.rows));
      res.end();
    })
    .catch((error) => {
      console.log(error)
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
  getSeriesByUri,
  getMovies,
  getAllScreenings,
  getScreenings,
  getShowtimeHours,
  getFeatured,
  getShowtimesByVenue,
  getShowtimesBySeries,
  getShowtimesOnFilm,
  getShowtimesInPerson,
};
