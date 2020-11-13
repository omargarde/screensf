import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { loadImage } from '../helpers';

const VenueView = () => {
  const params = useParams();
  const [venName, setVenName] = useState('');
  const [venAdd, setVenAdd] = useState('');
  const [venUrl, setVenUrl] = useState('');
  const [venDesc, setVenDesc] = useState('');
  const [venImg, setVenImg] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getVenue = () => {
      axios({
        method: 'get',
        url: `/api/venue/${params.id}`,
      })
        .then((response) => {
          const { data } = response;
          const ven = data[0];

          setVenName(ven.title);
          setVenAdd(ven.address);
          setVenUrl(ven.venue_url);
          setVenDesc(ven.venue_description);
          setVenImg(ven.img);
          setLoading(false);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    getVenue();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={loadImage} alt="loading" />
      </div>
    );
  }

  return (
    <div>
      <img src={venImg} alt="venue" />
      <h2>{venName}</h2>
      <div className="venue-address">{venAdd}</div>
      <div>{venDesc}</div>
      <div>
        <a href={venUrl}>Website</a>
      </div>
    </div>
  );
};

export default VenueView;
