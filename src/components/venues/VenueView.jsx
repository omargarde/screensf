import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { loadImage } from '../helpers';

const VenueView = () => {
  const params = useParams();
  const venId = params.id.split('-')[0];
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
        url: `/api/venue/${venId}`,
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
  }, [venId]);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={loadImage} alt="loading" />
      </div>
    );
  }

  return (
    <div>
      <div className="venue-img">
        <img src={venImg} alt="venue" />
      </div>
      <h2 className="venue-title">{venName}</h2>
      <div className="venue-address">{venAdd}</div>
      <div className="venue-description">{venDesc}</div>
      <div className="venue-link">
        <a href={venUrl}>Official Website</a>
      </div>
    </div>
  );
};

export default VenueView;
