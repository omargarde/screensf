import React, { useState } from 'react';

function ScreeningsEditor(props) {
  const { show, today } = props;
  const [expand, setExpand] = useState(false);
  const [movId, setMovId] = useState('');
  const [serId, setSerId] = useState('');
  const [screenNote, setScreenNote] = useState('');

  const postScreening = () => {
    return console.log('post screening');
  };

  return (
    <div className="submit">
      <div className="film-title">Add Screening</div>
      <button
        type="button"
        className="submit-showtime-button"
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
          <label htmlFor={serId}>
            Series ID:
            <input
              onChange={(e) => setSerId(e.target.value)}
              id={serId}
              type="text"
            />
          </label>
          <label>Start Date:</label>
          <label>End Date:</label>
          <label>
            Format:
            <select>
              <option>DCP</option>
              <option>35mm</option>
              <option>16mm</option>
              <option>70mm</option>
              <option>DV</option>
              <option>VHS</option>
              <option>Virtual Screening</option>
            </select>
          </label>
          <label>
            URL:
            <input type="text" />
          </label>
          <label htmlFor={screenNote}>
            Screening Note:
            <input
              onChange={(e) => setScreenNote(e.target.value)}
              id={screenNote}
              type="text"
            />
          </label>
          <label>
            <h4>Select Venue</h4>
            <select>
              <option>The Castro Theater</option>
              <option>Roxie Theater</option>
              <option>Pacific Film Archive</option>
              <option>Artists Television Access</option>
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
