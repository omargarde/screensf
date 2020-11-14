import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Venues = () => {
  const [venList, setVenList] = useState([]);
  const fixVen = (array) => {
    const result = [];
    array.forEach((item) => {
      if (item.currently_open === 1) {
        result.push(item);
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
          setVenList(fixData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    getVenueList();
  }, []);

  return (
    <div>
      <div className="venue-list">
        {venList.map((venue) => (
          <Link to={`/venues/${venue.id}`}>
            <div className="venue-item">
              <img src={venue.img} alt="venue-img" />
              <div>{venue.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Venues;
