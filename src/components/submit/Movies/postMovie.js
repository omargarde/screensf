import axios from 'axios';

const postMovie = (input) => {
    axios({
      method: 'post',
      url: `/api/movies/`,
      data: input,
    })
      .then(() => {
          //do something
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  export default postMovie