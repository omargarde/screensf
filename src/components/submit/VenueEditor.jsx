/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VenueEditor = () => {
  const [venList, setVenList] = useState([]);
  const [venKey, setVenKey] = useState('new');
  const [venId, setVenId] = useState(0);
  const [venTitle, setVenTitle] = useState('');
  const [venShortTitle, setVenShortTitle] = useState('');
  const [venCity, setVenCity] = useState('');
  const [venDesc, setVenDesc] = useState('');
  const [venAdd, setVenAdd] = useState('');
  const [venOpen, setVenOpen] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const getVenueList = () => {
      axios({
        method: 'get',
        url: '/venues/',
      })
        .then((response) => {
          const { data } = response;
          setVenList(data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    getVenueList();
  }, []);

  const selectVenue = (value) => {
    setVenKey(value);
    setVenId('');
    setVenTitle('');
    setVenShortTitle('');
    setVenCity('');
    setVenDesc('');
    setVenAdd('');
    setVenOpen('');
    setNote('');
    const {
      id,
      title,
      short_title,
      city,
      venue_description,
      address,
      currently_open,
    } = venList[value];
    setVenId(id);
    setVenTitle(title);
    setVenShortTitle(short_title);
    setVenCity(city);
    setVenDesc(venue_description);
    setVenAdd(address);
    setVenOpen(currently_open);
  };

  const postVenue = () => {
    axios({
      method: 'post',
      url: `/venues/`,
      data: {
        id: venId,
        title: venTitle,
        short_title: venShortTitle,
        city: venCity,
        venue_description: venDesc,
        address: venAdd,
        currently_open: venOpen,
      },
    })
      .then(() => {
        setNote('Venue posted successfully.');
      })
      .catch((error) => {
        setNote('There was an error posting this venue.');
        throw new Error(error);
      });
  };

  const editVenue = () => {
    axios({
      method: 'put',
      url: `/venues/`,
      data: {
        id: venId,
        title: venTitle,
        short_title: venShortTitle,
        city: venCity,
        venue_description: venDesc,
        address: venAdd,
        currently_open: venOpen,
      },
    })
      .then(() => {
        setNote('Venue edited successfully.');
      })
      .catch((error) => {
        setNote('There was an error editing this venue.');
        throw new Error(error);
      });
  };

  const handleVenue = () => {
    if (venKey === 'new') {
      postVenue();
    } else {
      editVenue();
    }
  };

  return (
    <div className="submit-form">
      <label htmlFor={venKey}>
        Select Venue:
        <select value={venKey} onChange={(e) => selectVenue(e.target.value)}>
          <option value="new">New Venue</option>
          {venList.map((venue, i) => (
            <option key={venue.id} value={i}>
              {venue.title}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={venTitle}>
        Venue Name:
        <input
          type="text"
          value={venTitle}
          onChange={(e) => setVenTitle(e.target.value)}
        />
      </label>
      <label htmlFor={venShortTitle}>
        Venue Short Name:
        <input
          type="text"
          value={venShortTitle}
          onChange={(e) => setVenShortTitle(e.target.value)}
        />
      </label>
      <label htmlFor={venCity}>
        Venue City:
        <input
          type="text"
          value={venCity}
          onChange={(e) => setVenCity(e.target.value)}
        />
      </label>
      <label htmlFor={venDesc}>
        Venue Description:
        <input
          type="text"
          value={venDesc}
          onChange={(e) => setVenDesc(e.target.value)}
        />
      </label>
      <label htmlFor={venAdd}>
        Venue Address:
        <input
          type="text"
          value={venAdd}
          onChange={(e) => setVenAdd(e.target.value)}
        />
      </label>
      <label htmlFor={venOpen}>
        Open?
        <select value={venOpen} onChange={(e) => setVenOpen(e.target.value)}>
          <option value="">Select...</option>
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>
      </label>
      <button
        type="button"
        className="ssf-button"
        onClick={() => {
          handleVenue();
        }}
      >
        Submit
      </button>
      <div>{note}</div>
    </div>
  );
};

export default VenueEditor;
