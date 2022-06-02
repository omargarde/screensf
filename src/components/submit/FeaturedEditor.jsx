/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { dateHandle } from './helpers';

const FeaturedEditor = () => {
  const [featKey, setFeatKey] = useState('new');
  const [featId, setFeatId] = useState('');
  const [screenId, setScreenId] = useState('');
  const [onDate, setOnDate] = useState('');
  const [featImage, setFeatImage] = useState('');
  const [featAuthor, setAuthor] = useState('');
  const [featArticle, setArticle] = useState('');
  const [featList, setFeatList] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    const getFeaturedList = () => {
      axios({
        method: 'get',
        url: '/api/featured/',
      })
        .then((response) => {
          const { data } = response;
          setFeatList(data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    getFeaturedList();
  }, []);

  const selectFeatured = (selectedId) => {
    setNote('');
    setFeatKey(selectedId);
    setFeatId('');
    setScreenId('');
    setOnDate('');
    setFeatImage('');
    setAuthor('');
    setArticle('');
    if (selectedId === 'new') return;
    const {
      id,
      screenings_id,
      ondate,
      featured_image,
      author,
      article,
    } = featList[selectedId];
    setFeatId(id);
    setScreenId(screenings_id);
    setOnDate(dateHandle(ondate));
    setFeatImage(featured_image);
    setAuthor(author);
    setArticle(article);
  };

  const postFeatured = () => {
    axios({
      method: 'post',
      url: `/api/featured/`,
      data: {
        screenings_id: screenId,
        ondate: onDate,
        featured_image: featImage,
        author: featAuthor,
        article: featArticle,
      },
    })
      .then(() => {
        setNote('Featured film posted successfully.');
      })
      .catch((error) => {
        setNote('There was an error posting this featured film.');
        throw new Error(error);
      });
  };

  const editFeatured = () => {
    axios({
      method: 'put',
      url: `/api/featured/`,
      data: {
        id: featId,
        screenings_id: screenId,
        ondate: onDate,
        featured_image: featImage,
        author: featAuthor,
        article: featArticle,
      },
    })
      .then(() => {
        setNote('Featured film edited successfully.');
      })
      .catch((error) => {
        setNote('There was an error editing this featured film.');
        throw new Error(error);
      });
  };

  const handleFeatured = () => {
    if (featKey === 'new') {
      postFeatured();
    } else {
      editFeatured();
    }
  };

  return (
    <div className="submit-form">
      <label htmlFor={featKey}>
        Select Featured:
        <select
          value={featKey}
          onChange={(e) => selectFeatured(e.target.value)}
        >
          <option value="new">New Featured Film</option>
          {featList.map((selFeat, i) => (
            <option key={selFeat.id} value={i}>
              {selFeat.id}
              {' - '}
              {dateHandle(selFeat.ondate)}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={screenId}>
        Screening ID:
        <input
          onChange={(e) => setScreenId(e.target.value)}
          value={screenId}
          type="text"
        />
      </label>
      <label htmlFor={onDate}>
        Date:
        <input
          type="date"
          value={onDate}
          onChange={(e) => setOnDate(e.target.value)}
        />
      </label>
      <label htmlFor={featImage}>
        Featured Image Link:
        <input
          onChange={(e) => setFeatImage(e.target.value)}
          value={featImage}
          type="text"
        />
      </label>
      <label htmlFor={featAuthor}>
        Author:
        <input
          onChange={(e) => setAuthor(e.target.value)}
          value={featAuthor}
          type="text"
        />
      </label>
      <label htmlFor={featArticle}>
        Article:
        <input
          onChange={(e) => setArticle(e.target.value)}
          value={featArticle}
          type="text"
        />
      </label>
      <button
        type="button"
        className="ssf-button"
        onClick={() => {
          handleFeatured();
        }}
      >
        Submit
      </button>
      <div>{note}</div>
    </div>
  );
};

export default FeaturedEditor;
