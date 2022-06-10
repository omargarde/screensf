/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { dateHandle } from './helpers';

const ScreeningsEditor = (props) => {
  const { show } = props;
  const screenId = show.screening_id ? show.screening_id : 'newScr';
  const start = dateHandle(show.start_date);
  const end = dateHandle(show.end_date);
  const [venList, setVenList] = useState([]);
  const [venKey, setVenKey] = useState('');
  const [scrId, setScrId] = useState(screenId);
  const [movId, setMovId] = useState(show.movie_id);
  const [origSer, setOrigSer] = useState(show.series_id);
  const [serId, setSerId] = useState(show.series_id);
  const [altTitle, setAltTitle] = useState(show.alt_title);
  const [venue, setVenue] = useState(show.venue_id);
  const [screenNote, setScreenNote] = useState(show.screening_note);
  const [screenUrl, setScreenUrl] = useState(show.screening_url);
  const [screenFormat, setFormat] = useState(show.format);
  const [screenUseAlt, setUseAlt] = useState(show.use_alt);
  const [screenCanceled, setCanceled] = useState(show.canceled);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [note, setNote] = useState('');
  const [serList, setSerList] = useState([]);
  const [scrList, setScrList] = useState([]);
  const [scrKey, setScrKey] = useState('new');

  useEffect(() => {
    const getSeriesList = () => {
      axios({
        method: 'get',
        url: '/api/series/',
      })
        .then((response) => {
          const { data } = response;
          setSerList(data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    const getVenueList = () => {
      axios({
        method: 'get',
        url: '/api/venues/',
      })
        .then((response) => {
          const { data } = response;
          setVenList(data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    getSeriesList();
    getVenueList();
  }, []);

  const selectScreening = (selectedId) => {
    setNote('');
    setScrKey(selectedId);
    setScrId('');
    setMovId('');
    setVenue('');
    setAltTitle('');
    setScreenUrl('');
    setStartDate('');
    setSerId('');
    setEndDate('');
    setFormat('');
    setScreenNote('');
    setUseAlt('');
    setCanceled('');
    if (selectedId === 'newScr') {
      setOrigSer('');
      return;
    }
    const {
      screening_id,
      movies_id,
      venue_id,
      series_id,
      alt_title,
      screening_url,
      start_date,
      end_date,
      format,
      screening_note,
      use_alt,
      canceled,
    } = scrList[selectedId];
    setScrId(screening_id);
    setMovId(movies_id);
    setSerId(series_id);
    setOrigSer(series_id);
    setVenue(venue_id);
    setAltTitle(alt_title);
    setScreenUrl(screening_url);
    setStartDate(dateHandle(start_date));
    setEndDate(dateHandle(end_date));
    setFormat(format);
    setScreenNote(screening_note);
    setUseAlt(use_alt);
    setCanceled(canceled);
  };

  const getScreeningsList = (value) => {
    axios({
      method: 'get',
      url: `/api/screenings/${value}`,
    })
      .then((response) => {
        const { data } = response;
        setScrList(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const selectVenue = (value) => {
    setVenKey(value);
    getScreeningsList(venList[value].id);
  };

  const postScreenSeries = (screeningsId) => {
    axios({
      method: 'post',
      url: `/api/screenings-series/`,
      data: {
        screenings_id: screeningsId,
        series_id: serId,
      },
    })
      .then(() => {
        setNote('Successful screening and series post. Reload the page.');
        setTimeout(() => {
          setNote('');
        }, 1000);
      })
      .catch((error) => {
        setNote(
          'The screening posted, but there was an error posting the series.',
        );
        setTimeout(() => {
          setNote('');
        }, 1000);
        throw new Error(error);
      });
  };

  const editScreenSeries = () => {
    if (serId !== origSer) {
      axios({
        method: 'put',
        url: `/api/screenings-series/`,
        data: {
          screenings_id: scrId,
          series_id: origSer,
          new_series: serId,
        },
      })
        .then(() => {
          setNote('Successful screening and series edits. Reload the page.');
          setTimeout(() => {
            setNote('');
          }, 1000);
        })
        .catch((error) => {
          setNote(
            'The screening edited, but there was an error editing the series.',
          );
          setTimeout(() => {
            setNote('');
          }, 1000);
          throw new Error(error);
        });
    } else {
      setNote('Successful screening edit. No series change necessary.');
      setTimeout(() => {
        setNote('');
      }, 1000);
    };
  };

  const postScreening = () => {
    axios({
      method: 'post',
      url: `/api/screenings/`,
      data: {
        movies_id: movId,
        venues_id: venue,
        alt_title: altTitle,
        screening_url: screenUrl,
        start_date: startDate,
        end_date: endDate,
        format: screenFormat,
        screening_note: screenNote,
        use_alt: screenUseAlt,
        canceled: screenCanceled,
      },
    })
      .then((screeningData) => {
        const { data } = screeningData;
        setNote('Screening posted successfully. Posting series data...');
        postScreenSeries(data.id);
      })
      .catch((error) => {
        setNote('There was an error posting this screening.');
        throw new Error(error);
      });
  };

  const editScreening = () => {
    axios({
      method: 'put',
      url: `/api/screenings/`,
      data: {
        screening_id: scrId,
        movies_id: movId,
        venues_id: venue,
        alt_title: altTitle,
        screening_url: screenUrl,
        start_date: startDate,
        end_date: endDate,
        format: screenFormat,
        screening_note: screenNote,
        use_alt: screenUseAlt,
        canceled: screenCanceled,
      },
    })
      .then(() => {
        setNote('Screening edited successfully. Editing series data...');
        editScreenSeries();
      })
      .catch((error) => {
        setNote('There was an error editing this screening.');
        throw new Error(error);
      });
  };

  const handleScreening = () => {
    if (scrId === 'newScr') {
      postScreening();
      setNote('posting screening..');
    } else {
      editScreening();
      setNote('editing screening..');
    }
  };

  return (
    <div className="submit-form">
      <h3>Screening Editor</h3>
      <div>
        <div className="pick-screening">
          <label htmlFor={venKey}>
            <select
              value={venKey}
              onChange={(e) => selectVenue(e.target.value)}
            >
              <option>Filter by Venue</option>
              {venList.map((ven, i) => (
                <option key={ven.id} value={i}>
                  {ven.title}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor={scrKey}>
            <select
              value={scrKey}
              onChange={(e) => selectScreening(e.target.value)}
            >
              <option value="newScr">New Screening</option>
              {scrList.map((selScr, i) => (
                <option key={selScr.id} value={i}>
                  {selScr.alt_title}
                  {` - `}
                  {selScr.screening_id}
                </option>
              ))}
            </select>
          </label>
        </div>
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
            {venList.map((theater) => (
              <option key={theater.id} value={theater.id}>
                {theater.title}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={serId}>
          Select Series:
          <select value={serId} onChange={(e) => setSerId(e.target.value)}>
            <option value="">Select...</option>
            {serList.map((selSer) => (
              <option key={selSer.id} value={selSer.id}>
                {selSer.title}
              </option>
            ))}
          </select>
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
            <option value=" ">Select...</option>
            <option value="DCP">DCP</option>
            <option value="35mm">35mm</option>
            <option value="16mm">16mm</option>
            <option value="70mm">70mm</option>
            <option value="Mixed Formats">Mixed Formats</option>
            <option value="Digital">Digital</option>
            <option value="Video">Video</option>
            <option value="VHS">VHS</option>
            <option value="Virtual Screening">Virtual Screening</option>
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
        <label htmlFor={screenUseAlt}>
          Use Alt Title?
          <select
            value={screenUseAlt}
            onChange={(e) => setUseAlt(e.target.value)}
          >
            <option value="">Select...</option>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
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
      <div>{note}</div>
    </div>
  );
};

export default ScreeningsEditor;
