import React, { useState } from 'react';
import axios from 'axios';
import { cutDate } from './helpers';

function ScreeningsEditor(props) {
  const { show, theaters } = props;
  const start = cutDate(show.start_date);
  const end = cutDate(show.end_date);
  const [movId, setMovId] = useState(show.movie_id);
  const [serId, setSerId] = useState(show.series_id);
  // const [screenId, setScreenId] = useState(show.screening_id);
  const [altTitle, setAltTitle] = useState(show.alt_title);
  const [venue, setVenue] = useState(show.venue_id);
  const [screenNote, setScreenNote] = useState(show.screening_note);
  const [screenUrl, setScreenUrl] = useState(show.screening_url);
  const [screenFormat, setFormat] = useState(show.format);
  const [screenCanceled, setCanceled] = useState(show.canceled);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [success, setSuccess] = useState('');

  const postScreenSeries = (screeningsId) => {
    axios({
      method: 'post',
      url: `/screenings-series/`,
      data: {
        screenings_id: screeningsId,
        series_id: serId,
      },
    })
      .then(() => {
        setSuccess('Successful screening and series post. Reload the page.');
      })
      .catch((error) => {
        setSuccess('There was an error posting this showtime.');
        throw new Error(error);
      });
  };

  const postScreening = () => {
    axios({
      method: 'post',
      url: `/screenings/`,
      data: {
        movies_id: movId,
        venues_id: venue,
        alt_title: altTitle,
        screening_url: screenUrl,
        start_date: startDate,
        end_date: endDate,
        format: screenFormat,
        screening_note: screenNote,
        canceled: screenCanceled,
      },
    })
      .then((screeningData) => {
        const { data } = screeningData;
        setSuccess('Screening posted successfully. Posting series data...');
        postScreenSeries(data.id);
      })
      .catch((error) => {
        setSuccess('There was an error posting this showtime.');
        throw new Error(error);
      });
  };

  const editScreening = () => {
    // check each state for changes
    // send axios request(s) for edits
    return console.log('editScreening');
  };

  const handleScreening = () => {
    if (show.movie_id) {
      editScreening();
    } else {
      postScreening();
    }
  };

  return (
    <div className="submit-form">
      <div>
        <label htmlFor={movId}>
          Movie ID:
          <input
            onChange={(e) => setMovId(e.target.value)}
            value={movId}
            type="text"
          />
        </label>
        <label htmlFor={venue}>
          Venue:
          <select value={venue} onChange={(e) => setVenue(e.target.value)}>
            <option value="">Select...</option>
            {theaters.map((theater) => (
              <option key={theater.id} value={theater.id}>
                {theater.title}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={serId}>
          Series ID:
          <input
            onChange={(e) => setSerId(e.target.value)}
            value={serId}
            type="text"
          />
        </label>
        <label htmlFor={altTitle}>
          Alt Title:
          <input
            onChange={(e) => setAltTitle(e.target.value)}
            value={altTitle}
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
        <label htmlFor={screenFormat}>
          Format:
          <select
            value={screenFormat}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="DCP">DCP</option>
            <option value="35mm">35mm</option>
            <option value="16mm">16mm</option>
            <option value="70mm">70mm</option>
            <option value="DV">DV</option>
            <option value="VHS">VHS</option>
            <option value="Virtual Screening"> Virtual Screening</option>
          </select>
        </label>
        <label htmlFor={screenUrl}>
          URL:
          <input
            onChange={(e) => setScreenUrl(e.target.value)}
            value={screenUrl}
            type="text"
          />
        </label>
        <label htmlFor={screenNote}>
          Screening Note:
          <input
            onChange={(e) => setScreenNote(e.target.value)}
            value={screenNote}
            type="text"
          />
        </label>
        <label htmlFor={screenCanceled}>
          Canceled?
          <select
            value={screenCanceled}
            onChange={(e) => setCanceled(e.target.value)}
          >
            <option value="">Select...</option>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </label>
        <button
          type="button"
          className="ssf-button"
          onClick={() => {
            handleScreening();
          }}
        >
          Submit
        </button>
      </div>
      <div>{success}</div>
    </div>
  );
}

export default ScreeningsEditor;
