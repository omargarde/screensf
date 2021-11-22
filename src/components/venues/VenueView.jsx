import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { loadImage } from '../helpers';
import ByDate from './ByDate';

const VenueView = () => {
  const params = useParams();
  const venUri = params.id;
  const today = moment(new Date()).format('YYYY-MM-DD');
  const [venId, setVenId] = useState('');
  const [venName, setVenName] = useState('');
  const [venAdd, setVenAdd] = useState('');
  const [venUrl, setVenUrl] = useState('');
  const [venDesc, setVenDesc] = useState('');
  const [venImg, setVenImg] = useState('');
  const [showData, setShowData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getVenue = () => {
      axios({
        method: 'get',
        url: `/api/venue/${venUri}`,
      })
        .then((response) => {
          const { data } = response;
          const ven = data[0];
          setVenId(ven.id);
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
    const getVenueView = () => {
      axios({
        method: 'get',
        url: `/api/showtimes-venue/venId/${venId}/today/${today}`,
      }).then((response) => {
        const { data } = response;
        setShowData(data);
      });
    };
    getVenue();
    getVenueView();
  }, [venId, today]);

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
      <div className="venue-block">
        {showData.map((day) => (
          <div>
            <h3 className="date-header">
              {moment(day.date).format('dddd, MMMM D YYYY')}
            </h3>
            <ByDate shows={day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueView;
