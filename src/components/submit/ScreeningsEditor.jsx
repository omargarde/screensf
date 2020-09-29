import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';

function ScreeningsEditor(props) {
  const { show, today } = props;
  const [expand, setExpand] = useState(false);
  const [movId, setMovId] = useState('');
  const [serId, setSerId] = useState('');
  const [screenNote, setScreenNote] = useState('');
  const [screenUrl, setScreenUrl] = useState('');
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

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
          <label htmlFor={serId}>
            Series ID:
            <input
              onChange={(e) => setSerId(e.target.value)}
              id={serId}
              type="text"
            />
          </label>
          <label>Start Date:</label>
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          /> */}
          <label>End Date:</label>
          {/* <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          /> */}
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
          <label htmlFor={screenUrl}>
            URL:
            <input
              onChange={(e) => setScreenUrl(e.target.value)}
              id={screenUrl}
              type="text"
            />
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
