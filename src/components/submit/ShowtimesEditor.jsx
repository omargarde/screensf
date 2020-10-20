import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { digitsList } from './helpers';

const ShowtimesEditor = (props) => {
  const { screening, today, submit } = props;
  const [expand, setExpand] = useState(false);
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [success, setSuccess] = useState('');
  const [shoKey, setShoKey] = useState('new');
  const [shoId, setShoId] = useState('');
  const [shoNote, setShoNote] = useState('');
  const [shoCanceled, setCanceled] = useState(0);
  const [shoHide, setHide] = useState(0);
  const [shoList, setShoList] = useState([]);

  const newShow = () => {
    return `${today} ${hour}:${minute}:00-8:00`;
  };

  useEffect(() => {
    const getShowList = () => {
      axios({
        method: 'get',
        url: `/showtime-hours/${screening}`,
      })
        .then((response) => {
          const { data } = response;
          const allData = [];
          data.forEach((show) => {
            if (show.id) {
              allData.push(show);
            }
          });
          setShoList(allData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    getShowList();
  }, [screening]);

  const postShowtime = () => {
    axios({
      method: 'post',
      url: `/showtimes/`,
      data: {
        screenings_id: screening,
        showtime: newShow(),
        showtime_note: shoNote,
        canceled: shoCanceled,
        hide: shoHide,
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

  const editShowtime = () => {
    axios({
      method: 'put',
      url: `/showtimes/`,
      data: {
        showtime_id: shoId,
        showtime: newShow(),
        showtime_note: shoNote,
        canceled: shoCanceled,
        hide: shoHide,
      },
    })
      .then(() => {
        setSuccess('Successful edit. Reload the page.');
      })
      .catch((error) => {
        setSuccess('There was an error posting this showtime.');
        throw new Error(error);
      });
  };

  const selectShowtime = (key) => {
    const showTimeData = shoList[key];
    setShoKey(key);
    setShoId(showTimeData.id);
    const shoHour = showTimeData.showtime.slice(11, 13);
    const shoMin = showTimeData.showtime.slice(14, 16);
    setHour(shoHour);
    setMinute(shoMin);
    setShoNote(showTimeData.showtime_note);
    setHide(showTimeData.hide);
    setCanceled(showTimeData.canceled);
  };

  const handleShowtime = () => {
    if (shoKey === 'new') {
      postShowtime();
      setSuccess('posting showtime');
    } else {
      editShowtime();
      setSuccess('editing showtime');
    }
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
            <label htmlFor={shoKey}>
              Select Showtime:
              <select
                value={shoKey}
                onChange={(e) => selectShowtime(e.target.value)}
              >
                <option value="new">New Showtime</option>
                {shoList.map((selSho, i) => (
                  <option key={selSho.id} value={i}>
                    {selSho.id}
                    {' ('}
                    {selSho.showtime}
                    {')'}
                  </option>
                ))}
              </select>
            </label>
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              {digitsList(0, 23, 'hour').map((time) => (
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
            <label htmlFor={shoNote}>
              Showtime Note:
              <input
                onChange={(e) => setShoNote(e.target.value)}
                value={shoNote}
                type="text"
              />
            </label>
            <label htmlFor={shoCanceled}>
              Canceled?
              <select
                value={shoCanceled}
                onChange={(e) => setCanceled(e.target.value)}
              >
                <option value="">Select...</option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </label>
            <label htmlFor={shoHide}>
              Hide?
              <select value={shoHide} onChange={(e) => setHide(e.target.value)}>
                <option value="">Select...</option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </label>
            <button
              type="button"
              className="ssf-button"
              onClick={() => {
                handleShowtime();
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
};

export default ShowtimesEditor;
