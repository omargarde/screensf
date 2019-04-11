const exampleData = require('./exampleData');
const exampleFeature = require('./exampleFeature');

const fetchShowtimes = (date) => {
  const nest = {};

  for (let i = 0; i < exampleData.length; i += 1) {
    if (exampleData[i].date === date) {
      if (!nest[exampleData[i].venue]) {
        nest[exampleData[i].venue] = {
          venue: exampleData[i].venue,
          shows: [],
        };
      }

      const showArray = nest[exampleData[i].venue].shows;
      let match = 0;

      for (let x = 0; x < showArray.length; x += 1) {
        if (showArray[x].film === exampleData[i].film) {
          showArray[x].showtimes.push(exampleData[i].showtime);
          match += 1;
        }
      }

      if (!match) {
        const show = exampleData[i];
        show.showtimes = [exampleData[i].showtime];
        nest[exampleData[i].venue].shows.push(show);
      }
    }
  }

  return Object.values(nest);
};


const fetchRecommended = (date) => {
  for (let i = 0; i < exampleFeature.length; i += 1) {
    if (exampleFeature[i].date === date) {
      return exampleFeature[i];
    }
  }
};

//create


//read

//read based on date

const findShowtimesOnDate = (date) => {
  let showtimes = [];
  //takes in date in text format
  //should be converted to format useable by database query


  //should return string with all showtimes data for a single date
  return showtimes
}

//update


//delete

module.exports = { fetchShowtimes, fetchRecommended };
