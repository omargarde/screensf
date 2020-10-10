const boilerplate = {
  image: 'https://storage.googleapis.com/filmcans/true-romance-banner.jpg',
  writer: '',
  article:
    'The SF Bay Film Calendar is an exciting new resource for filmgoing in ' +
    'the Bay Area. Starting in summer 2020, we will list daily showtimes for ' +
    'independent theaters, repertory cinema, and select film series and ' +
    "festivals. We'll also recommended a movie for the day. Currently " +
    "we're listing all virtual screenings being made available in local " +
    'theaters. As theaters begin to reopen, we hope you will return and let ' +
    'us be your guide back to the movies.',
  showtimes: [],
  welcome: true,
};

const loadImage = 'https://storage.googleapis.com/filmcans/filmreel2.png';

const editShowtimes = (showtimes) => {
  const venueArray = [];
  let showsArray = [];
  showtimes.forEach((venue) => {
    venue.shows.forEach((show) => {
      if (show.showtimes.length > 0 || show.format === 'Virtual Screening') {
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
