import React, { useState } from 'react';
import axios from 'axios';
import { digitsList } from './helpers';

function ShowtimesEditor(props) {
  const { show, today, submit } = props;
  const [expand, setExpand] = useState(false);
  const [hour, setHour] = useState('01');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState('AM');
  const [success, setSuccess] = useState('');

  const postShowtime = () => {
    let twentyFour = hour;
    if (ampm === 'PM' && twentyFour < 12) twentyFour = Number(hour) + 12;
    if (ampm === 'AM' && hour === '12') twentyFour = '00';
    const newShowtime = `${today} ${twentyFour}:${minute}:00-8:00`;
    axios({
      method: 'post',
      url: `/showtimes/`,
      data: {
        screenings_id: show.screening_id,
        showtime: newShowtime,
        showtime_note: '',
        canceled: 0,
        hide: 0,
      },
    })
      .then(() => {
        setSuccess('Successful post. Reload the page.');
      })
      .catch((error) => {
        setSuccess('There was an error posting this showtime.');
        throw new Error(error);
      });
  };

  if (!submit) return <div />;

  return (
    <span>
      <button
        type="button"
        className="submit-showtime-button"
        onClick={() => setExpand(!expand)}
      >
        {expand ? '-' : '+'}
      </button>
      {expand ? (
        <div className="submit-form">
          <div>
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              {digitsList(1, 12, 'hour').map((time) => (
                <option key={time.id} value={time.hour}>
                  {time.hour}
                </option>
              ))}
            </select>
            <select value={minute} onChange={(e) => setMinute(e.target.value)}>
              {digitsList(0, 59, 'minute').map((time) => (
                <option key={time.id} value={time.minute}>
                  {time.minute}
                </option>
              ))}
            </select>
            <select value={ampm} onChange={(e) => setAmpm(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <button
              type="button"
              className="ssf-button"
              onClick={() => {
                postShowtime();
              }}
            >
              Submit
            </button>
          </div>
          <div>{success}</div>
        </div>
      ) : (
        ''
      )}
    </span>
  );
}

export default ShowtimesEditor;
