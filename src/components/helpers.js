const featWelcome = {
  writer: '',
  article:`SF Bay Film is an exciting new resource for ` + 
  `filmgoing in the Bay Area. We list daily showtimes for independent theaters, ` +
  `repertory cinema, and select film series and festivals.`,
  showtimes: [],
  welcome: true,
};

const images = [
  'https://storage.googleapis.com/filmcans/featured/true-romance.jpg',
  'https://storage.googleapis.com/filmcans/featured/stranger-than-paradise.jpg',
  'https://storage.googleapis.com/filmcans/featured/goodbye-dragon-inn.jpeg',
  'https://storage.googleapis.com/filmcans/featured/gremlins.jpeg',
  'https://storage.googleapis.com/filmcans/featured/inglorious-basterds.jpeg',
];

const loadImage = 'https://storage.googleapis.com/filmcans/filmreel2.png';

module.exports = {
  featWelcome,
  loadImage,
  images,
};
