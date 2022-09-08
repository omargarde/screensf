import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { theMovieAPI } from '../../../../keys';

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState({ results: [] });

  const searchMovie = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setSearchResult({ results: [] });
      return;
    }
    const urlQuery = query.split(' ').join('%20');
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie/?api_key=${theMovieAPI}&query=${urlQuery}`,
    })
      .then((response) => {
        const { data } = response;
        setSearchResult(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
  <div>
    <label htmlFor={searchQuery}>
      Search Movies API:
      <input
        onChange={(e) => searchMovie(e.target.value, e)}
        value={searchQuery}
        type="text"
      />
      </label>
      {searchResult.results.map((result) => (
        <div key={result.id}>
          <div className="film-title">
            {result.title}
            {` (`}
            {result.release_date}
            {`)`}
          </div>
          <div className="film-details">{result.id}</div>
          <div className="film-series">{result.overview}</div>
        </div>
      ))}
  </div>
  )
}




export default MovieSearch