import React, { useState } from 'react';

function ScreeningsEditor(props) {
  const { show, today } = props;
  const [expand, setExpand] = useState(false);
  const [movId, setMovId] = useState('');
  const [serId, setSerId] = useState('');
  const [altTitle, setAltTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [screenNote, setScreenNote] = useState('');
  const [screenUrl, setScreenUrl] = useState('');
  const [format, setFormat] = useState('');
  const [canceled, setCanceled] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const postScreening = () => {
    return console.log('post screening');
  };

  return (
    <div className="submit-form">
      <div className="film-title">Add Screening</div>
      <button
        type="button"
        className="submit-screening-button"
        onClick={() => setExpand(!expand)}
      >
        {expand ? '-' : '+'}
      </button>
      {expand ? (
        <div>
          <label htmlFor={movId}>
            Movie ID:
            <input
              onChange={(e) => setMovId(e.target.value)}
              id={movId}
              type="text"
            />
          </label>
          <label htmlFor={venue}>
            Venue
            <select value={venue} onChange={(e) => setVenue(e.target.value)}>
              <option>The Castro Theater</option>
              <option>Roxie Theater</option>
              <option>Pacific Film Archive</option>
              <option>Artists Television Access</option>
            </select>
          </label>
          <label htmlFor={serId}>
            Series ID:
            <input
              onChange={(e) => setSerId(e.target.value)}
              id={serId}
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
          <label htmlFor={format}>
            Format:
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option>DCP</option>
              <option>35mm</option>
              <option>16mm</option>
              <option>70mm</option>
              <option>DV</option>
              <option>VHS</option>
              <option>Virtual Screening</option>
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
          <label
            htmlFor={canceled}
            onChange={(e) => setCanceled(e.target.value)}
          >
            Canceled?
            <select>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>
          <button
            type="button"
            className="ssf-button"
            onClick={() => {
              postScreening();
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default ScreeningsEditor;
