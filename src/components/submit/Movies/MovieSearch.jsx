import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { theMovieAPI } from '../../../../keys';


const MovieSearch = (props) => {
  const { selectMov } = props
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState({ results: [] });

  const getCrew = (data, title) => {
    const crewman = [];
    data.credits.crew.forEach((crew) => {
      if (crew.job === title) {
        crewman.push(`${crew.name}`);
      }
    });
    return crewman.join(', ');
  };

  const addData = (data) => {
    data.results.map((result) =>{
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${result.id}?api_key=${theMovieAPI}&append_to_response=credits`
      })
        .then((response) => {
          const { data } = response;
          result['director'] = getCrew(data, 'Director');
          result['runtime'] = data.runtime;
          return result
      })
        .catch((error) => {
          throw new Error(error);
        })
    }, setTimeout(() => {setSearchResult(data)},1000)) 
  }



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
        addData(data)
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
      <div className="results">
        {searchResult.results.map((result) => (
          <div key={result.id} onClick={() => {
            selectMov(result)
            setSearchResult({ results: [result] })
          }} 
            className="film-results"> 
            <div className="film-title">
              {result.title}
              {` (`}
              {result.release_date}
              {`)`}
            </div>
            <div className="film-details">
              <div>{result.director}</div>
              <div>{result.runtime}min</div>
              <div>ID: {result.id}</div>
            </div>
            <div className="film-series">{result.overview}</div>
          </div>
        ))}
      </div>
  </div>
  )
}




export default MovieSearch