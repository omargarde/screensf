const boilerplateImage = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const images = [
  'https://storage.googleapis.com/filmcans/true-romance-banner.jpg',
  'https://storage.googleapis.com/filmcans/vdM73PvqnJqS3t23h3Pir4dY2xO.jpg',
];

const boilerplate = {
  image: 'https://storage.googleapis.com/filmcans/true-romance-banner.jpg',
  writer: '',
  article:
    'The SF Bay Film calendar is an exciting new resource for filmgoing in ' +
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

const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
};

module.exports = {
  data: boilerplate,
  loadImage,
  editShowtimes,
  boilerplateImage,
  images,
  isValidDate,
};
