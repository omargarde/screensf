import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Venues = () => {
  // const [venList, setVenList] = useState({});
  const [venSanFran, setSanFran] = useState([]);
  const [venEast, setEast] = useState([]);
  const [venPen, setPen] = useState([]);
  const [venSouth, setSouth] = useState([]);
  const [venNorth, setNorth] = useState([]);
  const [venSanCru, setSanCru] = useState([]);

  const fixVen = (array) => {
    const result = {};
    array.forEach((item) => {
      if (item.currently_open === 1) {
        if (!result[item.region]) {
          result[item.region] = [];
        }
        result[item.region].push(item);
      }
    });
    return result;
  };

  useEffect(() => {
    const getVenueList = () => {
      axios({
        method: 'get',
        url: '/api/venues/',
      })
        .then((response) => {
          const { data } = response;
          const fixData = fixVen(data);
          // setVenList(fixData);
          setSanFran(fixData['San Francisco']);
          setEast(fixData['East Bay']);
          setPen(fixData.Peninsula);
          setSouth(fixData['South Bay']);
          setNorth(fixData['North Bay']);
          setSanCru(fixData['Santa Cruz']);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    getVenueList();
  }, []);

  const printList = (array) => {
    return array.map((venue) => (
      <Link to={`/venues/${venue.id}`}>
        <div className="venue-item">
          <img src={venue.img} alt="venue-img" />
          <div>{venue.title}</div>
        </div>
      </Link>
    ));
  };

  return (
    <div>
      <h2 className="venue-region">San Francisco</h2>
      <div className="venue-list">{printList(venSanFran)}</div>
      <h2 className="venue-region">East Bay</h2>
      <div className="venue-list">{printList(venEast)}</div>
      <h2 className="venue-region">Peninsula</h2>
      <div className="venue-list">{printList(venPen)}</div>
      <h2 className="venue-region">South Bay</h2>
      <div className="venue-list">{printList(venSouth)}</div>
      <h2 className="venue-region">North Bay</h2>
      <div className="venue-list">{printList(venNorth)}</div>
      <h2 className="venue-region">Santa Cruz</h2>
      <div className="venue-list">{printList(venSanCru)}</div>
    </div>
  );
};

export default Venues;
