import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function ShowtimesEditor(props) {
  const { show, today } = props;
  const [hour, setHour] = useState('01');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState('AM');
  const [success, setSuccess] = useState('');

  const hoursList = [
    { id: 1, hour: '01' },
    { id: 2, hour: '02' },
    { id: 3, hour: '03' },
    { id: 4, hour: '04' },
    { id: 5, hour: '05' },
    { id: 6, hour: '06' },
    { id: 7, hour: '07' },
    { id: 8, hour: '08' },
    { id: 9, hour: '09' },
    { id: 10, hour: '10' },
    { id: 11, hour: '11' },
    { id: 12, hour: '12' },
  ];
  const minuteList = [
    { id: 0, minute: '00' },
    { id: 1, minute: '01' },
    { id: 2, minute: '02' },
    { id: 3, minute: '03' },
    { id: 4, minute: '04' },
    { id: 5, minute: '05' },
    { id: 6, minute: '06' },
    { id: 7, minute: '07' },
    { id: 8, minute: '08' },
    { id: 9, minute: '09' },
    { id: 10, minute: '10' },
    { id: 11, minute: '11' },
    { id: 12, minute: '12' },
    { id: 13, minute: '13' },
    { id: 14, minute: '14' },
    { id: 15, minute: '15' },
    { id: 16, minute: '16' },
    { id: 17, minute: '17' },
    { id: 18, minute: '18' },
    { id: 19, minute: '19' },
    { id: 20, minute: '20' },
    { id: 21, minute: '21' },
    { id: 22, minute: '22' },
    { id: 23, minute: '23' },
    { id: 24, minute: '24' },
    { id: 25, minute: '25' },
    { id: 26, minute: '26' },
    { id: 27, minute: '27' },
    { id: 28, minute: '28' },
    { id: 29, minute: '29' },
    { id: 30, minute: '30' },
    { id: 31, minute: '31' },
    { id: 32, minute: '32' },
    { id: 33, minute: '33' },
    { id: 34, minute: '34' },
    { id: 35, minute: '35' },
    { id: 36, minute: '36' },
    { id: 37, minute: '37' },
    { id: 38, minute: '38' },
    { id: 39, minute: '39' },
    { id: 40, minute: '40' },
    { id: 41, minute: '41' },
    { id: 42, minute: '42' },
    { id: 43, minute: '43' },
    { id: 44, minute: '44' },
    { id: 45, minute: '45' },
    { id: 46, minute: '46' },
    { id: 47, minute: '47' },
    { id: 48, minute: '48' },
    { id: 49, minute: '49' },
    { id: 50, minute: '50' },
    { id: 51, minute: '51' },
    { id: 52, minute: '52' },
    { id: 53, minute: '53' },
    { id: 54, minute: '54' },
    { id: 55, minute: '55' },
    { id: 56, minute: '56' },
    { id: 57, minute: '57' },
    { id: 58, minute: '58' },
    { id: 59, minute: '59' },
  ];
  const postShowtime = () => {
    let twentyFour = hour;
    if (ampm === 'PM') twentyFour = Number(hour) + 12;
    if (twentyFour === 24) twentyFour = '12';
    if (ampm === 'AM' && hour === '12') twentyFour = '00';
    const date = moment(today).format('YYYY-MM-DD');
    const newShowtime = `${date} ${twentyFour}:${minute}:00-8:00`;
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
        throw new Error(error);
      });
  };

  return (
    <div className="submit">
      <div>
        <select value={hour} onChange={(e) => setHour(e.target.value)}>
          {hoursList.map((time) => (
            <option key={time.id} value={time.hour}>
              {time.hour}
            </option>
          ))}
        </select>
        <select value={minute} onChange={(e) => setMinute(e.target.value)}>
          {minuteList.map((time) => (
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
  );
}
export default ShowtimesEditor;
