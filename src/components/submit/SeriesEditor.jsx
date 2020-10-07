/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cutDate } from './helpers';

const SeriesEditor = () => {
  const [serKey, setSerKey] = useState('new');
  const [serId, setSerId] = useState('');
  const [serTitle, setSerTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [serDesc, setSerDesc] = useState('');
  const [serUrl, setSerUrl] = useState('');
  const [serList, setSerList] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: '/series/',
    })
      .then((response) => {
        const { data } = response;
        setSerList(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  const selectSeries = (selectedId) => {
    setNote('');
    setSerKey(selectedId);
    setSerId('');
    setSerTitle('');
    setStartDate('');
    setEndDate('');
    setSerDesc('');
    setSerUrl('');
    if (selectedId === 'new') return;
    const {
      id,
      title,
      start_date,
      end_date,
      series_description,
      series_url,
    } = serList[selectedId];
    setSerId(id);
    setSerTitle(title);
    setStartDate(cutDate(start_date));
    setEndDate(cutDate(end_date));
    setSerDesc(series_description);
    setSerUrl(series_url);
  };

  const postSeries = () => {
    axios({
      method: 'post',
      url: `/series/`,
      data: {
        title: serTitle,
        start_date: startDate,
        end_date: endDate,
        series_description: serDesc,
        series_url: serUrl,
      },
    })
      .then(() => {
        setNote('Series posted successfully.');
      })
      .catch((error) => {
        setNote('There was an error posting this series.');
        throw new Error(error);
      });
  };

  const editSeries = () => {
    setNote('edit series');
  };

  const handleSeries = () => {
    if (serKey === 'new') {
      postSeries();
    } else {
      editSeries();
    }
  };

  return (
    <div className="submit-form">
      <label htmlFor={serKey}>
        Select Series:
        <select value={serKey} onChange={(e) => selectSeries(e.target.value)}>
          <option value="new">New Series</option>
          {serList.map((selSer, i) => (
            <option key={selSer.id} value={i}>
              {selSer.title}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={serTitle}>
        Series Name:
        <input
          onChange={(e) => setSerTitle(e.target.value)}
          value={serTitle}
          type="text"
        />
      </label>
      <label htmlFor={startDate}>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label htmlFor={endDate}>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label htmlFor={serDesc}>
        Series Description:
        <input
          onChange={(e) => setSerDesc(e.target.value)}
          value={serDesc}
          type="text"
        />
      </label>
      <label htmlFor={serUrl}>
        Series URL:
        <input
          onChange={(e) => setSerUrl(e.target.value)}
          value={serUrl}
          type="text"
        />
      </label>
      <button
        type="button"
        className="ssf-button"
        onClick={() => {
          handleSeries();
        }}
      >
        Submit
      </button>
      <div>{note}</div>
    </div>
  );
};

export default SeriesEditor;
