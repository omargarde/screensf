/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cutDate } from './helpers';

const MoviesEditor = () => {
  const [movKey, setMovKey] = useState('new');
  const [movId, setMovId] = useState('');
  const [movTitle, setMovTitle] = useState('');
  const [movDirector, setMovDirector] = useState('');
  const [relDate, setRelDate] = useState('');
  const [movRuntime, setMovRuntime] = useState('');
  const [movSyn, setMovSyn] = useState('');
  const [movList, setMovList] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: '/movies/',
    })
      .then((response) => {
        const { data } = response;
        setMovList(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [movList]);

  const selectMovie = (selectedId) => {
    setNote('');
    setMovKey(selectedId);
    setMovId('');
    setMovTitle('');
    setRelDate('');
    setMovRuntime('');
    setMovSyn('');
    if (selectedId === 'new') return;
    const { id, title, director, release_date, runtime, synopsis } = movList[
      selectedId
    ];
    setMovId(id);
    setMovTitle(title);
    setMovDirector(director);
    setRelDate(cutDate(release_date));
    setMovRuntime(runtime);
    setMovSyn(synopsis);
  };

  const postMovie = () => {
    axios({
      method: 'post',
      url: `/movies/`,
      data: {
        id: movId,
        title: movTitle,
        director: movDirector,
        release_date: relDate,
        runtime: movRuntime,
        synopsis: movSyn,
      },
    })
      .then(() => {
        setNote('Movie posted successfully.');
      })
      .catch((error) => {
        setNote('There was an error posting this movie.');
        throw new Error(error);
      });
  };

  const editMovie = () => {
    axios({
      method: 'put',
      url: `/movies/`,
      data: {
        id: movId,
        title: movTitle,
        director: movDirector,
        release_date: relDate,
        runtime: movRuntime,
        synopsis: movSyn,
      },
    })
      .then(() => {
        setNote('Movie edited successfully.');
      })
      .catch((error) => {
        setNote('There was an error editing this movie.');
        throw new Error(error);
      });
  };

  const handleMovie = () => {
    if (movKey === 'new') {
      postMovie();
    } else {
      editMovie();
    }
  };

  return (
    <div className="submit-form">
      <label htmlFor={movKey}>
        Select Movie:
        <select value={movKey} onChange={(e) => selectMovie(e.target.value)}>
          <option value="new">New Movie</option>
          {movList.map((selMov, i) => (
            <option key={selMov.id} value={i}>
              {selMov.title}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={movId}>
        Movie ID:
        <input
          onChange={(e) => setMovId(e.target.value)}
          value={movId}
          type="text"
        />
      </label>
      <label htmlFor={movTitle}>
        Title:
        <input
          onChange={(e) => setMovTitle(e.target.value)}
          value={movTitle}
          type="text"
        />
      </label>
      <label htmlFor={movDirector}>
        Director:
        <input
          onChange={(e) => setMovDirector(e.target.value)}
          value={movDirector}
          type="text"
        />
      </label>
      <label htmlFor={relDate}>
        Release Date:
        <input
          type="date"
          value={relDate}
          onChange={(e) => setRelDate(e.target.value)}
        />
      </label>
      <label htmlFor={movRuntime}>
        Runtime:
        <input
          onChange={(e) => setMovRuntime(e.target.value)}
          value={movRuntime}
          type="text"
        />
      </label>
      <label htmlFor={movSyn}>
        Synopsis:
        <input
          onChange={(e) => setMovSyn(e.target.value)}
          value={movSyn}
          type="text"
        />
      </label>
      <button
        type="button"
        className="ssf-button"
        onClick={() => {
          handleMovie();
        }}
      >
        Submit
      </button>
      <div>{note}</div>
    </div>
  );
};

export default MoviesEditor;
