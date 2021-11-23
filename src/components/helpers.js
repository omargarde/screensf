const boilerplate = {
  writer: '',
  article:`SF Bay Film is an exciting new resource for` + 
  `filmgoing in the Bay Area. We list daily showtimes for independent theaters, ` +
  `repertory cinema, and select film series and festivals.`,
  showtimes: [],
  welcome: true,
};

const loadImage = 'https://storage.googleapis.com/filmcans/filmreel2.png';

const editShowtimes = (showtimes) => {
  const venueArray = [];
  let showsArray = [];
  showtimes.forEach((venue) => {
    venue.shows.forEach((show) => {
      if (show.showtimesid != null || show.format === 'Virtual Screening') {
        showsArray.push(show);
      }
    });
    if (showsArray.length > 0) {
      const venueCopy = venue;
      venueCopy.shows = showsArray;
      venueArray.push(venueCopy);
      showsArray = [];
    }
  });
  return venueArray;
};

module.exports = {
  data: boilerplate,
  loadImage,
  editShowtimes,
};
