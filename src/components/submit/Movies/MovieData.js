import axios from 'axios';
import { theMovieAPI } from '../../../../keys';


const getCrew = (data, title) => {
    const crewman = [];
    data.credits.crew.forEach((crew) => {
      if (crew.job === title) {
        crewman.push(`${crew.name}`);
      }
    });
    return crewman.join(', ');
  };

  const getMovieData = (movieId) => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${theMovieAPI}&append_to_response=credits`,
    })
      .then((response) => {
        const { data } = response;
        const movInfo = {
          'director':getCrew(data, 'Director'),
          'release_date1':data.release_date,
          'movie_runtime':data.runtime,
          'overview2':data.overview,
        };
        return movInfo;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

export default getMovieData