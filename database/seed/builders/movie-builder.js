const axios = require('axios');
const fs = require('fs');
const mov = require('../data/movies');
const key = require('../keys');

const movies = [];
let ctr = 0;

const importr = (array) => {
  const importer = fs.createWriteStream('../sql/movies.sql', { flags: 'a' });
  array.forEach((row) => importer.write(`${row}\n`));
  importer.end();
};

mov.movies.forEach((id) => {
  axios({
    method: 'get',
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=${key.moviedb}&append_to_response=credits`,
  })
    .then((response) => {
      const { data } = response;
      let director = '';
      data.credits.crew.forEach((crew) => {
        if (crew.job === 'Director') {
          director += `${crew.name}`;
        }
      });
      movies.push(
        'INSERT INTO movies (id, title, director, release_date, runtime, synopsis) VALUES',
      );
      movies.push(
        `    (${data.id}, $$${data.title}$$, $$${director}$$, $$${data.release_date}$$, ${data.runtime}, $$${data.overview}$$);`,
      );
      ctr += 1;
      if (ctr === mov.movies.length) {
        importr(movies);
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
});
